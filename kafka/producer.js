const { Kafka } = require("kafkajs");
const fetch = require("node-fetch");
const CorrencyExchange = require("../models/corrency-exchange");

// Fetch and check every 12 hours
setInterval(() => { this.run() }, ((1000 * 60) * 60) * 12);

const Producer = async (country, currency, currency_before, base) => {
    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["localhost:9092"]
        });

        const producer = kafka.producer();
        console.log("Connecting.....");
        await producer.connect();
        console.log("Connected!");


        await producer.send({
            "topic": "CurrencyExchange",
            "messages": [{ "value": `${country} currency value rises from ${currency_before} to ${currency} (base: ${base})` }]
        })

        console.log("Send Successfully!");
        await producer.disconnect();
    }
    catch (err) {
        console.error(`Error: ${err}`.red);
    }
}

module.exports.run = async () => {
    await fetch("https://api.vatcomply.com/rates?base=USD")
        .then(res => res.json())
        .then(res => {
            Object.keys(res.rates).map(country => {
                CorrencyExchange.findOne({ "country": country })
                    .then(async data => {
                        res.rates[country] > data.currency && await Producer(country, res.rates[country], data.currency, res.base);
                        await data.updateOne({ "currency": res.rates[country] });
                    })
            });
        })
        .catch(err => console.error(`Error: ${err}`.red))
}