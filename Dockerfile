# ---- Build stage: Vite produces static files ----
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
# Vite inlines VITE_* variables at build time.
ARG VITE_BE_URL=http://localhost:8080
ARG VITE_GOOGLE_OAUTH_CLIENT_ID=""
ENV VITE_BE_URL=$VITE_BE_URL \
    VITE_GOOGLE_OAUTH_CLIENT_ID=$VITE_GOOGLE_OAUTH_CLIENT_ID
RUN npm run build

# ---- Runtime stage: nginx serves the static files ----
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
