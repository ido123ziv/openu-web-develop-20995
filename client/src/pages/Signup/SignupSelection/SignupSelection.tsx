import React from 'react';
import { Container, Grid, Segment, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import BackgroundSVG from "../../../ui/BackgroundSVG/BackgroundSVG";
import styles from "./SignupSelection.module.css";

const SignupSelection: React.FC = () => {
  return (
      <>
        <BackgroundSVG />

        <Container className={styles.container}>
          <Segment className={styles.borderedSegment}>
            <Header as="h1" icon textAlign="center" className={styles.headerText}>
              <Icon name="users" />
              Join Our Babysitter Community
            </Header>

            <p className={styles.explanationText}>
              Welcome to our babysitter network! Whether you're a parent looking for trustworthy babysitters or a babysitter seeking new opportunities, our platform is here to connect you. Please select your role below to get started with the relevant sign-up process.
            </p>

            <Grid columns={2} stackable textAlign="center">
              <Grid.Row>
                <Grid.Column>
                  <Link to="/signup/parents">
                    <Segment className={styles.segmentParent}>
                      Parent
                    </Segment>
                  </Link>
                </Grid.Column>
                <Grid.Column>
                  <Link to="/signup/babysitter">
                    <Segment className={styles.segmentBabySitter}>
                      Babysitter
                    </Segment>
                  </Link>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>
      </>
  );
};

export default SignupSelection;
