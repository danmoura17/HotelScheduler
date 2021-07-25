import { Button, Container, Menu } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import LanguageSelector from "../../features/translations/LanguageSelector";


export default function NavBar() {
  const { t } = useTranslation();

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to='/' exact header >
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          HotelScheduler
        </Menu.Item>
        <Menu.Item as={NavLink} to='/reservations' name={t("tReservations")} />
        <Menu.Item as={NavLink} to='/errors' name={t("Errors")} />
        <Menu.Item>
          <Button as={NavLink} to='/createReservation' positive content={t("bCreateReservation")} />
        </Menu.Item>
      </Container>
      <Container style={{ justifyContent: "flex-end" }}>
        <LanguageSelector/>
      </Container>
    </Menu>
  );
}
