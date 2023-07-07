# Stage 1: Build the first image
FROM node:18-alpine as builder1

# Build arguments for user/group configurations
ARG USER=wso2ipk
ARG USER_ID=10001
ARG USER_GROUP=wso2
ARG USER_GROUP_ID=10001
ARG USER_HOME=/home/${USER}

# Create a user group and a user
RUN addgroup -S -g ${USER_GROUP_ID} ${USER_GROUP} \
    && adduser -S -D -h ${USER_HOME} -G ${USER_GROUP} -u ${USER_ID} ${USER}

# Create app directory
WORKDIR ${USER_HOME}

# Set a non-root user
USER 10001

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci

# Bundle app source
COPY --chown=${USER}:${USER_GROUP} . .

# Build the app
RUN npm run build

# Stage 2: Build the second image
FROM debian as builder2

RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*

ARG USER=wso2ipk
ARG USER_ID=10001
ARG USER_GROUP=wso2
ARG USER_GROUP_ID=10001
ARG USER_HOME=/home/${USER}

# Create a user group and a user
RUN addgroup --system --gid ${USER_GROUP_ID} ${USER_GROUP} \
    && adduser --system --disabled-login --home ${USER_HOME} --gid ${USER_GROUP_ID} --uid ${USER_ID} ${USER}

# Create app directory
WORKDIR ${USER_HOME}

# Set a non-root user
USER 10001

RUN wget https://github.com/oauth2-proxy/oauth2-proxy/releases/download/v7.4.0/oauth2-proxy-v7.4.0.linux-amd64.tar.gz \
&& tar -xvf oauth2-proxy-v7.4.0.linux-amd64.tar.gz && rm oauth2-proxy-v7.4.0.linux-amd64.tar.gz

# Stage 3: Final image
FROM node:18-alpine

# Build arguments for user/group configurations
ARG USER=wso2ipk
ARG USER_ID=10001
ARG USER_GROUP=wso2
ARG USER_GROUP_ID=10001
ARG USER_HOME=/home/${USER}

# Create a user group and a user
RUN addgroup -S -g ${USER_GROUP_ID} ${USER_GROUP} \
    && adduser -S -D -h ${USER_HOME} -G ${USER_GROUP} -u ${USER_ID} ${USER}

# Create app directory
WORKDIR ${USER_HOME}

# Set a non-root user
USER 10001

# Copy the necessary artifacts from the first build stage
COPY --from=builder1 --chown=${USER}:${USER_GROUP} ${USER_HOME}/ .

# Copy the necessary artifacts from the second build stage
COPY --from=builder2 --chown=${USER}:${USER_GROUP} ${USER_HOME}/ .

RUN chmod +x startup.sh

EXPOSE 4180

# Define the entry point or any other configuration needed to run the combined images
ENTRYPOINT ["/bin/sh"]
CMD ["./startup.sh"]
