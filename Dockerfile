# Step 1: Build the app
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Run the app with a lightweight image
FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "run", "start"]
