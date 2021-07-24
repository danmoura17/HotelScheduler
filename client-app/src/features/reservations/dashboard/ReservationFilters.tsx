import React from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

export default function ReservationFilters() {
  return (
    <>
      <Menu vertical size="large" style={{ width: "100%", marginTop: 25 }}>
        <Header icon="filter" attached color="teal" content="Filters" />
        <Menu.Item content="All reservations" />
        <Menu.Item content="Future reservations" />
        <Menu.Item content="Canceled reservations" />
      </Menu>
      <Header />
      <Calendar />
    </>
  );
}
