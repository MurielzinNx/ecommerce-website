# Dockerfile for backend (Node + SQLite example)
FROM node:18-slim
WORKDIR /usr/src/app
COPY server/package*.json ./
RUN npm install --production
COPY server/ .
# Expose port (Render sets PORT env, Docker will use 4000 by default)
EXPOSE 4000
CMD ["node", "server.js"]