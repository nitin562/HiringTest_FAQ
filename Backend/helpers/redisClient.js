const Redis = require("ioredis");

// Use 'redis' as the hostname when running in Docker
const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",  // 'redis' for Docker, '127.0.0.1' for local
  port: process.env.REDIS_PORT || 6379,
  
});

redis.on("connect", () => console.log("🟢 Redis Connected"));
redis.on("error", (err) => console.error("🔴 Redis Error:", err));

module.exports = redis;
