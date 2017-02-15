// Utils
import {httpUtil} from '../utils';

let solarSizeUrl = 'bill';

export function post(payload) {
  return httpUtil.post(solarSizeUrl, payload);
}
