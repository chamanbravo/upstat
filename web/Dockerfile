FROM node:lts-alpine AS builder
WORKDIR /app 
COPY package*.json .
RUN npm i
COPY . .
RUN npm run build
RUN rm -rf node_modules

FROM nginx:alpine
COPY --from=builder /app/dist /var/www/html
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
