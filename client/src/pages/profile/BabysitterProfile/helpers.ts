import { FieldValues } from "react-hook-form";

import { BabysitterData } from "./BabysitterProfileInterfaces";

export const updatedValues = (data: FieldValues): BabysitterData => {
  return Object.entries(data).reduce(
    (acc, [key, value]) =>
      value !== "" && value !== undefined ? { ...acc, [key]: value } : acc,
    {}
  );
};
