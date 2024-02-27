// https://docs.developer.yelp.com/reference/v3_business_search

import dotenv from 'dotenv';
dotenv.config();
import { Iudex } from 'iudex';
import yelp from 'yelp-fusion';
import { FunctionJson } from './function-types.js';

const client = yelp.client('YOUR_API_KEY');

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
    description: 'Array of businesses and its attributes which contains: name, url, categories, and hours.',
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

function searchYelp({ term, location }: { term: string; location: string }) {
  return client.search({
    term,
    location,
  }).then((res: any) => res.jsonBody.businesses);
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
