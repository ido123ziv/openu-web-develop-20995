import { FieldValues } from "react-hook-form";

import { BabysitterData } from "../BabysitterProfile/BabysitterProfileInterfaces";
import { ParentData } from "../parentProfile/parentProfileInterfaces";

export const updatedValues = (
  data: FieldValues
): BabysitterData | ParentData | boolean => {
  const result = Object.entries(data).reduce(
    (acc, [key, value]) =>
      value !== "" && value !== undefined ? { ...acc, [key]: value } : acc,
    {}
  );

  if (!Object.keys(result).length) {
    return false;
  }

  return result;
};
