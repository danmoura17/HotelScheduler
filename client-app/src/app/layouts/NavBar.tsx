import { Button, Container, Menu, Image, Dropdown } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import LanguageSelector from "../../features/translations/LanguageSelector";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function NavBar() {
  const { t } = useTranslation();
  const {
    userStore: { user, logout },
  } = useStore();

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" exact header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          HotelScheduler
        </Menu.Item>
        <Menu.Item as={NavLink} to="/reservations" name={t("tReservations")} />
        <Menu.Item as={NavLink} to="/errors" name={t("Errors")} />
        <Menu.Item>
          <Button
            as={NavLink}
            to="/createReservation"
            positive
            content={t("bCreateReservation")}
          />
        </Menu.Item>
      </Container>
      <Container style={{ justifyContent: "flex-end" }}>
        <LanguageSelector />
      </Container>
      <Menu.Item position="right" style={{marginRight: 100}}>
        <Image src={user?.image || "/assets/user.png"} avatar spaced="right" />
        <Dropdown pointing="top left" text={user?.displayName}>
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              to={`/profile/${user?.username}`}
              text="My Profile"
              icon="user"
            />
            <Dropdown.Item onClick={logout} text="Logout" icon="power" />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </Menu>
  );
});
