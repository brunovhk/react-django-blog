FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Work Directory
WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Dockerize
RUN apt-get update && apt-get install -y wget && \
    wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz && \
    tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.6.1.tar.gz && \
    rm dockerize-linux-amd64-v0.6.1.tar.gz

# Copy and install requirements
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy project
COPY . .

# Migrate and collect static files
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
