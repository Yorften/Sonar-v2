FROM node:18 AS build

WORKDIR /app

COPY sonar/package*.json ./

RUN npm install

COPY sonar/ .

# Build the Angular app for production
RUN npm run build -- --output-path=/dist

# Serve the app using Nginx
FROM nginx:alpine

COPY --from=build /dist /usr/share/nginx/html

EXPOSE 80

# Entry point
CMD ["nginx", "-g", "daemon off;"]
