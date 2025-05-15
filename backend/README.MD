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
---
## API Documentation

This project uses [`drf-yasg`](https://github.com/axnsan12/drf-yasg) to generate interactive API documentation.

- Swagger UI: [http://localhost:8000/swagger/](http://localhost:8000/swagger/)
- Redoc: [http://localhost:8000/redoc/](http://localhost:8000/redoc/)
---

## Notes

This backend uses [`dockerize`](https://github.com/jwilder/dockerize) to ensure the database is ready before starting Django.

**Why use it?**

Sometimes, the Django app tries to connect to PostgreSQL before the service is fully available, which results in connection errors. `dockerize` adds a wait strategy to avoid this.

**How it works:**

In `docker-compose.yml`, the command for the backend is defined as:

```yaml
command: >
  dockerize -wait tcp://db:5432 -timeout 30s -- sh -c "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"
```
---
