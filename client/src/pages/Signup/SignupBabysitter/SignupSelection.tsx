import { Container, Grid, Segment } from "semantic-ui-react";

import styles from "./SignupSelection.module.css";
import { Link } from "react-router-dom";

const SignupSelection = () => {
  return (
    <Container className={styles.container}>
      <Grid columns={2} stackable>
        <Grid.Row>
          <Grid.Column>
            <Link to="/signup/parents">
              <Segment className={styles.segmentParent}>Parents</Segment>
            </Link>
          </Grid.Column>
          <Grid.Column>
            <Link to="/signup/babysitter">
              <Segment className={styles.segmentBabySitter}>Babysitter</Segment>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default SignupSelection;
