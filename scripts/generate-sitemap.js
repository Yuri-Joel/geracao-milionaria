const fs = require("fs");
const { pagesData, blogPosts } = require("../src/data/pagesData");

const DOMAIN = "https://www.agmi.ao";

// Começa o XML
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

// Adiciona páginas fixas
for (const path in pagesData) {
  sitemap += `  <url>\n`;
  sitemap += `    <loc>${DOMAIN}${path}</loc>\n`;
  sitemap += `  </url>\n`;
}

    // Adiciona artigos do blog
    // blogPosts.forEach(post => {
    // sitemap += `  <url>\n`;
    // sitemap += `    <loc>${DOMAIN}/blog/${post.slug}</loc>\n`;
    // sitemap += `  </url>\n`;
    // });

sitemap += `</urlset>`;

// Salva o arquivo na pasta public
fs.writeFileSync("public/sitemap.xml", sitemap);

console.log("✅ Sitemap gerado com sucesso!");