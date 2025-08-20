# Backend Dockerfile - Fixed TypeScript build
FROM node:18-alpine

WORKDIR /app

# Kopiuj package files
COPY package*.json ./

# Instaluj WSZYSTKIE dependencies (włącznie z devDependencies dla TypeScript)
RUN npm ci

# Kopiuj kod źródłowy
COPY . .

# Zbuduj TypeScript aplikację
RUN npm run build

# Usuń devDependencies po build (opcjonalne - oszczędza miejsce)
RUN npm prune --production

# Expose port
EXPOSE 3001

# Uruchom zbudowaną aplikację
CMD ["npm", "start"]
