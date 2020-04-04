# base image
FROM node:lts

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
COPY yarn.lock /usr/src/app/yarn.lock
COPY tsconfig.json /usr/src/app/tsconfig.json
RUN yarn install --silent
COPY src /usr/src/app/src
COPY public /usr/src/app/public

# start app
ENTRYPOINT ["yarn"]
CMD ["start"]