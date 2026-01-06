FROM node:18 AS build

WORKDIR /app

COPY sonar/package*.json ./

RUN npm install

COPY sonar/ .

# Build the Angular app for production
RUN npm run build -- --output-path=/dist

# Serve the app using Nginx
FROM nginx:alpine

# Remove default Nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the (now flattened) /dist directory
COPY --from=build /dist /usr/share/nginx/html

RUN if [ -d "/usr/share/nginx/html/browser" ]; then \
        echo "Moving content from /browser to root..."; \
        mv /usr/share/nginx/html/browser/* /usr/share/nginx/html/ && \
        rm -rf /usr/share/nginx/html/browser; \
    elif [ -d "/usr/share/nginx/html/sonar" ]; then \
        echo "Moving content from /sonar to root..."; \
        mv /usr/share/nginx/html/sonar/* /usr/share/nginx/html/ && \
        rm -rf /usr/share/nginx/html/sonar; \
    fi

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
