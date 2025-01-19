# Contributing to Our Python Django Project

We're excited that you're interested in contributing to our project! This document provides the guidelines for contributing and setting up your development environment.

## Setting Up Your Development Environment

To contribute to this project, you'll need to set up a local development environment. Don't worry if you're new to this; just follow the steps below:

### 1. Clone the Forked Repository

First, you need to get a copy of our project on your local machine by "cloning" the repository.

```bash
git clone https://github.com/visheshshukla345/InPowerApp.git
cd InPowerApp
```

### 2. Create a Virtual Environment

Next, you need to create a virtual environment for the project. This will keep your project dependencies isolated from your other projects.

```bash
# On macOS and Linux
python3 -m venv venv

```

### 3. Activate the Virtual Environment

After creating the virtual environment, you need to activate it.

```bash
# On macOS and Linux
source venv/bin/activate

# On Windows
# venv\Scripts\activate
```

### 4. Install the Project Dependencies

Now that you have activated the virtual environment, you can install the project dependencies.

```bash
pip install -r requirements.txt
```

### 5. Run the Project Locally

Finally, you can run the project on your local machine.

```bash
python backend/[app_name]/manage.py runserver
```

### 6. Contributing Code

Now that you have set up your development environment, you can start contributing code to the project. Here are the general steps to follow:

1. Create a new branch for your feature or bug fix.

```bash
git checkout -b [branch_name]
```

2. Make your changes to the code.

3. Add and commit your changes.

```bash
git add .
git commit -m "A descriptive commit message about the changes"
```

4. Push your changes to the remote repository.

```bash
git push origin [branch_name]
```

5. Create a pull request on GitHub.

6. Wait for the maintainers to review your pull request.

7. Make any necessary changes based on the feedback.

8. Once your pull request is approved, it will be merged into the main branch.

Congratulations! You have successfully contributed to our project. Thank you for your contribution!
