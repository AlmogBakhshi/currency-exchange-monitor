const correncyExchangeRoute = require("./corrency-exchange");

// init all routes
module.exports = (app) => {
    app.use("/api/corrency-exchange", correncyExchangeRoute);
}