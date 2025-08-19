# Stage 1: Build the Astro project
FROM node:lts-alpine AS node-builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

#FROM node:lts-alpine AS runtime
WORKDIR /app
COPY dist ./dist
COPY package.json ./package.json
ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD node ./dist/server/entry.mjs