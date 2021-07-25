import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { ExampleComponent } from "../translations/ExampleCompontent";
import LanguageSelector from "../translations/LanguageSelector";
import LoginForm from "../users/LoginForm";

export default observer(function HomePage() {
  const { t } = useTranslation();
  const { userStore, modalStore } = useStore();

  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <ExampleComponent />
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          HotelScheduler
        </Header>
        {userStore.isLoggedIn ? (
          <>
            <Header>Bem vindo </Header>
            <Button as={Link} to={"/reservations"} size="huge" inverted>
              {t("bGoDashboard")}
            </Button>
          </>
        ) : (
          <>
          <Button onClick={() => modalStore.openModal(<LoginForm/>)} size="huge" inverted>
            Take me to login
          </Button>
          <Button onClick={() => modalStore.openModal(<h1></h1>)} size="huge" inverted>
            Register
          </Button>
          </>
          
        )}

        <LanguageSelector />
      </Container>
    </Segment>
  );
});
