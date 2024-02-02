# Use an official Node.js runtime as a parent image
FROM node:18 as builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install project dependencies
RUN yarn install

# Copy all files from the current directory to the container working directory
COPY . .

ENV VITE_API_BASE_URL='https://inventorx.ealili.com'
ENV VITE_AUTH_CONFIG_KEY=xA2dE6KYjmK9BLgi0bNPIMGvGrWnw8He
ENV VITE_STORAGE_CONFIG_KEY=kL4MedhwPx4zD0gTTquMCQtMJ9eBtHfc

# Build the Node.js application (replace 'build' with your actual build command)
RUN yarn build

# Use a lightweight Nginx image as the final image
FROM nginx:alpine

# Copy the built application from the previous stage to the Nginx web root directory
#COPY --from=builder /app/dist /usr/share/nginx/html

# Copy from the build
COPY --from=builder /app/dist /var/www

# Copy nginx
COPY docker/nginx/app.conf /etc/nginx/conf.d/default.conf

# Expose the port that the Nginx server will listen on (default is 80)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]