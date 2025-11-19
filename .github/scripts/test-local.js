// .github/scripts/test-local.js
// Local testing script - automatically fetches README from GitHub repo and uses Gemini to process it

require('dotenv').config();

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { Octokit } = require('@octokit/rest');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log('\n🤖 Auto-Portfolio Local Testing Tool\n');
  console.log('This tool fetches README from a GitHub repo and uses Gemini AI to extract project data\n');

  // Check for API keys
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const githubToken = process.env.GITHUB_TOKEN;

  if (!geminiApiKey) {
    console.error('❌ GEMINI_API_KEY environment variable is required!');
    console.error('   Set it with: export GEMINI_API_KEY="your-key"\n');
    rl.close();
    process.exit(1);
  }

  const owner = await question('GitHub Owner (default: Neeharika2): ') || 'Neeharika2';
  const repo = await question('Repository Name: ');
  
  if (!repo) {
    console.error('❌ Repository name is required!');
    rl.close();
    process.exit(1);
  }

  console.log(`\n📥 Fetching README from ${owner}/${repo}...`);

  // Initialize Octokit
  const octokit = new Octokit({ auth: githubToken });

  // Fetch README from GitHub
  let readmeContent;
  try {
    const { data } = await octokit.repos.getReadme({
      owner,
      repo
    });
    
    // Decode base64 content
    readmeContent = Buffer.from(data.content, 'base64').toString('utf-8');
    console.log(`✅ README fetched successfully (${readmeContent.length} characters)`);
  } catch (error) {
    console.error(`❌ Failed to fetch README: ${error.message}`);
    rl.close();
    process.exit(1);
  }

  console.log('\n🧠 Processing README with Gemini AI...');

  // Initialize Gemini
  const genAI = new GoogleGenerativeAI(geminiApiKey);
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
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
${readmeContent}`;

  let parsed;
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    parsed = JSON.parse(text);
    console.log('✅ Gemini processing complete');
  } catch (err) {
    console.error('❌ Failed to parse Gemini response:', err.message);
    rl.close();
    process.exit(1);
  }

  // Build project entry
  const id = `${owner}-${repo}`;
  const entry = {
    id,
    title: parsed.title || repo,
    description: parsed.description || parsed.longDescription || '',
    tags: parsed.tags || [],
    github: `https://github.com/${owner}/${repo}`,
    demo: parsed.demo || '',
    features: parsed.features || [],
    challenges: [],
    dateAdded: new Date().toISOString(),
    source: 'auto-test'
  };

  if (parsed.image) {
    entry.image = parsed.image;
  }
  if (parsed.longDescription) {
    entry.longDescription = parsed.longDescription;
  }

  console.log('\n📝 Generated Project Entry:\n');
  console.log(JSON.stringify(entry, null, 2));
  
  const confirm = await question('\n✅ Add this project to projects.json? (y/n): ');
  
  if (confirm.toLowerCase() !== 'y') {
    console.log('❌ Cancelled');
    rl.close();
    process.exit(0);
  }

  // Load existing projects.json
  const projectsPath = path.resolve(process.cwd(), 'public', 'projects.json');
  let current = { projects: [] };
  
  if (fs.existsSync(projectsPath)) {
    current = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
  }

  // Check for duplicates
  const existingIndex = current.projects.findIndex(p => p.id === id);
  if (existingIndex >= 0) {
    console.log(`\n⚠️  Project ${id} already exists. Updating...`);
    const existing = current.projects[existingIndex];
    current.projects[existingIndex] = {
      ...entry,
      challenges: existing.challenges || entry.challenges,
      source: existing.source || entry.source
    };
  } else {
    console.log(`\n✨ Adding new project ${id}...`);
    current.projects.unshift(entry);
  }

  // Write updated projects.json
  fs.writeFileSync(projectsPath, JSON.stringify(current, null, 2));
  console.log(`\n✅ Successfully updated projects.json`);
  console.log(`\n🌐 If your dev server is running, refresh your browser to see the new project!`);
  console.log(`   Visit: http://localhost:3000\n`);

  rl.close();
}

main().catch(err => {
  console.error('❌ Error:', err);
  rl.close();
  process.exit(1);
});
