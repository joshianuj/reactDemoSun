import _ from 'lodash';
  /*
 removes empty value from an object
 param @obj Object whose empty value is removed
 */
export function removeEmptyValue(obj) {
  for (var key in obj) {
    if (obj[key] === '' || obj[key]== undefined) {
      delete obj[key];
    }
    else if (typeof obj[key] == 'object') {
      obj[key] = this.removeEmptyValue(obj[key])
    }
  }
  return obj;
}

export function removeEmptyObject(obj){
  Object.keys(obj).forEach(function(k) {
    if (_.isEmpty(obj[k])) {
      delete obj[k];
    }
  });
  return obj;
}
