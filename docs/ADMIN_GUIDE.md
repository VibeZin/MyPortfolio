# Content Management Guide

This portfolio uses **Decap CMS** to manage content. All changes made in the admin panel are automatically committed to the GitHub repository.

## Accessing the Admin Panel
1. Navigate to `/admin` (e.g., `https://your-site.com/admin`).
2. Login with Netlify Identity (or GitHub OAuth if configured).

## Managing Projects

### Adding a New Project
1. Click on **Projects** in the left sidebar.
2. Click **New Project**.
3. Fill in the fields:
   - **Title**: Name of the project.
   - **Short Description**: 1-sentence summary for the card.
   - **Date**: Used for sorting.
   - **Featured**: Check this to highlight it or add a "Featured" badge.
   - **Category**: Select the type (Web App, AI, etc.).
   - **Tech Stack**: Add items one by one (e.g., "React", "Python").
   - **Thumbnail**: Upload an image (Recommended size: 800x600px).
   - **Links**: GitHub and Live Demo URLs (optional).
   - **Full Description**: Write the detailed case study in Markdown.

## Managing Skills

### Updating Skill Stats
1. Click on **Skills** in the left sidebar.
2. Select **Skills Data**.
3. You will see three lists: `Tech Interests`, `Business`, and `Development`.
4. To add a skill, click **Add to [Category Name]**.
5. Fill in:
   - **Name**: Skill name.
   - **Proficiency**: Number 0-100.
   - **Icon Name**: Must match a `lucide-react` icon name (case-sensitive, e.g., `Cpu`, `Zap`).
   - **Color**: Hex code for the glow effect.

## Managing "About" Page

1. Click on **About Page**.
2. Select **Profile Info**.
3. Update the **Vision Statement** or **Bio**.

## Troubleshooting

- **Login Issues**: Ensure Netlify Identity is enabled in your Netlify dashboard and "Git Gateway" is active.
- **Images not loading**: Make sure the image paths in the CMS config match the public folder structure.
- **Changes not showing**: The site needs to rebuild after every commit. Wait for the GitHub Action or Netlify build to finish (usually 1-2 mins).
