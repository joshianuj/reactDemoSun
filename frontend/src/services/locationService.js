// Utils
import {httpUtil} from '../utils';
let locationUrl = 'location';

export function fetchAll() {
  return httpUtil.get(locationUrl);
}
