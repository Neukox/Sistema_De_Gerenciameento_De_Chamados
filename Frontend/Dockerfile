# etapa de build
FROM --platform=linux/arm64 node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

#etapa de produção
FROM --platform=linux/arm64 nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Copiando o arquivo de configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expondo a porta 80
EXPOSE 80