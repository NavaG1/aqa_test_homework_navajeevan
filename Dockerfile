# Use the official CodeceptJS image as the base image
FROM codeceptjs/codeceptjs

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Switch to the root user to install additional dependencies
USER root

# Set write permissions explicitly
RUN chmod +w /usr/src/app/package.json /usr/src/app/package-lock.json

# Install any additional dependencies you might need
# For example, if you need to install Node.js packages, you can use npm here
RUN npm cache clean --force && \
    npm install --production --unsafe-perm=true --allow-root && \
    npm install puppeteer --unsafe-perm=true --allow-root

RUN apt-get update && \
    apt-get install -y \
      gconf-service \
      libasound2 \
      libatk1.0-0 \
      libc6 \
      libcairo2 \
      libcups2 \
      libdbus-1-3 \
      libexpat1 \
      libfontconfig1 \
      libgcc1 \
      libgconf-2-4 \
      libgdk-pixbuf2.0-0 \
      libglib2.0-0 \
      libgtk-3-0 \
      libnspr4 \
      libpango-1.0-0 \
      libpangocairo-1.0-0 \
      libstdc++6 \
      libx11-6 \
      libx11-xcb1 \
      libxcb1 \
      libxcomposite1 \
      libxcursor1 \
      libxdamage1 \
      libxext6 \
      libxfixes3 \
      libxi6 \
      libxrandr2 \
      libxrender1 \
      libxss1 \
      libxtst6 \
      ca-certificates \
      fonts-liberation \
      libappindicator1 \
      libnss3 \
      lsb-release \
      xdg-utils \
      wget \
      git && \
    rm -rf /var/lib/apt/lists/*

# Set the cache path for Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH /home/app/.cache/puppeteer/chromium

# Download and install Chrome
RUN mkdir -p /home/app/.cache/puppeteer/chromium && \
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list && \
    apt-get update && \
    apt-get install -y google-chrome-stable && \
    rm -rf /var/lib/apt/lists/*

# Create a new user named "app"
RUN adduser --disabled-password --gecos "" app

# Change the ownership of the working directory to the new user
RUN chown -R app /usr/src/app

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Switch to the "app" user
USER app

# Run CodeceptJS tests
CMD ["npx", "codeceptjs", "run", "--steps"]
