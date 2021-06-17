const { Kafka } = require("kafkajs");
const fetch = require("node-fetch");
const CorrencyExchange = require("../models/corrency-exchange");

const run = async () => {
    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["localhost:9092"]
        });

        const producer = kafka.producer();
        console.log("Connecting.....");
        await producer.connect();
        console.log("Connected!");

        fetch("https://api.vatcomply.com/rates?base=USD")
            .then(res => res.json())
            .then(res => {
                Object.keys(res.rates).map(country => {
                    CorrencyExchange.findOne({ "country": country })
                        .then(async data => {
                            res.rates[country] > data.currenc &&
                                await producer.send({
                                    "topic": "CurrencyExchange",
                                    "messages": [{ "value": `${country}: ${res.rates[country]}` }]
                                });
                            data.updateOne({ "currency": res.rates[country] });
                        })
                });
            })
            .catch(err => console.error(`Error: ${err}`.red))

        console.log(`Send Successfully!`);
        await producer.disconnect();
    }
    catch (err) {
        console.error(`Error: ${err}`.red);
    }
    finally {
        process.exit(0);
    }
}

setInterval(() => { run(); }, ((1000 * 60) * 60) * 12);