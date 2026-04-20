# Backend - Django + DRF

This folder contains the backend API built with **Django 5.2.1** and **Django REST Framework 3.16.0**, providing JWT authentication, post and comment management, author stats, and OpenAPI documentation.

---

## 🚀 Features

- JWT authentication with `SimpleJWT`
- CRUD for posts with rich-text and tag support
- Nested comment system with moderation (`is_approved`)
- Author profile with total posts and approved comments
- OpenAPI (Swagger,Redoc) auto-generated docs via `drf-yasg`
- Seeder script using `Faker` for demo data
- Docker-ready setup for local or production deploys

---

## 📦 Requirements

Key dependencies:

- `Django==5.2.1`
- `djangorestframework==3.16.0`
- `djangorestframework_simplejwt==5.5.0`
- `Faker==37.3.0`
- `drf-yasg==1.21.10`
- `gunicorn`, `uvicorn`, `django-cors-headers`, `python-decouple`

---

## 📦 Installation

Windows (PowerShell)

```powershell
cd backend
python -m venv venv
source venv/Scripts/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Linux / macOS / WSL

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Access admin panel:

```text
http://localhost:8000/admin/
```

Access Swagger docs:

```text
http://localhost:8000/swagger/

```

---

## 🧪 Seed Demo Data

To populate the database with realistic demo content:

```bash
python manage.py seed_demo
```

This creates:

- 3 demo users (`demo_user1`, `demo_user2`, ...)
- 48 posts with random tags
- Nested approved comments

---

## 📁 API Endpoints (simplified)

| Method   | Endpoint                        | Description                    |
| -------- | ------------------------------- | ------------------------------ |
| POST     | `/api/users/register/`          | Create a new user              |
| POST     | `/api/users/token/`             | Obtain JWT access token        |
| GET      | `/api/posts/`                   | List paginated posts           |
| GET      | `/api/posts/{id}/`              | View a single post             |
| GET      | `/api/users/me/`                | Authenticated user profile     |
| GET      | `/api/users/author/{username}/` | Public author stats            |
| GET/POST | `/api/comments/`                | Create + list comments by post |

> Full route docs available at `/swagger` and `/redoc`.

## 📚 API Documentation

This project uses [`drf-yasg`](https://github.com/axnsan12/drf-yasg) to generate interactive API documentation.

- Swagger UI: [http://localhost:8000/swagger/](http://localhost:8000/swagger/)
- Redoc: [http://localhost:8000/redoc/](http://localhost:8000/redoc/)

## 🔐 How to Authenticate in Swagger

1. Go to `POST /api/users/token/` and enter your credentials.
2. Copy the `access` token returned.
3. Click on the 🔐 "Authorize" button at the top right.
4. Paste the token like this: `Bearer your_token_here`
5. Now you can access all protected routes.

---

## 🐳 Docker & Deploy

This backend is fully containerized for deployment:

### Docker Compose (dev)

```bash
docker-compose up --build
```

### Render (prod hosting)

- Build via render.yaml
- Set env vars via Render dashboard
- Start command: `gunicorn config.wsgi:application --bind 0.0.0.0:8000`

---

## 🔐 Env Variables (example)

`.env.example`

**Local development:**

```env
SECRET_KEY=your_secret_here
DEBUG=True
DATABASE_URL=postgres://postgres:postgres@db:5432/blog
ALLOWED_HOSTS=localhost,127.0.0.1
CSRF_TRUSTED_ORIGINS=http://localhost:8000
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

**Production:**

```env
SECRET_KEY=your_secret_here
DEBUG=False
DATABASE_URL=postgres://postgres:postgres@db:5432/blog
ALLOWED_HOSTS=your-domain.com
CSRF_TRUSTED_ORIGINS=https://your-domain.com
CORS_ALLOWED_ORIGINS=https://your-domain.com
```

> `ALLOWED_HOSTS` accepts a comma-separated list of domains. Set it to your hosting provider's domain — no code changes needed when switching providers.

---

## Notes

This backend uses [`dockerize`](https://github.com/jwilder/dockerize) to ensure the database is ready before starting Django.

**Why use it?**

Sometimes, the Django app tries to connect to PostgreSQL before the service is fully available, which results in connection errors. `dockerize` adds a wait strategy to avoid this.

**How it works:**

In `docker-compose.yml`, the backend service is started with the following command:

```yaml
command: >
  dockerize -wait tcp://db:5432 -timeout 30s -- sh -c "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"
```

> ⚠️ This strategy is only used for local development and is not part of the production build on Render.

---

## 📄 License

See root [`README.md`](../README.md)
