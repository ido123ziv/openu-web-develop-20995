import { Button, Icon } from "semantic-ui-react";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import { useState } from "react";

import CardsView from "../../../ui/CardsView/CardsView";
import styles from "./Moderator.module.css";
import { getAllContactRequests, getAllUsers } from "./moderatorServices";
import BackgroundSVG from "../../../ui/BackgroundSVG/BackgroundSVG";
import { userState } from "../../../state/atoms/userAtom";
import Nodata from "../../../ui/NoData/NoData";
import ContactRequestsCards from "./ContactRequestsCards/ContactRequestsCards";

const ModeratorMainView = () => {
  const [content, setContent] = useState<string>("users");
  const user = useRecoilValue(userState);

  const { data: users } = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: getAllUsers,
    onError: (error) => console.log(error),
  });

  const { data: contactRequests } = useQuery({
    queryKey: ["getAllContactRequests"],
    queryFn: getAllContactRequests,
    onError: (error) => console.log(error),
  });

  // const { data: pendingUsers } = useQuery({
  //   queryKey: ["getAllPendingUsers"],
  //   queryFn: getAllContactRequests,
  //   onError: (error) => console.log(error),
  // });

  return (
    <>
      <BackgroundSVG />

      <div className={styles.iconContainer}>
        <Icon name="address card outline" size="huge" className={styles.icon} />
        <p>Here you can see the accounts waiting on action</p>
      </div>
      <div className={styles.headerContainer}>
        <h1 className={styles.h1}>Hello, {user?.name}</h1>

        <div>
          <Button
            content="All Users"
            icon="users"
            labelPosition="left"
            positive={content === "users"}
            className={styles.usersButton}
            onClick={() => setContent("users")}
          />
          <Button
            content="Pending Users"
            icon="users"
            labelPosition="left"
            positive={content === "pendingUsers"}
            className={styles.usersButton}
            onClick={() => setContent("pendingUsers")}
          />
          <Button
            content="Contact Requests"
            icon="mail"
            labelPosition="right"
            positive={content === "contactRequests"}
            className={styles.contactButton}
            onClick={() => setContent("contactRequests")}
          />
        </div>
      </div>
      {content === "users" && (
        <>
          {!users?.length ? (
            <Nodata role={user.role} />
          ) : (
            <CardsView data={users} />
          )}
        </>
      )}

      {content === "contactRequests" && (
        <>
          {!contactRequests?.length ? (
            <Nodata role={user.role} />
          ) : (
            <ContactRequestsCards data={contactRequests} />
          )}
        </>
      )}

      {content === "pendingUsers" && (
        <>
          {!contactRequests?.length ? (
            <Nodata role={user.role} />
          ) : (
            <ContactRequestsCards data={contactRequests} />
          )}
        </>
      )}
    </>
  );
};

export default ModeratorMainView;
