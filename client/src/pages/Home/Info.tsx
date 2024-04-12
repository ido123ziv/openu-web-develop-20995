import React from 'react';
import { Button, Container, Header, Icon, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

function Info (){
    return (
        <Container>
            <div padded="very" textAlign="center">
                <Header as="h2">
                    <Icon name="users" />
                    Connecting Babysitters & Parents
                </Header>
                <div>
                    <p>
                        <Icon name="child" />
                        Find trusted babysitters
                    </p>
                    <p>
                        <Icon name="sun" color="yellow" />
                        Make your life easier
                    </p>
                    <p>
                        <Icon name="heart"  color="red"/>
                        Endorse your babysitter
                    </p>
                </div>
                <Button primary size="large" icon labelPosition="right">
                    Let's Start
                    <Icon name="right arrow" />
                </Button>
            </div>
        </Container>
    );
};

export default Info;
