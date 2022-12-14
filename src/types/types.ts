import { ElementStates } from "./element-states";

export interface IArr {
  number: number;
  elState?: ElementStates;
}

export interface IArrChar {
  0?: string;
  elState?: ElementStates;
}

export interface IQueue {
  number: string;
  elState?: ElementStates;
}

export interface IList {
  number?: string;
  elState?: ElementStates;
  isProgressing?: Boolean;
}
