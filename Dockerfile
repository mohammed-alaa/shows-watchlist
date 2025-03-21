# Use Node.js 20.18.2 as base image
FROM node:20.18.2-alpine as build-stage

# Set the working directory
WORKDIR /app

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install the dependencies
RUN yarn install

# Copy the rest of the files
COPY . /app

# Build the app
RUN yarn build

# Use Node.js 20.18.2 as base image
FROM node:20.18.2-alpine as production-stage

# Set the working directory
WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=build-stage /app/.output /app/.output
COPY --from=build-stage /app/node_modules /app/node_modules

# Expose the port
EXPOSE 3000

# Start the app
CMD ["yarn", "start"]
