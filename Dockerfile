# Use an official Node.js runtime as the parent image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the container
COPY package*.json ./

# Install the application dependencies inside the container
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Make the container's port 3000 available to the outside world
EXPOSE 3000

# Start the application when the container launches
CMD [ "node", "index.js" ]
