FROM node:lts

WORKDIR /app

COPY package.json ./

RUN npm install --force

COPY . /app/

RUN npm run build

ENV NODE_ENV=production PORT=5000 DATABASE_URL=postgres://cxmbycmodgnqcc:7fe20d7cbe33cf0e09d03492769b0d8f79b967f95c9695722beeaeb13562ab5a@ec2-44-196-244-150.compute-1.amazonaws.com:5432/d7m5rqp9fe3oov

CMD ["npm", "start"]