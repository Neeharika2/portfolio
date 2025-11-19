// .github/scripts/process-dispatch.js
const fs = require('fs');
const path = require('path');
const { Octokit } = require('@octokit/rest');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function main() {
  const eventPath = process.argv[2];
  if (!eventPath) {
    throw new Error('No event path provided');
  }

  const event = JSON.parse(fs.readFileSync(eventPath, 'utf8'));
  const payload = event.client_payload;

  if (!payload || !payload.readme) {
    console.log('No README in payload — exiting gracefully');
    process.exit(0);
  }

  const owner = payload.owner;
  const repo = payload.repo;
  const repoUrl = payload.html_url;
  const rawReadme = payload.readme;

  console.log(`Processing README from ${owner}/${repo}`);

  // Use Gemini to extract structured project data from README
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'object',
        properties: {
          title: { type: 'string', description: 'Project name/title' },
          description: { type: 'string', description: 'One sentence project description' },
          longDescription: { type: 'string', description: 'Detailed project description (2-3 sentences)' },
          tags: { 
            type: 'array', 
            items: { type: 'string' },
            description: 'Array of technologies used (e.g., React, Node.js, Python)' 
          },
          features: { 
            type: 'array', 
            items: { type: 'string' },
            description: 'List of key features (up to 7 items)' 
          },
          demo: { type: 'string', description: 'Live demo URL if mentioned, otherwise empty string' },
          image: { type: 'string', description: 'Screenshot/image URL if mentioned, otherwise empty string' }
        },
        required: ['title', 'description', 'tags', 'features']
      }
    }
  });

  const prompt = `You are a portfolio metadata extractor. Extract structured project information from the following README markdown.

Instructions:
- Extract the project title/name
- Create a concise one-sentence description
- Create a longer 2-3 sentence description with more details
- List all technologies/frameworks mentioned (React, Node.js, Python, etc.)
- Extract up to 7 key features or capabilities
- Find any demo/live site URLs (only if explicitly mentioned)
- Find any screenshot/image URLs (only if explicitly mentioned)
- If demo or image URLs are not found, return empty strings

README Content:
${rawReadme}`;

  let parsed;
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    console.log('Gemini API response received');
    parsed = JSON.parse(text);
  } catch (err) {
    console.error('Failed to parse Gemini response:', err);
    console.error('Raw response:', err.message);
    process.exit(1);
  }

  // Build project entry
  const id = `${owner}-${repo}`;
  const entry = {
    id,
    title: parsed.title || repo,
    description: parsed.description || parsed.longDescription || '',
    tags: parsed.tags || [],
    github: repoUrl,
    demo: parsed.demo || '',
    features: parsed.features || [],
    challenges: [], // Will be manually added later
    dateAdded: new Date().toISOString(),
    source: 'auto'
  };

  // Add optional fields only if they exist
  if (parsed.image) {
    entry.image = parsed.image;
  }
  if (parsed.longDescription) {
    entry.longDescription = parsed.longDescription;
  }

  console.log('Generated project entry:', JSON.stringify(entry, null, 2));

  // Load existing projects.json
  const projectsPath = path.resolve(process.cwd(), 'public', 'projects.json');
  let current = { projects: [] };
  
  if (fs.existsSync(projectsPath)) {
    current = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
  }

  // Update or append project
  const existingIndex = current.projects.findIndex(p => p.id === id);
  if (existingIndex >= 0) {
    console.log(`Updating existing project: ${id}`);
    // Preserve manually added fields like challenges
    const existing = current.projects[existingIndex];
    current.projects[existingIndex] = {
      ...entry,
      challenges: existing.challenges || entry.challenges,
      source: existing.source || entry.source
    };
  } else {
    console.log(`Adding new project: ${id}`);
    current.projects.unshift(entry);
  }

  // Write updated projects.json
  fs.writeFileSync(projectsPath, JSON.stringify(current, null, 2));
  console.log(`Successfully updated projects.json with ${id}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
