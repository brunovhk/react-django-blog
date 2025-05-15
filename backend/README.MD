## Getting Started (Backend)

# Stack
- Django 4+
- Django REST Framework
- drf-yasg (Swagger/OpenAPI)
- dotenv for environment config

# Project Structure
- `config/`: Django project settings
- `users/`: user auth and profile (to be created)
- `posts/`: blog post logic (to be created)
- `comments/`: nested comments (to be created)

```bash
# Clone the repo
git clone https://github.com/brunovhk/react-django-blog.git
cd react-django-blog/backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Run initial migration and start server
python3 manage.py migrate
python3 manage.py runserver
```
