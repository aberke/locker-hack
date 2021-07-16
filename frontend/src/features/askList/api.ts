import { getLockerInfoFromPlaceId } from "../lockers/api";

export const getInfoForLockers = async (lockerIds) => {
  let results = lockerIds.map(getLockerInfoFromPlaceId);
  return Promise.all(results);
};
