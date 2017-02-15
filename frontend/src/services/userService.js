// Utils
import {httpUtil} from '../utils';

let userServiceUrl = 'user';

export function post(payload) {
    return httpUtil.post(userServiceUrl, payload);
}
