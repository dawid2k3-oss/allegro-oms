# Backend Dockerfile
FROM node:18-alpine

# Ustawienie katalogu roboczego
WORKDIR /app

# Kopiowanie package.json i package-lock.json
COPY package*.json ./

# Instalacja dependencies
RUN npm ci --only=production

# Kopiowanie kodu źródłowego
COPY . .

# Budowanie TypeScript
RUN npm run build

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

# Uruchomienie aplikacji
CMD ["npm", "start"]
