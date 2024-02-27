// https://pokeapi.co/docs/v2#pokemon-section

import dotenv from 'dotenv';
dotenv.config();
import { Iudex, FunctionJson } from 'iudex';

const getPokemonFunctionJson: FunctionJson = {
  name: 'getPokemon',
  description: 'Get pokemon data by id or name.',
  parameters: {
    type: 'object',
    properties: {
      idOrName: {
        type: 'string',
        description: 'The id or name of the pokemon to get.',
      },
    },
  },
  returns: {
    description: 'Object with pokemon data such as name, base experience, and height.',
    type: 'object',
    properties: {
      id: {
        description: 'The identifier for this resource.',
        type: 'integer',
      },
      name: {
        description: 'The name for this resource.',
        type: 'string',
      },
      base_experience: {
        description: 'The base experience gained for defeating this Pokémon.',
        type: 'integer',
      },
      height: {
        description: 'The height of this Pokémon in decimetres.',
        type: 'integer',
      },
      weight: {
        description: 'The weight of this Pokémon in hectograms.',
        type: 'integer',
      },
      stats: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            base_stat: {
              type: 'integer',
              description: 'The base value of the stat.',
            },
            effort: {
              type: 'integer',
              description: 'The effort points (EVs) gained by defeating this Pokémon.',
            },
            stat: {
              type: 'object',
              description: 'The stat the Pokémon has.',
              properties: {
                name: {
                  type: 'string',
                },
                url: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      types: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            slot: {
              type: 'integer',
              description: 'The order the Pokémon\'s types are listed in.',
            },
            type: {
              type: 'object',
              description: 'The type the Pokémon has.',
              properties: {
                name: {
                  type: 'string',
                },
                url: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  },
};

function getPokemon({ idOrName }: { idOrName: string }) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`)
    .then(response => response.json());
}

//////////////////// Example usage ////////////////////

// 1. Load client
const iudex = new Iudex({ apiKey: process.env.IUDEX_API_KEY });
// 2. Upload functions
await iudex.uploadFunctions([getPokemonFunctionJson] as any);
// 3. Link functions
iudex.linkFunctions((fnName: string) => {
  const fn = { getPokemon }[fnName];
  if (!fn) throw Error(`Function ${fnName} not found.`);
  return fn;
});

// 4. Craft message
const message = 'Get me the starting stats for pikachu.';

// 5. Send message
const iudexReply = await iudex.sendMessage(message);
// 6. Log result
console.log(`Result for "${message}": ${iudexReply}`);
