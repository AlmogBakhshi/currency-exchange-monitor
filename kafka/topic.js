const { Kafka } = require("kafkajs");

module.exports.run = async () => {
    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["localhost:9092"]
        });

        const admin = kafka.admin();
        console.log("Connecting.....");
        await admin.connect();
        console.log("Connected!");
        await admin.createTopics({
            "topics": [{
                "topic": "CurrencyExchange"
            }]
        });
        console.log("Created Successfully!");
        await admin.disconnect();
    }
    catch (err) {
        console.error(`Error: ${err}`.red);
    }
    finally {
        process.exit(0);
    }
}