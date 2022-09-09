FROM node:16.14.2-alpine3.14 as build

WORKDIR /usr/app

COPY ["package*.json","."]

RUN ["npm","i"]

COPY [".","."]

RUN ["\$(npm bin)/tsc"]

FROM node:16.14.2-alpine3.14

WORKDIR /usr/app

ENV NODE_ENV=production HOST=0.0.0.0 PORT=3000

COPY --from=build /usr/app/dist .
COPY ["package*.json","."]
COPY ["keys","./keys"]

RUN ["npm","i","--production"]

EXPOSE ${PORT}

CMD ["node","index.js"]