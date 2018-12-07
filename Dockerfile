FROM node:10

USER node

COPY . /home/node/app

WORKDIR /home/node/app

EXPOSE 8080

ENV NODE_ENV=production

CMD ["npm", "run", "start"]
