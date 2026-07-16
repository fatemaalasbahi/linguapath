import type { z } from "zod";

const UNSUPPORTED_JSON_SCHEMA_KEYS = new Set([
  "$schema",
  "minLength",
  "maxLength",
  "minItems",
  "maxItems",
  "minimum",
  "maximum",
]);

function stripUnsupportedJsonSchemaFields(value: unknown): unknown {
  if (!value || typeof value !== "object") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(stripUnsupportedJsonSchemaFields);
  }

  const result: Record<string, unknown> = {};

  for (const [key, nestedValue] of Object.entries(value)) {
    if (UNSUPPORTED_JSON_SCHEMA_KEYS.has(key)) {
      continue;
    }

    result[key] = stripUnsupportedJsonSchemaFields(nestedValue);
  }

  return result;
}

export function toGeminiJsonSchema(schema: z.ZodType): Record<string, unknown> {
  const jsonSchema = stripUnsupportedJsonSchemaFields(
    schema.toJSONSchema(),
  ) as Record<string, unknown>;

  return jsonSchema;
}
