const { Kafka } = require("kafkajs");

module.exports = async () => {
    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["localhost:9092"]
        });

        const consumer = kafka.consumer({ "groupId": "test" })
        console.log("Connecting.....");
        await consumer.connect();
        console.log("Connected!");

        await consumer.subscribe({
            "topic": "Users",
            "fromBeginning": true
        });

        await consumer.run({
            "eachMessage": async (result) => {
                console.log(`Alert: ${result.message.value}`);
            }
        })
    }
    catch (err) {
        console.error(`Error ${err}`.red);
    }
}