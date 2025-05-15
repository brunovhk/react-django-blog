FROM node:20-alpine

# Work directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy source code
COPY . .

# App build
RUN npm run build

# Commands for development
CMD ["npm", "run", "dev", "--", "--host"]
