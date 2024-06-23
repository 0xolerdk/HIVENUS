#Build stage
FROM node:14 as build-stage
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

#Production stage
FROM nginx:stable-alpine
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
