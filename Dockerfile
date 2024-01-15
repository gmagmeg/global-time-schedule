FROM node:20.5.1

USER root
RUN mkdir /v-schedule && chown -R node:node /v-schedule

USER node
COPY --chown=node:node ./front ./
WORKDIR /v-schedule/front
RUN npm i

CMD ["npm", "run", "dev"]