FROM nginx:alpine

COPY ./dist/ /usr/share/nginx/html/wechatvote/

EXPOSE 80
