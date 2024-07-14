FROM node:21
COPY . /user/src/app
WORKDIR /user/src/app
RUN apt-get update && \
    apt-get install -y \
    libglib2.0-dev && \
    rm -rf /var/lib/apt/lists/*
RUN npm install
EXPOSE 3021
CMD ["node","index.js"]