import React from "react";
import { useTranslation } from "react-i18next";
 
export const ExampleComponent = () => {
const { t } = useTranslation();
 
 return (
   <div>
      <p style={{fontSize:50}}>
        {t("welcome")}
      </p>
   </div>
 );
};