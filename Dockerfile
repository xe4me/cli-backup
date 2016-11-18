FROM registry-ddc.digital-pilot.ampaws.com.au/amp-nodejs-base:latest

MAINTAINER "Daniel Whatmuff" <danielwhatmuff@gmail.com>

ENV TZ 'Australia/Sydney'

# Create code directory
RUN mkdir -p /code

# Bundle app source
COPY . /code/

# Set permissions for node and set timezone
RUN chown -R node:node /code && \
    rm /etc/localtime && \
    ln -s /usr/share/zoneinfo/Australia/Sydney /etc/localtime

# Set code as workdir
WORKDIR /code

# Set user to node
USER node

CMD [ "npm", "start" ]
