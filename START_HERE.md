# Getting Started with LifeQuest

Welcome to LifeQuest, a web application built with Express.js!

# Getting Started

Welcome to our project! This document will guide you through the process of setting up your development environment by forking our repository, cloning your fork, and contributing back with pull requests.

## Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (version 12.x or later recommended)
  - https://nodejs.org/en


## Fork the Repository

Before you start working on your contribution:
1. Visit the GitHub page for our repository.
2. Click the "Fork" button at the top right to create a fork of the repository under your GitHub account. This creates your own copy of the repository where you can make changes.

## Clone Your Fork

Once you have forked the repository, clone it to your local machine to start working on your changes:
```bash
git clone https://github.com/yourusername/yourprojectname.git
cd yourprojectname
```

## Create a New Branch

Before making any changes, create a new branch in your cloned repository. This helps isolate your changes and makes it easier to submit a pull request later:
```bash
git checkout -b feature/YourFeatureName
```
or for bug fixes:
```bash
git checkout -b fix/YourFixName
```

## Install Dependencies

Navigate to your project directory and install the necessary dependencies:
```bash
npm install
npm install react-router-dom
npm install express
```
<!--- Express.js install doc can be found here https://expressjs.com/en/starter/installing.html -->
<hr />
If you are experiencing the following error with npm:

```
Error: ENOENT, stat C:\Users\<username>\AppData\Roaming\npm\
```

Then try running the following command:
```bash
npm install npm -g
```

## Set Up Your Environment

Create a `.env` file in the root of your project and configure the necessary environment variables according to the project's documentation.

## Running the Application

Navigate to the app directory in order to start the application.

Start the application with:
```bash
npm start
```
Visit `http://localhost:3000` in your browser to see the app running. Refresh the page to update changes.

## Contributing Your Changes

After you've completed your changes:
1. Commit your updates with meaningful commit messages.
2. Push your branch to your fork on GitHub.
```bash
git push origin feature/YourFeatureName
```

## Submitting a Pull Request

1. Go to the original repository you forked on GitHub.
2. Click the "Pull Request" button.
3. Choose your fork and branch as the source and the original repository's main branch as the destination.
4. Fill in the pull request details and submit it for review.

## Stay Updated

Ensure your fork stays up-to-date with the main repository by pulling in changes:
```bash
git remote add upstream https://github.com/originalusername/yourprojectname.git
git pull upstream main
```

## Need Help?

If you encounter any issues or have questions, don't hesitate to open an issue in the original repository or reach out to the community.


