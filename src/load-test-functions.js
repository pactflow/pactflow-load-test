const { generatePact } = require("./pact");

const MAX_APPLICATIONS = 10000;

const setupInteraction = (context, events, done) => {
  context.vars.consumer = `application-${Math.floor(Math.random() * MAX_APPLICATIONS)}`;
  context.vars.provider = `application-${Math.floor(Math.random() * MAX_APPLICATIONS)}`;
  return done();
};

const setupPactPublish = (requestParams, context, ee, next) => {
  requestParams.json = generatePact(
    context.vars.consumer,
    context.vars.provider
  );
  context.vars.version = generateRandomVersion();
  context.vars.tag = `some-tag-${Math.floor(Math.random() * 50)}`

  return next();
};

const extractRandomProvider = (context, events, next) => {
  try {
    const res = JSON.parse(response.body)["_links"]["pb:pacticipants"];
    const pacticipants = res.filter((v) => v.name.startsWith("provider"));
    context.vars.provider = pacticipants[rand(pacticipants.length - 1)].name;
  } catch (e) {
    console.log(e)
  }
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

const selectRandomPageFromTotalPages = (requestParams, context, ee, next) => {
  context.vars.randomPageNumber = Math.floor(Math.random() * context.vars.totalPages);
  next()
}

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
  setupInteraction,
  selectRandomPageFromTotalPages
};
