import React from "react";
import { useTranslation } from "react-i18next";
import { Header } from "semantic-ui-react";
 
export const ExampleComponent = () => {
const { t } = useTranslation();
 
 return (
   <Header as='h1' inverted content={t("welcome")}/>
 );
};