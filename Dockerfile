FROM registry-ddc.digital-pilot.ampaws.com.au/amp-nodejs-base:latest

MAINTAINER "Daniel Whatmuff" <danielwhatmuff@gmail.com>

# Create code directory
RUN mkdir -p /code

# Set code as workdir
WORKDIR /code

# Set timezone
RUN rm /etc/localtime && \
    ln -s /usr/share/zoneinfo/Australia/Sydney /etc/localtime

# Bundle app source
COPY . /code/

CMD [ "npm", "start" ]
