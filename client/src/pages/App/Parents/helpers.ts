import { CardsData } from "../../../ui/CardsView/CardViewProps";

export const sortBabysitters = (data: CardsData[], key: string) => {
  switch (key) {
    case "name":
      return data.sort((a, b) => a.name.localeCompare(b.name));
    case "experience":
      return data.sort((a, b) =>
        (a.experience as string).localeCompare(b.experience as string)
      );
    case "rating":
      return data.sort((a, b) => (b.rating as number) - (a.rating as number));
    case "proximity":
      return data.sort((a, b) => Number(a.distance) - Number(b.distance));
    default:
      break;
  }
};

export const filterBabysitters = (
  data: CardsData[],
  filters: string[]
): CardsData[] => {
  const newData = data.filter((babysitter) => {
    return filters.every((filter) => {
      if (filter === "goodRating") {
        return (babysitter.rating as number) >= 3;
      }
      if (filter === "badRating") {
        return (babysitter.rating as number) < 3;
      }
      if (filter === "No Experience") {
        return babysitter.experience === "no_experience";
      }
      if (filter === "1-3 Years") {
        return babysitter.experience === "mid";
      }
      if (filter === "3+ years") {
        return babysitter.experience === "high";
      }
      return true;
    });
  });

  return newData;
};
