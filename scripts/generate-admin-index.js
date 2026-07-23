#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '..', 'source', '_posts');
const OUTPUT_FILE = path.join(__dirname, '..', 'source', 'admin-index.json');

function generateIndex() {
  const index = {
    version: 3,
    generatedAt: new Date().toISOString(),
    site: {
      title: 'Cimen101 Blog',
      url: 'https://blog.cimen.online'
    },
    posts: [],
    categories: [],
    tags: []
  };

  if (!fs.existsSync(POSTS_DIR)) {
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2));
    return;
  }

  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  files.forEach(file => {
    const filePath = path.join(POSTS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const stats = fs.statSync(filePath);

    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    let title = file.replace('.md', '');
    let date = stats.mtime.toISOString();
    let categories = [];
    let tags = [];

    if (frontmatterMatch) {
      const fm = frontmatterMatch[1];
      const titleMatch = fm.match(/^title:\s*(.+)$/m);
      const dateMatch = fm.match(/^date:\s*(.+)$/m);
      const catMatch = fm.match(/^categories:\s*\[(.+)\]/m);
      const tagMatch = fm.match(/^tags:\s*\[(.+)\]/m);

      if (titleMatch) title = titleMatch[1].trim().replace(/['"]/g, '');
      if (dateMatch) date = dateMatch[1].trim();
      if (catMatch) categories = catMatch[1].split(',').map(s => s.trim().replace(/['"]/g, ''));
      if (tagMatch) tags = tagMatch[1].split(',').map(s => s.trim().replace(/['"]/g, ''));
    }

    const slug = file.replace('.md', '');
    index.posts.push({ slug, title, date, categories, tags, relativeId: `posts/${slug}` });
  });

  index.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2));
  console.log(`Generated admin-index.json with ${index.posts.length} posts`);
}

generateIndex();
