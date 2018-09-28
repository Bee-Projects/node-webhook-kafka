FROM node:8.12.0

# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN npm install --verbose

ONBUILD ADD package.json /usr/src/app/package.json
ONBUILD ADD config.js /usr/src/app/config.js
ONBUILD ADD plugins /usr/src/app/plugins/
ONBUILD RUN npm install --verbose

EXPOSE 3000
CMD [ "npm", "start" ]
