FROM node:4-slim

RUN mkdir -p /usr/restlint 
COPY . /usr/restlint

WORKDIR /usr/restlint

RUN npm install

ENTRYPOINT ["node", "cli.js"]
CMD ["swagger.json"]