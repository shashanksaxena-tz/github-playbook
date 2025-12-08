# GitHub Pages Setup Guide

## Step-by-Step Fix for "Resource not accessible by integration" Error

### ✅ Step 1: Workflow File Fixed
The workflow has been updated to move the `configure-pages` action to the `deploy` job where it has access to the `github-pages` environment.

### Step 2: Enable GitHub Pages in Repository Settings

1. **Go to your repository on GitHub**
   - Navigate to: `https://github.com/YOUR-USERNAME/github-playbook`

2. **Open Settings**
   - Click on the **Settings** tab in your repository

3. **Navigate to Pages**
   - In the left sidebar, click on **Pages** (under "Code and automation")

4. **Configure Source**
   - Under "Source", select **GitHub Actions** (not "Deploy from a branch")
   - This enables GitHub Actions to deploy to Pages

5. **Save the settings**
   - The changes are saved automatically

### Step 3: Verify Workflow Permissions

The workflow already has the correct permissions:
- `contents: read` - to read the repository
- `pages: write` - to write to GitHub Pages
- `id-token: write` - for OIDC authentication

### Step 4: Check Branch Configuration

Make sure your workflow is set to run on the correct branch:
- Currently configured for `main` branch
- If your default branch is different (e.g., `master` or `github-pages`), update line 6 in `.github/workflows/deploy.yml`

### Step 5: Trigger the Workflow

1. **Push to main branch** (if workflow is set to trigger on push)
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Fix GitHub Pages deployment workflow"
   git push origin main
   ```

2. **Or manually trigger** (if workflow_dispatch is enabled)
   - Go to **Actions** tab
   - Select "Deploy Playbook to GitHub Pages"
   - Click **Run workflow**

### Step 6: Monitor the Workflow

1. Go to the **Actions** tab in your repository
2. Click on the running workflow
3. Check both jobs:
   - **build** - Should build successfully
   - **deploy** - Should configure and deploy to Pages

### Troubleshooting

If you still get errors:

1. **Check Repository Permissions**
   - Go to Settings → Actions → General
   - Under "Workflow permissions", ensure "Read and write permissions" is selected
   - Check "Allow GitHub Actions to create and approve pull requests"

2. **Verify Environment Exists**
   - Go to Settings → Environments
   - If `github-pages` environment doesn't exist, it will be created automatically when the workflow runs
   - Make sure there are no protection rules blocking the workflow

3. **Check Branch Protection**
   - If `main` branch has protection rules, ensure workflows can run
   - Go to Settings → Branches → Branch protection rules

4. **Verify Token Permissions**
   - The `GITHUB_TOKEN` should have `pages: write` permission
   - This is set in the workflow file (already configured)

### Expected Workflow Flow

1. **Build Job**:
   - Checks out code
   - Sets up Node.js
   - Installs dependencies
   - Lints and checks links
   - Builds the Docusaurus site
   - Uploads artifact

2. **Deploy Job**:
   - Configures GitHub Pages (this was moved here)
   - Deploys the artifact to GitHub Pages

### After Successful Deployment

Once the workflow completes successfully:
- Your site will be available at: `https://YOUR-USERNAME.github.io/github-playbook/`
- The URL is based on your repository name and organization
- Update `docusaurus.config.js` with your actual GitHub username/organization name

