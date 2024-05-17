import { Icon } from "semantic-ui-react";

import CardsView from "../../../ui/CardsView/CardsView";
import styles from "./Moderator.module.css";
import { useQuery } from "react-query";
import { getAllUsers } from "./moderatorServices";
import BackgroundSVG from "../../../ui/BackgroundSVG/BackgroundSVG";

const ModeratorMainView = () => {
  const { data } = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: getAllUsers,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => console.log(error),
  });

  return (
    <>
      <BackgroundSVG />

      <div className={styles.iconContainer}>
        <Icon name="address card outline" size="huge" className={styles.icon} />
        <p>Here you can see the accounts waiting on action</p>
      </div>
      <h1 className={styles.h1}>Hello, PLACEHOLDER</h1>
      <div>FILTERS AND SORTERS</div>
      {!data ? <p>NODATA</p> : <CardsView data={data} />}
    </>
  );
};

export default ModeratorMainView;
