# Railway Quick Deployment Guide

This guide will walk you through deploying your Travelease application to Railway.

## Prerequisites

Before you begin, make sure you have:
- Node.js installed (v16 or higher recommended)
- A Railway account (sign up at [railway.app](https://railway.app))
- Your project code ready
- A terminal or command prompt application

## Deployment Steps

### 1. Prepare Your Project (5 min)

Ensure your project has all necessary configuration files (`package.json`, database configuration, etc.).

### 2. Install Railway CLI (1 min)

**Where to run this:** Open your terminal (Mac/Linux) or Command Prompt/PowerShell (Windows).

```bash
npm i -g @railway/cli
```

**What this does:** Installs the Railway Command Line Interface globally on your computer, allowing you to interact with Railway from your terminal.

**Expected outcome:** You should see npm installing the Railway CLI package. Once complete, you can verify the installation by running `railway --version`.

### 3. Authenticate with Railway (2 min)

**Where to run this:** In the same terminal/command prompt window.

```bash
railway login
```

**What this does:** Opens your web browser to authenticate with your Railway account.

**Expected outcome:** 
- Your browser will open with a Railway login page
- After logging in and authorizing, you'll see a success message in your browser
- Your terminal will confirm the authentication

### 4. Initialize DB (1 min)

**Where to run this:** In your terminal/command prompt, make sure you're in your project's root directory (where your `package.json` file is located).

**How to navigate to your project directory:**
```bash
cd /path/to/your/Travelease/project
```

Then run the following commands:

#### a. Link your local project to Railway

```bash
railway link
```

**What this does:** Connects your local project folder to a Railway project. You'll be prompted to select an existing project or create a new one.

**Expected outcome:** You'll see a list of your Railway projects (if any) or an option to create a new one. After selecting, your project is linked.

#### b. Push database schema

```bash
railway run npm run db:push
```

**What this does:** Runs the `db:push` command from your `package.json` scripts in Railway's environment, pushing your database schema to the Railway database.

**Expected outcome:** You'll see output showing the database schema being pushed and any tables/columns being created.

#### c. Seed the database

```bash
railway run npm run db:seed
```

**What this does:** Runs the `db:seed` command from your `package.json` scripts in Railway's environment, populating your database with initial data.

**Expected outcome:** You'll see output confirming that seed data has been inserted into your database.

### 5. Deploy Your Application (2 min)

**Where to run this:** In the same terminal/command prompt window.

```bash
railway up
```

**What this does:** Deploys your application code to Railway.

**Expected outcome:** Your application will be built and deployed. You'll receive a URL where your application is live.

## Troubleshooting

### Common Issues

**"railway: command not found"**
- Solution: Make sure the Railway CLI installed successfully. Try closing and reopening your terminal, or check if `npm` global packages are in your PATH.

**"Not logged in"**
- Solution: Run `railway login` again and complete the authentication process.

**"No project found"**
- Solution: Run `railway link` and select or create a project.

**Database connection errors**
- Solution: Make sure your Railway project has a database service added. You can add one from the Railway dashboard.

## Additional Resources

- [Railway Documentation](https://docs.railway.app)
- [Railway CLI Reference](https://docs.railway.app/develop/cli)

## Summary

The key point to remember: **All these commands are run in your terminal/command prompt application, in your project's root directory.** The Railway CLI handles communication between your local machine and Railway's servers, making deployment straightforward.
