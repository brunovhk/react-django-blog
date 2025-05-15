## Getting Started (Backend)

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
