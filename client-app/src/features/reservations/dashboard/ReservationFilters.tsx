import moment from "moment";
import React from "react";
import Calendar from "react-calendar";
import { useTranslation } from "react-i18next";
import { Header, Menu } from "semantic-ui-react";

export default function ReservationFilters() {
  const { t } = useTranslation();

  var today = new Date()
  var endDate = new Date()
  endDate.setMonth(today.getMonth()+1)
  
  return (
    <>
      <Menu vertical size="large" style={{ width: "100%", marginTop: 25 }}>
        <Header icon="filter" attached color="teal" content="Filters" />
        <Menu.Item content="All reservations" />
        <Menu.Item content="Future reservations" />
        <Menu.Item content="Canceled reservations" />
      </Menu>
      <Header />
      <Calendar allowPartialRange selectRange minDate={today} maxDate={endDate} locale={t('locale')} />
    </>
  );
}
