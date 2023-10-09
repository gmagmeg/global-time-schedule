FROM node:20.5.1

USER root
RUN mkdir /front && chown node:node /front

USER node

WORKDIR /front

COPY --chown=node:node ./front ./

RUN npm install

CMD ["npm", "run", "dev"]