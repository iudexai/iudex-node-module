// https://pokeapi.co/docs/v2#pokemon-section

import dotenv from 'dotenv';
dotenv.config();
import { Iudex, FunctionJson } from 'iudex';

const getLocationMetadataFunctionJson: FunctionJson = {
  name: 'getLocationMetadata',
  description: 'Get metadata for a location by latitude and longitude.',
  parameters: {
    type: 'object',
    properties: {
      lat: {
        type: 'number',
        description: 'The latitude of the location to get metadata for.',
      },
      lon: {
        type: 'number',
        description: 'The longitude of the location to get metadata for.',
      },
    },
  },
  returns: {
    description: 'Metadata object for the location with: the forecast office, gridId, gridX, gridY',
    type: 'object',
    properties: {
      cwa: {
        description: 'The forecast office that has the forecast for this point.',
        type: 'string',
      },
      gridId: {
        description: 'The grid identifier.',
        type: 'string',
      },
      gridX: {
        description: 'The grid x coordinate.',
        type: 'integer',
      },
      gridY: {
        description: 'The grid y coordinate.',
        type: 'integer',
      },
    },
  },
};

function getLocationMetadata({ lat, lon }: { lat: number; lon: number; }) {
  return fetch(
    `https://api.weather.gov/points/${lat.toFixed(4)},${lon.toFixed(4)}`,
    { method: 'GET', headers: { 'User-Agent': 'example-weather' } },
  )
    .then(res => res.json())
    .then(body => body.properties);
}

const getGridpointForecastFunctionJson: FunctionJson = {
  name: 'getGridpointForecast',
  description: 'Get the forecast for a gridpoint.',
  parameters: {
    type: 'object',
    properties: {
      gridId: {
        type: 'string',
        description: 'The grid identifier.',
      },
      gridX: {
        type: 'integer',
        description: 'The grid x coordinate.',
      },
      gridY: {
        type: 'integer',
        description: 'The grid y coordinate.',
      },
    },
  },
  returns: {
    description: 'Forecast object for the gridpoint.',
    type: 'object',
    properties: {
      updated: {
        description: 'The time the forecast was updated.',
        type: 'string',
      },
      periods: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: {
              description: 'The name of the period.',
              type: 'string',
            },
            startTime: {
              description: 'The start time of the period.',
              type: 'string',
            },
            endTime: {
              description: 'The end time of the period.',
              type: 'string',
            },
            temperature: {
              description: 'The temperature value.',
              type: 'number',
            },
            temperatureUnit: {
              description: 'The temperature unit.',
              type: 'number',
            },
            windSpeed: {
              description: 'The wind speed in miles per hour.',
              type: 'number',
            },
            shortForecast: {
              description: 'A short description of the forecast.',
              type: 'string',
            },
          },
        },
      },
    },
  },
};


function getGridpointForecast({ gridId, gridX, gridY }: { gridId: string; gridX: number; gridY: number; }) {
  return fetch(
    `https://api.weather.gov/gridpoints/${gridId.toUpperCase()}/${gridX},${gridY}/forecast`,
    { method: 'GET', headers: { 'User-Agent': 'example-weather' } },
  )
    .then(res => res.json());
}


const getLocationCoordinateFunctionJson: FunctionJson = {
  name: 'getLocationCoordinate',
  description: 'Get the latitude and longitude for a location string.',
  parameters: {
    type: 'object',
    properties: {
      location: {
        type: 'string',
        description: 'The location to get the latitude and longitude for.',
      },
    },
  },
  returns: {
    description: 'The latitude and longitude for the location.',
    type: 'object',
    properties: {
      latt: {
        description: 'The latitude of the location.',
        type: 'string',
      },
      longt: {
        description: 'The longitude of the location.',
        type: 'string',
      },
    },
  },
};
function getLocationCoordinate({ location }: { location: string; }) {
  return fetch(`https://geocode.xyz/${location}?json=1`)
    .then(res => res.json())
    .then(body => body.results[0].geometry);
}


//////////////////// Example usage ////////////////////

// 1. Load client
const iudex = new Iudex({ apiKey: process.env.IUDEX_API_KEY });
// 2. Upload functions
await iudex.uploadFunctions([
  getLocationMetadataFunctionJson,
  getGridpointForecastFunctionJson,
  getLocationCoordinateFunctionJson,
] as any);
// 3. Link functions
iudex.linkFunctions((fnName: string) => {
  const fn = {
    getLocationMetadata,
    getLocationCoordinate,
    getGridpointForecast,
  }[fnName];
  if (!fn) throw Error(`Function ${fnName} not found.`);
  return fn;
});

// 4. Craft message
const message = 'What is the weather in san francisco';

// 5. Send message
const iudexReply = await iudex.sendMessage(message);
// 6. Log result
console.log(`Result for "${message}": ${iudexReply}`);
