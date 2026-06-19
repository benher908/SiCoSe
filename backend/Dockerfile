FROM node:20-bookworm-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run prisma:generate && npm run build

EXPOSE 3000

CMD ["sh", "-c", "npm run prisma:migrate:deploy && npm start"]
