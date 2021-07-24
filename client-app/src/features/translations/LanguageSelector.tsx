import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Flag, Image, Menu } from "semantic-ui-react";
import { i18n } from "../../translations/i18n";

export default function LanguageSelector(){

    const { t } = useTranslation();

  const [, setLanguage] = useState("en");

  const handleOnclick = (e: any) => {
    e.preventDefault();
    setLanguage(e.target.value);
    i18n.changeLanguage(e.target.value);
  };
  
    return(
        <>
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
        </>     
    )
}