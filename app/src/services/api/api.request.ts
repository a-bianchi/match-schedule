import { ApisauceInstance, create, ApiResponse } from 'apisauce';
import { getGeneralApiProblem } from './api.problem';
import { ApiConfig, DEFAULT_API_CONFIG } from './api.config';
import * as Types from './api.types';

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce!: ApisauceInstance;

  /**
   * Configurable options.
   */
  config: ApiConfig;

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  init = () => {
    // construct the apisauce instance
    if (!this.apisauce) {
      this.apisauce = create({
        baseURL: this.config.url,
        timeout: this.config.timeout,
        headers: {
          Accept: 'application/json',
          //Authorization: ,
        },
      });
    }

    return this.apisauce;
  };

  /**
   * Gets Match api ping.
   */
  async getPing(): Promise<Types.GetApiPingResult> {
    // make the api call
    const response: ApiResponse<any> = await this.init().get('ping');

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        return problem;
      }
    }

    // transform the data into the format we are expecting
    try {
      return { kind: 'ok', response: response.data.results };
    } catch {
      return { kind: 'bad-data' };
    }
  }
}
