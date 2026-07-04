import { Request } from 'express';
import { QueryResult, QueryResultRow } from 'pg';
export declare const sanitizeDbValuesForHTML: (results: QueryResult<QueryResultRow>) => QueryResult<QueryResultRow>;
export declare const numericQueryParam: (req: Request, paramName: string, defaultValue?: number, forceInteger?: boolean) => number;
