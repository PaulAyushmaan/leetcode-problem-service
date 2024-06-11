const marked = require('marked');
const sanitizeHtmlLibrary = require('sanitize-html');
const TurndownService = require('turndown');

function sanitizeMarkdownContent(markdownConnect) {
	const turndownService = new TurndownService();
	// 1. Convert markdown to html
	const convertedHtml = marked.parse(markdownConnect);
	console.log('converted html', convertedHtml);
	// 2. Sanitize HTML
	const sanitizedHtml = sanitizeHtmlLibrary(convertedHtml, {
		allowedTags: sanitizeHtmlLibrary.defaults.allowedTags.concat('img'),
	});
	console.log('sanitized html', sanitizedHtml);
	const sanitizedMarkdown = turndownService.turndown(sanitizedHtml);
	console.log('sanitized markdown', sanitizedMarkdown);
	return sanitizedMarkdown;
}
module.exports = sanitizeMarkdownContent;
