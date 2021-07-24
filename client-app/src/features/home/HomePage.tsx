import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { ExampleComponent } from "../../ExampleCompontent";

export default function HomePage() {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
      <ExampleComponent/>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          HotelScheduler
        </Header>
       
        <Button as={Link} to={'/reservations'} size='huge' inverted> 
            Take me to the Reservations!
        </Button>
      </Container>
    </Segment>
  );
}
