FROM node:22

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
COPY package.json .
COPY pnpm-lock.yaml .
RUN npm install -g pnpm
RUN pnpm install
COPY . .
EXPOSE 3000
CMD node --run dev
