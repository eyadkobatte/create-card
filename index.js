#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const replace = require('replace-in-file');
const inquirer = require('inquirer');

const askBaseQuestions = async () => {
  const baseQuestions = [
    {
      type: 'input',
      name: 'name',
      message: 'What is your full name?',
    },
    {
      type: 'input',
      name: 'alias',
      message: 'What name do you go by on the interwebs?',
    },
    {
      type: 'checkbox',
      name: 'handles',
      message: 'Select your social handles',
      choices: [
        { name: 'Blog', value: 'blog' },
        { name: 'GitHub', value: 'github' },
        { name: 'LinkedIn', value: 'linkedin' },
        { name: 'Twitter', value: 'twitter' },
        { name: 'Website', value: 'website' },
      ],
    },
  ];

  const answers = await inquirer.prompt(baseQuestions);
  return answers;
};

const askHandleQuestions = async (baseAnswers) => {
  const { handles } = baseAnswers;

  const handleQuestions = handles.map((handle) => {
    let message = 'Whats your handle?';
    let filter = (value) => value;
    let defaultValue = null;
    switch (handle) {
      case 'blog':
        message = 'What blog do you own?';
        break;
      case 'github':
        message = 'What is your GitHub Handle?';
        filter = (value) => `https://github.com/${value}`;
        defaultValue = baseAnswers.alias;
        break;
      case 'linkedin':
        message = 'What is your LinkedIn Handle?';
        filter = (value) => `https://www.linkedin.com/in/${value}`;
        defaultValue = baseAnswers.alias;
        break;
      case 'twitter':
        message = 'What is your Twitter Handle?';
        filter = (value) => `https://twitter.com/${value}`;
        defaultValue = baseAnswers.alias;
        break;
      case 'website':
        message = 'What is your website?';
        break;
      default:
        break;
    }
    return {
      type: 'input',
      name: handle,
      message,
      filter,
      default: defaultValue,
    };
  });

  const handleAnswers = await inquirer.prompt(handleQuestions);
  return handleAnswers;
};

const runShellCommand = (command, options = {}) =>
  new Promise((resolve, reject) => {
    const cmd = exec(command, options);
    cmd.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject();
      }
    });
  });

const createProject = async () => {
  const currentDirectory = process.cwd();
  const directory = path.resolve(currentDirectory, 'personal-card');
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
  await runShellCommand('npm init -y', { cwd: './personal-card' });
};

const updateCardFunction = async ({
  FULL_NAME,
  ALIAS,
  HAS_BLOG,
  BLOG_URL,
  HAS_GITHUB,
  GITHUB_URL,
  HAS_LINKEDIN,
  LINKEDIN_URL,
  HAS_TWITTER,
  TWITTER_URL,
  HAS_WEBSITE,
  WEBSITE_URL,
}) => {
  const results = await replace({
    files: './personal-card/index.js',
    from: [
      /__FULL_NAME__/g,
      /__ALIAS__/g,
      /__HAS_BLOG__/g,
      /__BLOG_URL__/g,
      /__HAS_GITHUB__/g,
      /__GITHUB_URL__/g,
      /__HAS_LINKEDIN__/g,
      /__LINKEDIN_URL__/g,
      /__HAS_TWITTER__/g,
      /__TWITTER_URL__/g,
      /__HAS_WEBSITE__/g,
      /__WEBSITE_URL__/g,
    ],
    to: [
      FULL_NAME,
      ALIAS,
      HAS_BLOG,
      BLOG_URL,
      HAS_GITHUB,
      GITHUB_URL,
      HAS_LINKEDIN,
      LINKEDIN_URL,
      HAS_TWITTER,
      TWITTER_URL,
      HAS_WEBSITE,
      WEBSITE_URL,
    ],
  });
  return results;
};

const init = async () => {
  try {
    const baseAnswers = await askBaseQuestions();
    // console.log({ baseAnswers });
    const handleAnswers = await askHandleQuestions(baseAnswers);
    // console.log({ handleAnswers });
    await createProject();
    fs.copyFileSync('./card.js', './personal-card/index.js');
    const results = await updateCardFunction({
      FULL_NAME: baseAnswers.name,
      ALIAS: baseAnswers.alias,
      HAS_BLOG: baseAnswers.handles.includes('blog'),
      BLOG_URL: baseAnswers.handles.includes('blog') ? handleAnswers.blog : '',
      HAS_GITHUB: baseAnswers.handles.includes('github'),
      GITHUB_URL: baseAnswers.handles.includes('github') ? handleAnswers.github : '',
      HAS_LINKEDIN: baseAnswers.handles.includes('linkedin'),
      LINKEDIN_URL: baseAnswers.handles.includes('linkedin') ? handleAnswers.linkedin : '',
      HAS_TWITTER: baseAnswers.handles.includes('twitter'),
      TWITTER_URL: baseAnswers.handles.includes('twitter') ? handleAnswers.twitter : '',
      HAS_WEBSITE: baseAnswers.handles.includes('website'),
      WEBSITE_URL: baseAnswers.handles.includes('website') ? handleAnswers.website : '',
    });
    console.log({ results });
  } catch (error) {
    console.log(error);
  }
};

init();
