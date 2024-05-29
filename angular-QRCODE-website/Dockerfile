# Dockerfile

# Étape de construction
FROM node:14 as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Étape de production
FROM nginx:alpine
COPY --from=builder /app/dist/my-angular-app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["sh", "-c", "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && nginx -g 'daemon off;'"]
