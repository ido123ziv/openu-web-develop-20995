import { useState } from "react";
import { Card } from "semantic-ui-react";

import CardsView from "../../../ui/CardsView/CardsView";

const ParentsMainView = () => {
  // CALL TO DB TO GET ALL DATA
  const [data, setData] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 1, 1]);

  return <CardsView data={data} />;
};

export default ParentsMainView;
