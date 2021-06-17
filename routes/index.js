const correncyExchangeRoute = require("./corrency-exchange");

module.exports = (app) => {
    app.use("/api/corrency-exchange", correncyExchangeRoute);
}