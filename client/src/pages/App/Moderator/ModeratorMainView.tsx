import { useState } from "react";
import CardsView from "../../../ui/CardsView/CardsView";

const ModeratorMainView = () => {
  const [data, setData] = useState([0, 1, 2, 3, 4]);

  return <CardsView data={data} />;
};

export default ModeratorMainView;
