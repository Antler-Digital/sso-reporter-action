const core = require('@actions/core');
const { DefaultArtifactClient } = require('@actions/artifact');
const { execSync } = require('child_process');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function run() {
  try {
    // Get inputs
    const url = core.getInput('url', { required: true });
    const maxDepth = core.getInput('max-depth') || '3';
    const maxPages = core.getInput('max-pages') || '1000';
    const concurrency = core.getInput('concurrency') || '10';
    const webhookUrl = core.getInput('webhook-url');
    const webhookMethod = core.getInput('webhook-method') || 'POST';
    const outputDir = core.getInput('output-dir') || 'seo-report';

    core.info(`Starting SEO analysis for: ${url}`);
    core.info(`Configuration: depth=${maxDepth}, pages=${maxPages}, concurrency=${concurrency}`);

    // Build the command
    const command = [
      'npx',
      'seo-reporter',
      '--url', url,
      '--depth', maxDepth,
      '--max-pages', maxPages,
      '--concurrency', concurrency,
      '--output', outputDir
    ].join(' ');

    core.info(`Executing: ${command}`);

    // Run the SEO reporter
    try {
      const output = execSync(command, {
        stdio: 'inherit',
        encoding: 'utf-8',
        maxBuffer: 50 * 1024 * 1024 // 50MB buffer
      });
    } catch (error) {
      core.error(`SEO Reporter execution failed: ${error.message}`);
      throw error;
    }

    core.info('SEO analysis completed successfully');

    // Check if output directory exists
    if (!fs.existsSync(outputDir)) {
      throw new Error(`Output directory ${outputDir} was not created`);
    }

    // Set outputs
    const htmlReportPath = path.join(outputDir, 'index.html');
    const csvPath = outputDir;

    if (fs.existsSync(htmlReportPath)) {
      core.setOutput('report-path', htmlReportPath);
      core.info(`HTML report generated at: ${htmlReportPath}`);
    }

    core.setOutput('csv-path', csvPath);
    core.info(`CSV reports directory: ${csvPath}`);

    // Upload artifacts
    try {
      const artifactClient = new DefaultArtifactClient();
      
      // Get all files in the output directory
      const files = getAllFiles(outputDir);
      
      if (files.length === 0) {
        core.warning('No files found to upload as artifacts');
      } else {
        core.info(`Uploading ${files.length} files as artifacts...`);
        
        const uploadResponse = await artifactClient.uploadArtifact(
          'seo-report',
          files,
          outputDir,
          {
            continueOnError: false
          }
        );

        if (uploadResponse.id) {
          core.info(`Artifact uploaded successfully. ID: ${uploadResponse.id}`);
        }
      }
    } catch (error) {
      core.warning(`Failed to upload artifacts: ${error.message}`);
    }

    // Call webhook if provided
    if (webhookUrl) {
      core.info(`Calling webhook: ${webhookUrl}`);
      
      try {
        const webhookData = {
          url: url,
          status: 'completed',
          reportPath: htmlReportPath,
          timestamp: new Date().toISOString()
        };

        if (webhookMethod.toUpperCase() === 'POST') {
          await axios.post(webhookUrl, webhookData);
        } else {
          await axios.get(webhookUrl, { params: webhookData });
        }
        
        core.info('Webhook called successfully');
      } catch (error) {
        core.warning(`Failed to call webhook: ${error.message}`);
      }
    }

    core.info('Action completed successfully');
  } catch (error) {
    core.setFailed(error.message);
  }
}

// Helper function to get all files recursively
function getAllFiles(dir) {
  const files = [];
  
  function traverse(currentPath) {
    const items = fs.readdirSync(currentPath);
    
    for (const item of items) {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

run();
