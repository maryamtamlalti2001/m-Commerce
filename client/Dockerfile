FROM node:16-alpine as builder
WORKDIR /client
COPY ["package.json", "package-lock.json", "./"]
RUN npm install
COPY . .
RUN npm run build


FROM node:19.9.0-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
COPY . .
EXPOSE 3000
CMD ["node", "start"]