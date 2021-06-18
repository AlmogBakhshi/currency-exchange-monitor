const fetch = require("node-fetch");
const CorrencyExchange = require("../models/corrency-exchange");

// Create data in db if not exist
module.exports = async () => {
    await CorrencyExchange.find().then(data => data.length === 0 &&
        fetch("https://api.vatcomply.com/rates?base=USD")
            .then(res => res.json())
            .then(res => {
                Object.keys(res.rates).map(country =>
                    CorrencyExchange.create({
                        "country": country,
                        "currency": res.rates[country]
                    })
                );
            })
            .catch(err => console.error(`Error: ${err}`.red)))
}