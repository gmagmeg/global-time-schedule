FROM node:20.5.1

USER root

RUN mkdir -p /global-time-schedule/front && chown node:node /global-time-schedule

USER node

WORKDIR /global-time-schedule/front

# COPY --chown=node:node ./front ./

CMD ["npm", "run", "dev"]