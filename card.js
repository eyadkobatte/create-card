#!/usr/bin/env node
/* eslint-disable no-console */

const resetTerminalColor = '\x1b[0m';
const fgColor = '\x1b[34m';
const bgColor = '\x1b[47m';

const log = (message) => {
  console.log(`${fgColor}${bgColor}%s`, message, resetTerminalColor);
};

const fullName = '__FULL_NAME__';
const alias = '__ALIAS__';

const hasBlog = '__HAS_BLOG__';
const blogUrl = '__BLOG_URL__';

const hasGithub = '__HAS_GITHUB__';
const githubUrl = '__GITHUB_URL__';

const hasLinkedIn = '__HAS_LINKEDIN__';
const linkedInUrl = '__LINKEDIN_URL__';

const hasTwitter = '__HAS_TWITTER__';
const twitterUrl = '__TWITTER_URL__';

const hasWebsite = '__HAS_WEBSITE__';
const websiteUrl = '__WEBSITE_URL__';

console.log('\n');
log('                                                        ');
log(' ------------------------------------------------------ ');
log(`|  ${fullName} / ${alias}                      |`);
log('|                                                      |');
if (hasBlog === 'true') {
  log(`|      Blog: ${blogUrl}              |`);
}
if (hasGithub === 'true') {
  log(`|    GitHub: ${githubUrl}            |`);
}
if (hasLinkedIn === 'true') {
  log(`|  LinkedIn: ${linkedInUrl}  |`);
}
if (hasTwitter) {
  log(`|   Twitter: ${twitterUrl}           |`);
}
if (hasWebsite) {
  log(`|   Website: ${websiteUrl}                   |`);
}
log(' ------------------------------------------------------ ');
log('                                                        ');
console.log('\n');
