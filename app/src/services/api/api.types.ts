import { GeneralApiProblem } from './api.problem';

export type GetApiPingResult =
  | { kind: 'ok'; response: string }
  | GeneralApiProblem;
