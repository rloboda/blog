# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY frontend/package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY frontend/ ./

# Expose the port your React app runs on
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]