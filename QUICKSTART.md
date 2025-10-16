# Quick Start Guide

Get started with SEO Reporter Action in 5 minutes!

## Step 1: Add the Action to Your Workflow

Create a new workflow file in your repository at `.github/workflows/seo-check.yml`:

```yaml
name: SEO Analysis
on:
  workflow_dispatch:  # Manual trigger for testing
  push:
    branches: [main]

jobs:
  seo:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run SEO Reporter
        uses: Antler-Digital/sso-reporter-action@v1
        with:
          url: https://your-website.com
```

## Step 2: Run Your Workflow

1. Go to your repository on GitHub
2. Click on "Actions" tab
3. Select "SEO Analysis" workflow
4. Click "Run workflow"
5. Wait for the analysis to complete (typically 1-5 minutes)

## Step 3: Download the Reports

1. Once the workflow completes, scroll down to the "Artifacts" section
2. Download the `seo-report` artifact
3. Extract the ZIP file
4. Open `index.html` in your browser to view the interactive report

## What's in the Reports?

### HTML Report (`index.html`)
- Interactive dashboard with sortable tables
- Issues organized by severity (High/Medium/Low)
- Filterable views for pages, issues, links, and images
- Visual highlighting of problems

### CSV Files
- `all-pages.csv` - Complete data for every page crawled
- `issues.csv` - All detected SEO issues
- `internal-links.csv` - Internal link structure
- `external-links.csv` - External links found
- `images.csv` - Image analysis with alt text

## Common Configurations

### For a Small Site (<100 pages)
```yaml
with:
  url: https://your-site.com
  max-depth: 2
  max-pages: 100
  concurrency: 5
```

### For a Medium Site (100-1000 pages)
```yaml
with:
  url: https://your-site.com
  max-depth: 3
  max-pages: 1000
  concurrency: 10
```

### For a Large Site (1000+ pages)
```yaml
with:
  url: https://your-site.com
  max-depth: 5
  max-pages: 5000
  concurrency: 20
```

## Next Steps

- **Schedule Regular Checks**: Use `schedule` trigger to run weekly/monthly
- **Integrate with Deployments**: Run after Vercel/Netlify deployments
- **Add Webhooks**: Get notifications when analysis completes
- **Monitor Trends**: Compare reports over time to track improvements

For more advanced usage, see the [full README](README.md).

## Need Help?

- Check the [Troubleshooting](README.md#troubleshooting) section
- Review [example workflows](.github/workflows/)
- Open an [issue](https://github.com/Antler-Digital/sso-reporter-action/issues)
