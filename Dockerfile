FROM registry-ddc.digital-pilot.ampaws.com.au/amp-nodejs-with-deps:latest

MAINTAINER "Daniel Whatmuff" <danielwhatmuff@gmail.com>

ENV TZ 'Australia/Sydney'

# Create code directory
RUN mkdir -p /code

# Set code as workdir
WORKDIR /code

# Set permissions for node and set timezone
RUN chown -R node:node /code && \
    rm /etc/localtime && \
    ln -s /usr/share/zoneinfo/Australia/Sydney /etc/localtime

# Set user to node
USER node

# Bundle app source
COPY . /code/

CMD [ "npm", "start" ]
