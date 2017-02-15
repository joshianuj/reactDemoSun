import Location from '../models/Location';

export function fetchById(id) {
  return Location.findOne({
      _id: id
  })
}
