// https://docs.developer.yelp.com/reference/v3_business_search

import dotenv from 'dotenv';
dotenv.config();
import { Iudex, FunctionJson } from 'iudex';

const searchYelpFunctionJson: FunctionJson = {
  name: 'searchYelp',
  description: 'Search Yelp for businesses.',
  parameters: {
    type: 'object',
    properties: {
      term: {
        type: 'string',
        description: 'The search term, for example "food" or "restaurant name".',
      },
      location: {
        type: 'string',
        description: 'The search location, for example "san francisco".',
      },
    },
  },
  returns: {
    description: 'Array of businesses and attributes: name, url, categories, and hours.',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The name of the business.',
        },
        url: {
          type: 'string',
          description: 'The url of the business.',
        },
        categories: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              alias: {
                type: 'string',
                description: 'The alias of the category.',
              },
              title: {
                type: 'string',
                description: 'The title of the category.',
              },
            },
          },
        },
        hours: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              hours_type: {
                type: 'string',
                description: 'The type of hours.',
              },
              is_open_now: {
                type: 'boolean',
                description: 'Whether the business is open now.',
              },
              open: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    day: {
                      type: 'number',
                      description: 'The day of the week.',
                    },
                    end: {
                      type: 'string',
                      description: 'The end time of the business.',
                    },
                    is_overnight: {
                      type: 'boolean',
                      description: 'Whether the business is open overnight.',
                    },
                    start: {
                      type: 'string',
                      description: 'The start time of the business.',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

function searchYelp(params: { term: string; location: string }) {
  const yelpApiKey = process.env.YELP_API_KEY;
  if (!yelpApiKey) throw Error('YELP_API_KEY environment variable is missing or empty.');

  const urlParams = new URLSearchParams(params);
  return fetch(
    `https://api.yelp.com/v3/businesses/search?sort_by=best_match&limit=20&${urlParams.toString()}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${yelpApiKey}`,
      },
    },
  ).then(response => response.json());
}

//////////////////// Example usage ////////////////////

// 1. Load client
const iudex = new Iudex({ apiKey: process.env.IUDEX_API_KEY });
// 2. Upload functions
await iudex.uploadFunctions([searchYelpFunctionJson] as any);
// 3. Link functions
iudex.linkFunctions((fnName: string) => {
  const fn = { searchYelp }[fnName];
  if (!fn) throw Error(`Function ${fnName} not found.`);
  return fn;
});

// 4. Craft message
const message = 'Find me an upscale restaurant in sf';

// 5. Send message
const iudexReply = await iudex.sendMessage(message);
// 6. Log result
console.log(`Result for "${message}": ${iudexReply}`);
