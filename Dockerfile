# Stage 1: Build the Astro project
FROM node:lts-alpine AS node-builder
WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm run build


# Stage 2: Serve the static files with Nginx
#FROM nginx:alpine
#COPY --from=node-builder /app/dist /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]

FROM node:lts-alpine AS runtime
WORKDIR /app
COPY --from=node-builder /app/dist ./dist
COPY --from=node-builder /app/package.json ./package.json
ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD node ./dist/server/entry.mjs