FROM registry-ddc.digital-pilot.ampaws.com.au/amp-nodejs-with-angularcli:latest

MAINTAINER "Francis Naoum" <francis_naoum@amp.com.au>

# Create code directory and remove anything just in case
# Set permissions for node and set timezone
RUN mkdir -p /code && \
    rm /etc/localtime && \
    ln -s /usr/share/zoneinfo/Australia/Sydney /etc/localtime

# Set /code as workdir
WORKDIR /code

# Copy app source
COPY . /code/

# Set user to node
USER node

CMD [ "npm", "run", "server:express" ]
