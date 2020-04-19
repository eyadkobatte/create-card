#!/usr/bin/env node

/* eslint-disable no-console */
const inquirer = require('inquirer');

const init = async () => {
  const baseQuestions = [
    {
      type: 'input',
      name: 'name',
      message: 'What name do you go by?',
    },
    {
      type: 'checkbox',
      name: 'handles',
      message: 'Select your social handles',
      choices: [
        { name: 'Blog', value: 'Blog' },
        { name: 'GitHub', value: 'GitHub' },
        { name: 'LinkedIn', value: 'LinkedIn' },
        { name: 'Twitter', value: 'Twitter' },
        { name: 'Website', value: 'Website' },
      ],
    },
  ];

  const answers = await inquirer.prompt(baseQuestions);

  const { handles } = answers;

  const handleQuestions = handles.map((handle) => {
    let message = 'Whats your handle?';
    let filter = (value) => value;
    switch (handle) {
      case 'Blog':
        message = 'What blog do you own?';
        break;
      case 'GitHub':
        message = 'What is your GitHub Handle?';
        filter = (value) => `https://github.com/${value}`;
        break;
      case 'LinkedIn':
        message = 'What is your LinkedIn Handle?';
        filter = (value) => `https://www.linkedin.com/in/${value}`;
        break;
      case 'Twitter':
        message = 'What is your Twitter Handle?';
        filter = (value) => `https://twitter.com/${value}`;
        break;
      case 'Website':
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
    };
  });

  const handleAnswers = await inquirer.prompt(handleQuestions);
  console.log({ handleAnswers });
};

init();
