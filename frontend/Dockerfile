FROM node:18-alpine

WORKDIR /app

# Kopiuj package files
COPY package*.json ./

# Instaluj dependencies
RUN npm ci

# Kopiuj kod źródłowy
COPY . .

# Zbuduj aplikację React
RUN npm run build

# Zainstaluj serve do serwowania static files
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Uruchom aplikację
CMD ["serve", "-s", "build", "-l", "3000"]
