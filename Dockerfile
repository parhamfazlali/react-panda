FROM node:dubnium

ARG API_URL

ENV HOME_DIR=/usr/src/app \
    NODE_HOST=0.0.0.0 \
    NODE_PORT=8080 \
    API_URL=${API_URL}

COPY . ${HOME_DIR}

WORKDIR ${HOME_DIR}

RUN set -x \
    && yarn \
    && yarn build \
    && yarn cache clean

EXPOSE 8080
CMD [ "yarn", "prod" ]
