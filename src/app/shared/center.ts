import {Retailer} from './retailer';

export class Center {
  id: string;
  name: string;
  state: string;
  website: string;
  retailers: Retailer[];
}
