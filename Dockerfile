FROM registry-ddc.digital-pilot.ampaws.com.au/amp-nodejs-with-deps:latest

MAINTAINER "Daniel Whatmuff" <danielwhatmuff@gmail.com>

CMD [ "npm", "run", "server:express" ]

ENV TZ 'Australia/Sydney'

# Create code directory and remove anything just in case
RUN mkdir -p /code && rm -rf /code/*

# Set permissions for node and set timezone
RUN rm /etc/localtime && \
    ln -s /usr/share/zoneinfo/Australia/Sydney /etc/localtime

# Set code as workdir
WORKDIR /code

# Set user to node
USER node

# Copy app source
COPY . /code/
