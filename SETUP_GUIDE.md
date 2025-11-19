# Auto-Portfolio Integration Setup Guide

This guide helps you complete the setup of your automated portfolio system.

## 📋 Overview

Your portfolio now automatically updates when you push projects with READMEs to GitHub. The system uses:
- **GitHub Actions** for automation
- **Gemini API** for intelligent content extraction
- **Repository Dispatch** for cross-repo communication
- **Runtime JSON fetching** to avoid rebuilds

## ✅ What's Been Implemented

### 1. Portfolio Repository (Neeharika2/portfolio)

- ✅ `public/projects.json` - Dynamic project data store with 5 existing projects
- ✅ `src/components/ProjectsSection.js` - Modified to fetch projects at runtime
- ✅ `.github/workflows/on-project-dispatch.yml` - Receives project updates
- ✅ `.github/scripts/process-dispatch.js` - Gemini-powered README processor
- ✅ `package.json` - Added `@google/generative-ai` and `@octokit/rest` dependencies

### 2. Project Repository Template

- ✅ `.github/workflows/notify-portfolio.yml` - Sends updates to portfolio repo

## 🔧 Required Setup Steps

### Step 1: Install Dependencies

Run this in your portfolio repository:

```bash
npm install
```

This installs the new Gemini API and Octokit packages.

### Step 2: Get Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy the generated API key

### Step 3: Add Secrets to Portfolio Repository

Go to `https://github.com/Neeharika2/portfolio/settings/secrets/actions` and add:

**Secret Name:** `GEMINI_API_KEY`  
**Value:** Your Gemini API key from Step 2

### Step 4: Create Personal Access Token (PAT)

This token allows project repos to trigger portfolio updates.

1. Go to https://github.com/settings/tokens/new
2. **Note:** "Portfolio Auto-Update Token"
3. **Expiration:** 90 days (or custom)
4. **Scopes:** Check `repo` (Full control of private repositories)
5. Click "Generate token" and **copy the token** (you won't see it again!)

### Step 5: Add PAT to Each Project Repository

For each project repo you want to auto-update the portfolio:

1. Go to the project repo settings: `https://github.com/Neeharika2/<REPO_NAME>/settings/secrets/actions`
2. Click "New repository secret"
3. **Name:** `PORTFOLIO_REPO_TOKEN`
4. **Value:** Paste the PAT from Step 4
5. Click "Add secret"

**Projects to configure:**
- GiGy
- rag-pdf-summarizer
- Nearby-places
- CRT_fee_tracking
- travel_assistant_chatbot2

### Step 6: Add Workflow to Project Repositories

Copy the file `.github/workflows/notify-portfolio.yml` to each project repository:

```bash
# For each project repo, create the workflow file
mkdir -p .github/workflows
cp /path/to/portfolio/.github/workflows/notify-portfolio.yml .github/workflows/
git add .github/workflows/notify-portfolio.yml
git commit -m "chore: add portfolio auto-update workflow"
git push
```

## 🧪 Testing the System

### Test with a Sample Update

1. Choose one project (e.g., `GiGy`)
2. Make a small change to its README.md
3. Commit and push:
   ```bash
   git add README.md
   git commit -m "test: trigger portfolio update"
   git push
   ```

4. **Check the logs:**
   - Project repo: Go to Actions tab → "Notify Portfolio" workflow
   - Portfolio repo: Go to Actions tab → "Update Portfolio Projects" workflow

5. **Verify the update:**
   - Check if `public/projects.json` was updated in portfolio repo
   - Visit `https://neeharika.me/portfolio/projects.json` to see live data
   - Check your portfolio site to see the updated project

## 📊 Data Schema

Projects in `public/projects.json` follow this structure:

```json
{
  "id": "owner-repo",
  "title": "Project Name",
  "description": "One sentence description",
  "tags": ["React", "Node.js"],
  "github": "https://github.com/owner/repo",
  "demo": "https://live-demo-url.com",
  "features": [
    "Feature 1",
    "Feature 2"
  ],
  "challenges": [
    "🔧 Challenge: Description"
  ],
  "dateAdded": "2025-11-19T12:00:00Z",
  "source": "auto" // or "manual"
}
```

### Field Extraction:

**Auto-populated by Gemini:**
- `title`, `description`, `tags`, `features`, `demo` (if in README)

**Manually maintained:**
- `challenges` - Add these manually via PR or direct edit to `projects.json`

## 🎯 Workflow Behavior

### When a Project README Changes:

1. **Project repo** workflow detects README.md change
2. Sends `repository_dispatch` event to portfolio repo
3. **Portfolio repo** workflow receives event
4. Node.js script calls Gemini API to extract metadata
5. Updates `public/projects.json` with new/updated project
6. Commits changes to portfolio repo
7. Deploys to GitHub Pages automatically

### When No README Exists:

The workflow exits silently without triggering portfolio updates.

## 🔒 Security Notes

- Never commit API keys or tokens to git
- Rotate PAT every 90 days for security
- The `GEMINI_API_KEY` is only stored in portfolio repo secrets
- The `PORTFOLIO_REPO_TOKEN` is stored in each project repo's secrets

## 🐛 Troubleshooting

### Workflow not triggering?
- Check that `PORTFOLIO_REPO_TOKEN` secret exists in project repo
- Verify the secret has `repo` scope
- Check Actions tab for error logs

### Gemini API errors?
- Verify `GEMINI_API_KEY` is set correctly in portfolio repo secrets
- Check your Gemini API quota at Google AI Studio
- Review workflow logs in portfolio repo Actions tab

### Projects.json not updating?
- Check that workflow completed successfully
- Verify the commit was made by GitHub Actions bot
- Check if there are merge conflicts

### GitHub Pages not updating?
- Wait 2-3 minutes for deployment to complete
- Clear browser cache
- Check Pages deployment status in portfolio repo settings

## 🚀 Next Steps

### Optional Enhancements:

1. **Manual Review Mode**: Modify workflow to create PRs instead of auto-committing
2. **Screenshot Automation**: Use Puppeteer to capture project screenshots
3. **Enhanced Prompts**: Fine-tune Gemini prompts for better metadata extraction
4. **Challenges Auto-extraction**: Train Gemini to extract challenges from README
5. **Batch Processing**: Handle multiple README updates in one workflow run

## 📝 Maintenance

### Adding Challenges Manually:

Edit `public/projects.json` and add to the `challenges` array:

```json
"challenges": [
  "🔧 Challenge 1: Description",
  "⚡ Challenge 2: Description"
]
```

Commit and push - GitHub Pages will update automatically.

### Removing Auto-Generated Projects:

Simply remove the entry from `public/projects.json` and commit.

## ✨ Success Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] `GEMINI_API_KEY` added to portfolio repo secrets
- [ ] Personal Access Token created
- [ ] `PORTFOLIO_REPO_TOKEN` added to all project repo secrets
- [ ] `notify-portfolio.yml` workflow added to at least one project repo
- [ ] Test update pushed to project README
- [ ] Portfolio workflow executed successfully
- [ ] `projects.json` updated with new data
- [ ] Portfolio website shows updated project

---

**Need help?** Check the workflow logs in the Actions tab of both repositories for detailed error messages.
