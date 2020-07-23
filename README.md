# Load Testing a Pactflow On-Premise Installation

The goals of this test framework are threefold:

1. Have a way to quickly get a base, representative load through the system, so that we can run resilience, chaos and other tests and understand the potential impact to users
1. Understand scaling properties of your platform - e.g. CPU, I/O or network bound. This should help you tune autoscaling, metrics and alarms.
1. Understand the limits of the system

## Installation

*Prerequisites*
* NodeJS v8+
* npm 5+

```
npm i
```

## Running

The setup is (mostly) configurable for multiple environments with the `-e` switch.

### 1. Set the authentication token for the test

Get a read/write API token from your running Pactflow instance, and update the Bearer token in `./fixtures/accounts-dev.csv`.

### 2. Setup base data

This will pre-seed a number of consumers, providers and contracts into the system.

```
npm run setup
```

### 3. Run the load test

```
npm run load
```

### 4. Review the report

```
npm run report
```

### Adjusting the scenarios

The scenarios are currently loosely balanced based on the mix that we (Pactflow) see on our cloud platform. You may need to adjust the mix for your specific needs.

See https://artillery.io/ for complete documentation on the tool.

## Cleaning up

Trick question! This is really intended for ephemeral infrastructure or testing out the performance of a new stack.

There is no simple way to cleanup here; tear down and rebuild the stack.