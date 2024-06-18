import { Header, Icon } from "semantic-ui-react";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";

import BackgroundSVG from "../../../ui/BackgroundSVG/BackgroundSVG";
import CardsView from "../../../ui/CardsView/CardsView";
import styles from "./Parents.module.css";
import { userState } from "../../../state/atoms/userAtom";
import { getAllBabysitters } from "./parentServices";

const ParentsMainView = () => {
  const user = useRecoilValue(userState);

    const {data} = useQuery({
        queryKey: ["getAllBabysitters"],
        queryFn: () => getAllBabysitters(user.id),
        onError: (error) => console.log(error),
    });

  return (
    <>
      <BackgroundSVG />

      <div className={styles.borderedDiv}>
        <div className={styles.iconContainer}>
          <Header as="h2" icon textAlign="center">
            <Icon name="address card outline" circular />
            <Header.Content>Hello, {user?.name}</Header.Content>
          </Header>
          <p>Here you can see the babysitters available in your area</p>
        </div>

        <CardsView data={data} />
      </div>
    </>
  );
};

export default ParentsMainView;
