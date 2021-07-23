import { useState } from "react";
import { i18n } from "../../translations/i18n";
import { Button, Container, Menu, Flag } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { useStore } from "../stores/store";


export default function NavBar() {
  const { t } = useTranslation();

  const [, setLanguage] = useState("en");

  const handleOnclick = (e: any) => {
    e.preventDefault();
    setLanguage(e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  const {reservationStore} = useStore();
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          HotelScheduler
        </Menu.Item>
        <Menu.Item name={t("tReservations")} />
        <Menu.Item>
          <Button onClick={() => reservationStore.openForm()} positive content={t("bCreateReservation")} />
        </Menu.Item>
      </Container>
      <Container style={{ justifyContent: "flex-end" }}>
        <Menu.Item>
          <Button style={{ margin: 10 }} value="es" onClick={handleOnclick}>
            <Flag name="es" />
          </Button>
          <Button style={{ margin: 10 }} value="en" onClick={handleOnclick}>
            <Flag name="gb eng" />
          </Button>
          <Button style={{ margin: 10 }} value="fr" onClick={handleOnclick}>
            <Flag name="fr" />
          </Button>
          <Button style={{ margin: 10 }} value="pt" onClick={handleOnclick}>
            <Flag name="br" />
          </Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
}
