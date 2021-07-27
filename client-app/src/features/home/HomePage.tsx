import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { ExampleComponent } from "../translations/ExampleCompontent";
import LanguageSelector from "../translations/LanguageSelector";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

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
            <Button as={Link} to={"/reservations"} size="huge" inverted>
              {t("bGoDashboard")}
            </Button>
          </>
        ) : (
          <>
          <Button onClick={() => modalStore.openModal(<LoginForm/>)} size="huge" inverted>
          {t("bLogin")}
          </Button>
          <Button onClick={() => modalStore.openModal(<RegisterForm/>)} size="huge" inverted>
          {t("bRegister")}
          </Button>
          </>
          
        )}

        <LanguageSelector />
      </Container>
    </Segment>
  );
});
