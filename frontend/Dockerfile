FROM node:16-alpine

WORKDIR /app

COPY frontend/package*.json ./

RUN npm install

COPY frontend/ ./

RUN npm run build #build the react app

RUN npm install -g serve #install serve

EXPOSE $PORT

CMD ["serve", "-s", "build", "-l", "$PORT"]