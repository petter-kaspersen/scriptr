FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build
RUN node ./global_scripts/install-default-packages.js

CMD ["npm", "run", "start"]