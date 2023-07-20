FROM node:18-alpine
WORKDIR /usr/app/frontend
EXPOSE 3000
COPY package.json package.json
RUN npm install
COPY . .
RUN npm build
CMD ["npm", "start"]
