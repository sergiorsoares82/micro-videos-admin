FROM node:22.0.8-slim

USER node

WORKDIR /home/node/app

CMD ["tail", "-f", "/dev/null"]