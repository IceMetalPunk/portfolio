import { Request } from 'express';
import { encode, decode } from 'html-entities';
import { QueryResult, QueryResultRow } from 'pg';
import { Fields } from 'formidable';

export const sanitizeDbValuesForHTML = (
  results: QueryResult<QueryResultRow>
): QueryResult<QueryResultRow> => {
  const sanitizeObjectValues = (results: QueryResultRow): QueryResultRow => {
    for (let [key, value] of Object.entries(results)) {
      switch (typeof value) {
        case 'string':
          results[key] = encode(decode(value), { mode: 'nonAscii' });
          break;
        case 'object':
          results[key] = sanitizeObjectValues(value);
          break;
        default:
          continue;
      }
    }
    return results;
  };

  for (let row of results.rows) {
    sanitizeObjectValues(row);
  }
  return results;
};

export const numericQueryParam = (
  req: Request,
  paramName: string,
  defaultValue: number = 1,
  forceInteger: boolean = true
): number => {
  const castingFunction: Function = forceInteger ? parseInt : parseFloat;
  const queryValue = castingFunction(
    (req.query?.[paramName] as string) ?? defaultValue
  );
  return isNaN(queryValue) || !isFinite(queryValue) ? defaultValue : queryValue;
};

export const prepareFormFields = (fields: Fields<string>, expected: string[], required: string[] = []) => {
  const results: Record<string, string | null> = {};
  const allFields: Set<string> = new Set(expected.concat(required));
  if (required.some((key: string) => !fields.hasOwnProperty(key))) {
    return {};
  }
  for (let field of allFields) {
    results[field] = fields[field] ? fields[field][0] : null;
  }
  return results;
}