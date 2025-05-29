# etapa de build
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

#etapa de produção
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Copiando o arquivo de configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expondo a porta 80
EXPOSE 80