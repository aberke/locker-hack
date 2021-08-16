FROM node:latest as build
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY frontend/package.json /usr/src/app

RUN yarn install

COPY ./frontend/ /usr/src/app
RUN yarn build

# Backend
FROM tiangolo/uwsgi-nginx-flask:python3.8
ENV STATIC_INDEX 1

COPY ./backend/requirements.txt /app/
RUN pip install -r /app/requirements.txt


COPY ./backend/ /app
COPY --from=build /usr/src/app/build/ /app/
RUN mkdir -p /app/static
COPY --from=build /usr/src/app/build/ /app/static

EXPOSE 80