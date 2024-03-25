import { describe, expect, test } from '@jest/globals';
import { functionJsonSchema, coerceFunctionJsonSchema, FunctionJson } from '../src';

test('Strict parse true', () => {
  const schema: FunctionJson = {
    name: 'getCurrentWeather',
    description: 'Gets the current weather',
    parameters: {
      type: 'object',
      properties: {
        location: {
          type: 'string',
          description: 'The location to get the weather for',
        },
        unit: { type: 'string', enum: ['celsius', 'fahrenheit'] },
      },
      required: ['location'],
    },
    returns: {
      type: 'object',
      properties: {
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
  };

  const jsonSchema = functionJsonSchema.safeParse(schema);
  expect(jsonSchema.success).toBe(true);
});

test('Strict parse false', () => {
  const schema: any = {
    name: 'getCurrentWeather',
    description: 'Gets the current weather',
    parameters: {
      type: 'object',
      properties: {
        location: {
          type: 'string',
          description: 12345,
        },
        unit: { type: 'string', enum: ['celsius', 'fahrenheit'] },
      },
      required: ['location'],
    },
  };

  const jsonSchema = functionJsonSchema.safeParse(schema);
  expect(jsonSchema.success).toBe(false);
});

test('Loose parse true', () => {
  const schema: any = {
    name: 'getCurrentWeather',
    description: 'Gets the current weather',
    parameters: {
      type: 'object',
      properties: {
        location: {
          type: 'string',
          description: 12345,
        },
        unit: { type: 'string', enum: ['celsius', 'fahrenheit'] },
      },
      required: ['location'],
    },
  };

  const coercedJsonSchema = coerceFunctionJsonSchema.safeParse(schema);
  expect(coercedJsonSchema.success).toBe(true);
});
