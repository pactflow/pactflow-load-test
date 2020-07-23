// Make sure to "npm install faker" first.
const Faker = require('faker');

const generatePact = (consumer, provider) => (
{
  "consumer": {
    "name": consumer
  },
  "provider": {
    "name": provider
  },
  "interactions": [
    {
      "description": "a request for all animals",
      "providerState": "Has some animals",
      "request": {
        "method": "GET",
        "path": "/animals/available",
        "query": "param[]=1",
        "matchingRules": {
          "$.query.param[]": {
            "min": 1
          },
          "$.query.param[][*].*": {
            "match": "type"
          }
        }
      },
      "response": {
        "status": 200,
        "headers": {
          "Content-Type": "application/json; charset=utf-8"
        },
        "body": [
          {
            "id": 1,
            "available_from": "2015-08-06T16:53:10.123+01:00",
            "first_name": Faker.name.firstName(),
            "last_name": Faker.name.lastName(),
            "animal": "goat",
            "age": 21,
            "gender": "M",
            "location": {
              "description": "Melbourne Zoo",
              "country": "Australia",
              "post_code": Faker.address.zipCode
            },
            "eligibility": {
              "available": true,
              "previously_married": false
            },
            "interests": [
              "walks in the garden/meadow"
            ]
          },
          {
            "id": 1,
            "available_from": "2015-08-06T16:53:10.123+01:00",
            "first_name": Faker.name.firstName(),
            "last_name": Faker.name.lastName(),
            "animal": "goat",
            "age": 21,
            "gender": "M",
            "location": {
              "description": "Melbourne Zoo",
              "country": "Australia",
              "post_code": Faker.address.zipCode
            },
            "eligibility": {
              "available": true,
              "previously_married": false
            },
            "interests": [
              "walks in the garden/meadow"
            ]
          }
        ],
        "matchingRules": {
          "$.body": {
            "min": 2
          },
          "$.body[*].*": {
            "match": "type"
          },
          "$.body[*].id": {
            "match": "type"
          },
          "$.body[*].available_from": {
            "match": "regex",
            "regex": "^\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d:[0-5]\\d\\.\\d{3}([+-][0-2]\\d:[0-5]\\d|Z)$"
          },
          "$.body[*].first_name": {
            "match": "type"
          },
          "$.body[*].last_name": {
            "match": "type"
          },
          "$.body[*].animal": {
            "match": "type"
          },
          "$.body[*].age": {
            "match": "type"
          },
          "$.body[*].gender": {
            "match": "regex",
            "regex": "F|M"
          },
          "$.body[*].location.description": {
            "match": "type"
          },
          "$.body[*].location.country": {
            "match": "type"
          },
          "$.body[*].location.post_code": {
            "match": "type"
          },
          "$.body[*].eligibility.available": {
            "match": "type"
          },
          "$.body[*].eligibility.previously_married": {
            "match": "type"
          },
          "$.body[*].interests": {
            "min": 1
          },
          "$.body[*].interests[*].*": {
            "match": "type"
          }
        }
      }
    }
  ],
  "metadata": {
    "pactSpecification": {
      "version": "2.0.0"
    }
  }
})

module.exports = {
    generatePact
}