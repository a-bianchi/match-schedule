import { Config } from '../../config';
const { api } = Config;
// Or just specify it directly like this:
// const API_URL = "http://example.com"

/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string;

  /**
   * The token authorization of the api.
   */
  token?: string;

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number;
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: api.url,
  timeout: api.timeout,
};
