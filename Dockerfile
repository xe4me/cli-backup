FROM registry-ddc.digital-pilot.ampaws.com.au/amp-nodejs-with-deps:latest

MAINTAINER "Francis Naoum" <francis_naoum@amp.com.au>

# Create code directory and remove anything just in case
RUN mkdir -p /code && \
    rm -rf /code/*

# Copy app source
COPY . /code/

# Set /code as workdir
WORKDIR /code

# Set permissions for node and set timezone
RUN chown -R node:node /code && \
    rm /etc/localtime && \
    ln -s /usr/share/zoneinfo/Australia/Sydney /etc/localtime

# Set user to node
USER node

RUN amp-ng build --prod

CMD [ "npm", "run", "server:express" ]
