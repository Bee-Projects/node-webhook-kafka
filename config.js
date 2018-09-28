const config = {
  debug: true,
  kafka: {
    hosts: [
      'kafka-node-1.example.com',
      'kafka-node-2.example.com'
    ],
    username: 'admin',
    password: 'password'
  },
  plugins: {
    github: {
      enabled: true,
      url: 'https://github.com/Bee-Projects/node-webhook-kafka',
      secret: process.env.GITHUB_SHARED_SECRET,
      webhook_path: '/github',
      kafka_topic: 'github-topic'
    }
  }
};

module.exports = config;
