FROM registry-ddc.digital-pilot.ampaws.com.au/amp-nodejs-base:latest

MAINTAINER "Daniel Whatmuff" <danielwhatmuff@gmail.com>

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

CMD [ "npm", "test" ]
