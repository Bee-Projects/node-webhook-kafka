const _ = require('lodash');
const kafka = require('kafka-node');

process.env.NODE_TLS_REJECT_UNAUTHORIZED=0;

module.exports.getRoutes = (config) => {
  return [
    {
      path: '/github/PullRequestWebhook',
      method: 'post',
      handler: async function(req, res, next) {
        var pullRequest = req.body;
        var client = new kafka.KafkaClient({
          kafkaHost: config.kafka.hosts,
          sslOptions: true
        });

        var producer = new kafka.Producer(client);
        var dtStamp = (new Date())
        payloads = [
          { topic: config.kafka.topic, messages: dtStamp + ' This is a message 1 from producer.js' },
          { topic: config.kafka.topic, messages: dtStamp + ' This is a message 2 from producer.js' }
        ];
        producer.on('ready', function () {
          producer.send(payloads, function (err, data) {
            console.log(payloads)
            if (err != null) console.log(err)
            client.close()
          });
        });


        producer.on('error', function (err) {
          console.log("The error:"+ err);
        })

        // If PR was opened
        if (pullRequest.action == "opened") {
        }

        // If PR was merged
        if (pullRequest.action == "closed" && pullRequest.merged == true) {
        }
      }
    }
  ];
}
