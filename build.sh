#!/usr/bin/env bash
# Exit on error
set -o errexit

# Navigate to the project directory
cd backend

# Install dependencies
pip install -r requirements.txt

# Convert static asset files
python manage.py collectstatic --no-input

# Apply any outstanding database migrations
python manage.py migrate
