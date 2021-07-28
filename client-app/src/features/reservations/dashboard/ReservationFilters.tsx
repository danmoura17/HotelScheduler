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
      {/* <Menu vertical size="large" style={{ width: "100%", marginTop: 25 }}>
        <Header icon="filter" attached color="teal" content={t('lFilters')} />
        <Menu.Item content={t('fAllReservations')} />
        <Menu.Item content={t('fFutureReservations')} />
        <Menu.Item content={t('fCancelReservations')} />
      </Menu> */}
      <Header style={{marginTop: 30, marginBottom: 20}} icon="calendar" attached color="teal" content={t('lFilters')} />
      <Calendar allowPartialRange selectRange minDate={today} maxDate={endDate} locale={t('locale')} />
    </>
  );
}
