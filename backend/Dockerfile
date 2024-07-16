FROM node:18

WORKDIR /usr/src/app

COPY . .

RUN bash db.sh

EXPOSE 3000

CMD ["node", "server.js"]
