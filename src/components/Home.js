import React from 'react';
import { Segment, Button, Divider, Icon, Container, } from 'semantic-ui-react';


const Home = () => (
  <Container textAlign="center">
    <Segment padded>
      <Button
        primary
        href="/login"
        icon
        labelPosition="right"
        size="small"
        >Login
        <Icon name="sign in"/>
      </Button>
      <Divider horizontal>Or</Divider>
      <Button
        secondary
        href="/register"
        icon
        labelPosition="right"
      >Register Now
        <Icon name="signup"/>
      </Button>
    </Segment>
  </Container>
);

export default Home;
