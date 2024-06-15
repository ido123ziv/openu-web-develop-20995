import { Button, Header, Icon } from "semantic-ui-react";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import { useState } from "react";

import CardsView from "../../../ui/CardsView/CardsView";
import styles from "./Moderator.module.css";
import {
  getAllContactRequests,
  getAllPendingUsers,
  getAllUsers,
} from "./moderatorServices";
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

  const { data: pendingUsers } = useQuery({
    queryKey: ["getAllPendingUsers"],
    queryFn: getAllPendingUsers,
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
          <p>Here you can see the accounts waiting on action</p>
        </div>
        <div className={styles.headerContainer}>
          <div className={styles.buttonsStyle}>
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
              <Nodata role={user.role} message="No Contact Requests" />
            ) : (
              <ContactRequestsCards data={contactRequests} />
            )}
          </>
        )}

        {content === "pendingUsers" && (
          <>
            {!pendingUsers?.length ? (
              <Nodata role={user.role} message="No Pending Users" />
            ) : (
              <CardsView data={pendingUsers} screen="pending" />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ModeratorMainView;
