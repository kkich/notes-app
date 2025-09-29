FROM node:22-alpine
# COPY package*.json /opt/
# COPY ./server /opt/server
# COPY ./ui /opt/ui 
WORKDIR /opt/server
# WORKDIR /usr/src/app
COPY ./server/package*.json ./
RUN npm install 
# COPY . .
# COPY ./server ./server
COPY ./server .
ENV NODE_PATH=/opt/node_modules
ENV PORT=3000
EXPOSE ${PORT}

CMD ["node", "index.js"]