# Etapa de build
FROM --platform=linux/amd64 node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm install
RUN npx prisma generate
COPY . .
RUN npm run build

# Etapa de produção
FROM --platform=linux/amd64 node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env ./
COPY --from=builder /app/prisma ./prisma
COPY package*.json ./
RUN npm install --only=production
CMD ["node", "dist/server.js"]
# Expondo a porta 5000
EXPOSE 5000