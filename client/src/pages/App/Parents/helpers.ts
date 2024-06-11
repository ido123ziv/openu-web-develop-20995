import { CardsData } from "../../../ui/CardsView/CardViewProps";

export const sortBabysitters = (data: CardsData[], key: string) => {
  switch (key) {
    case "name":
      return data.sort((a, b) => a.name.localeCompare(b.name));
    case "experience":
      return data.sort((a, b) =>
        (a.experience as string).localeCompare(b.experience as string)
      );
    // case "rating":
    //     return data.sort((a, b) =>
    //         (a.r as string).localeCompare(b.experience as string)
    //       );
    // case "proximity":
    // return data.sort((a, b) =>
    //         (a.r as string).localeCompare(b.experience as string)
    //       );
    default:
      console.log("bad swtich"); //TODO: REMEMBER TO ERASE BEFORE SHELLY GETS MAD
      break;
  }
};

export const filterBabysitters = (
  data: CardsData[],
  filterOptions: string[]
): CardsData[] => {
  return data;
};
