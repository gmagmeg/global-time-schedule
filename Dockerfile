FROM node:20.5.1

ARG UID
ARG GID

RUN if getent passwd $UID ; then echo "User with UID $UID already exists." ; else useradd --uid $UID user ; fi
RUN if getent group $GID ; then echo "Group with GID $GID already exists." ; else groupadd --gid $GID group ; fi

WORKDIR /front

COPY ./ ./

RUN npm install

USER $UID:$GID

CMD ["npm", "run", "dev"]