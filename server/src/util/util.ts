import { Request } from 'express';
import { encode, decode } from 'html-entities';
import { QueryResult, QueryResultRow } from 'pg';

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
