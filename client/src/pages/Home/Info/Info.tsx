import { Button, Container, Header, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import styles from "./Info.module.css";

function Info() {
  return (
    <Container textAlign="center">
      <div className="">
        <Header as="h2" block>
          <Icon name="users" />
          Connecting Babysitters & Parents
        </Header>
        <div className={styles.bulletPointsContainer}>
          <p>
            <Icon name="child" />
            Find trusted babysitters
          </p>
          <p>
            <Icon name="sun" color="yellow" />
            Make your life easier
          </p>
          <p>
            <Icon name="heart" color="red" />
            Endorse your babysitter
          </p>
        </div>
        <Button
          primary
          size="large"
          icon
          labelPosition="right"
          className={styles.button}
        >
          Let's Start
          <Icon name="arrow right" />
        </Button>
      </div>
    </Container>
  );
}

export default Info;
