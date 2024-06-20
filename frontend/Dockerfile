# Step 1: Use an official Node.js image as the base image
FROM node:14-alpine AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the working directory
COPY . .

# Step 6: Build the React application
RUN npm run build

# Step 7: Use an official Nginx image to serve the built application
FROM nginx:alpine

# Step 8: Copy the built files from the previous stage to the Nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose the port that the application will run on
EXPOSE 80

# Step 10: Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
