const { generatePact } = require("./pact");

const setupPactPublish = (requestParams, context, ee, next) => {
  requestParams.json = generatePact(
    context.vars.consumer,
    context.vars.provider
  );
  context.vars.version = generateRandomVersion();

  return next();
};

const extractRandomProvider = (requestParams, response, context, ee, next) => {
  try {
    const res = JSON.parse(response.body)["_links"]["pb:pacticipants"];
    const pacticipants = res.filter((v) => v.name.startsWith("provider"));
    context.vars.provider = pacticipants[rand(pacticipants.length - 1)].name;
  } catch (e) {}
  return next();
};

const logResponse = (requestParams, response, context, ee, next) => {
  console.log(response);
  return next();
};
const logRequest = (requestParams, context, ee, next) => {
  console.log(requestParams);
  return next();
};
const generateRandomVersion = () => Date.now();

const rand = (max) => {
  if (max === 0) return 0;
  return Math.floor(Math.random() * max) + 1;
};

// Add this to arrays so we can select random elements
Array.prototype.rand = function () {
  return rand(this.length - 1);
};

module.exports = {
  setupPactPublish,
  generateRandomVersion,
  extractRandomProvider,
  logRequest,
  logResponse,
};
