module.exports = {
  apps: [
    {
      name: "ehostelz-app",
      script: "dist/index.js",           // Run the Node.js server, not static files
      instances: 1,                      // Start with 1 instance
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3033,                      // Your desired port
      },
    },
  ],
};