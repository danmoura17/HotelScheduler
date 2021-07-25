import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { ExampleComponent } from "../translations/ExampleCompontent";
import LanguageSelector from "../translations/LanguageSelector";

export default function HomePage() {

  const { t } = useTranslation();

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
            {t('bGoDashboard')}
        </Button>

       <LanguageSelector/>
      </Container>
     
        
    </Segment>
  );
}
