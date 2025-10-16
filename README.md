# SEO Reporter Action

A GitHub Action that runs [seo-reporter](https://www.npmjs.com/package/seo-reporter) to analyze your website's SEO and automatically upload HTML and CSV reports as artifacts.

## Features

- 🕷️ **Website Crawling**: Analyzes your entire site with configurable depth and concurrency
- 📊 **220+ SEO Checks**: Comprehensive analysis covering titles, descriptions, headings, links, images, security, and more
- 📝 **HTML Reports**: Beautiful, interactive reports with filterable issues
- 📤 **CSV Export**: Download data for further analysis in Excel or other tools
- 🤖 **GitHub Artifacts**: Automatically uploads all reports as workflow artifacts
- 🔔 **Webhook Support**: Optional webhook notification when analysis completes
- ⚡ **Fast**: Analyzes 1000+ pages in under 2 minutes

Perfect for running after Vercel deployments or any CI/CD pipeline!

## Usage

### Basic Example

```yaml
name: SEO Analysis
on:
  deployment_status:

jobs:
  seo-check:
    runs-on: ubuntu-latest
    if: github.event.deployment_status.state == 'success'
    steps:
      - uses: actions/checkout@v4
      
      - name: Run SEO Reporter
        uses: Antler-Digital/sso-reporter-action@v1
        with:
          url: ${{ github.event.deployment_status.target_url }}
```

### Post-Vercel Deploy Example

```yaml
name: Post-Deploy SEO Check
on:
  deployment_status:

jobs:
  seo-analysis:
    runs-on: ubuntu-latest
    if: github.event.deployment_status.state == 'success' && github.event.deployment_status.environment == 'Production'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Run SEO Analysis
        uses: Antler-Digital/sso-reporter-action@v1
        with:
          url: ${{ github.event.deployment_status.target_url }}
          max-depth: 5
          max-pages: 2000
          concurrency: 15
          
      - name: Comment on PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '✅ SEO analysis complete! Check the artifacts for detailed reports.'
            })
```

### With Webhook Notification

```yaml
name: SEO Analysis with Webhook
on:
  push:
    branches: [main]

jobs:
  seo-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run SEO Reporter
        uses: Antler-Digital/sso-reporter-action@v1
        with:
          url: https://example.com
          webhook-url: https://your-webhook-endpoint.com/notify
          webhook-method: POST
```

### Advanced Configuration

```yaml
name: Comprehensive SEO Analysis
on:
  schedule:
    - cron: '0 0 * * 0'  # Weekly on Sunday
  workflow_dispatch:

jobs:
  seo-analysis:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run Deep SEO Analysis
        uses: Antler-Digital/sso-reporter-action@v1
        with:
          url: https://example.com
          max-depth: 10
          max-pages: 5000
          concurrency: 20
          output-dir: seo-reports
          webhook-url: ${{ secrets.SEO_WEBHOOK_URL }}
```

## Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `url` | The URL to crawl and analyze | Yes | - |
| `max-depth` | Maximum crawl depth | No | `3` |
| `max-pages` | Maximum number of pages to crawl | No | `1000` |
| `concurrency` | Number of concurrent requests | No | `10` |
| `webhook-url` | Webhook URL to call when complete | No | - |
| `webhook-method` | HTTP method for webhook (GET or POST) | No | `POST` |
| `output-dir` | Output directory for reports | No | `seo-report` |

## Outputs

| Output | Description |
|--------|-------------|
| `report-path` | Path to the generated HTML report |
| `csv-path` | Path to the CSV reports directory |

## Artifacts

The action automatically uploads all generated reports as a GitHub Actions artifact named `seo-report`. This includes:

- `index.html` - Interactive HTML report with all findings
- `all-pages.csv` - Complete data for all crawled pages
- `issues.csv` - All detected SEO issues
- `internal-links.csv` - Internal link analysis
- `external-links.csv` - External link analysis
- `images.csv` - Image analysis with alt text

You can download these artifacts from the workflow run page.

## Webhook Payload

When a webhook URL is provided, the action sends the following JSON payload (for POST requests):

```json
{
  "url": "https://example.com",
  "status": "completed",
  "reportPath": "seo-report/index.html",
  "timestamp": "2025-10-16T07:27:55.412Z"
}
```

For GET requests, these are sent as query parameters.

## What Gets Analyzed?

The action runs comprehensive SEO checks including:

### Metadata
- Title tags (length, uniqueness, pixel width)
- Meta descriptions (length, uniqueness, pixel width)
- Open Graph and Twitter Card tags
- Canonical URLs
- Robots directives

### Content
- Heading structure (H1-H6)
- Content length and quality
- Duplicate content detection
- Readability metrics
- Lorem ipsum detection

### Links
- Internal and external links
- Broken link detection
- Anchor text analysis
- Orphan pages
- Link metrics

### Images
- Alt text presence and quality
- Image dimensions
- Broken images

### Security
- HTTPS usage
- Mixed content detection
- Security headers
- Insecure forms

### Technical
- Response times
- Redirect chains
- HTML validation
- URL quality
- Structured data

## Requirements

- Runs on `ubuntu-latest` (or any Linux runner)
- Node.js 20 (provided by the action)
- Internet access to crawl the target website

## License

ISC

## Credits

Built with ❤️ by [Antler Digital](https://antler.digital)

Powered by [seo-reporter](https://www.npmjs.com/package/seo-reporter)