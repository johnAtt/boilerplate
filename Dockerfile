# app
FROM node:16.13-alpine3.12

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.0/wait /wait
RUN chmod +x /wait

WORKDIR /home/node/app
USER root

COPY ./client/dist/ ./client/dist
COPY ./server/dist/ ./server/dist
COPY ./server/node_modules/ ./server/node_modules

## Launch the wait tool and then your application
CMD ["sh","-c","/wait && node server/dist/main.js" ]
