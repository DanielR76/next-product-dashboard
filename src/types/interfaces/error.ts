export interface ErrorHTTP extends Error {
  code: string;
  config: Config;
  status: number;
  request: XMLHttpRequest;
  response: Response;
}

interface Config {
  transitional: Transitional;
  adapter: string[];
  transformRequest: any[];
  transformResponse: any[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  env: Env;
  headers: Headers;
  baseURL: string;
  method: string;
  url: string;
  data: string;
}

interface Transitional {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
}

interface Env {}

interface Headers {
  Accept: string;
  'Content-Type': string;
}

interface Response {
  data: Data;
  config: Config;
  status: number;
  statusText: string;
}

interface Data {
  statusCode: number;
  message: string[];
}
