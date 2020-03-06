import { Teams } from './Teams';

export interface Hero {
  id: number;
  name: string;
  favorite: boolean;
  organization: Teams;
}
