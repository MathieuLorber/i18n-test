/** @jsxImportSource @emotion/react */
/* eslint-disable import/no-webpack-loader-syntax */
import { css } from "@emotion/react";
import { createContext, PropsWithChildren, useState } from "react";
import { Button } from "@mui/material";

export const LanguageContext = createContext({
  language: "fr",
});

export const Updater = (props: PropsWithChildren<{}>) => {
  const [language, setLanguage] = useState("en");
  return (
    <div>
      <div
        css={css`
          margin: 10px 0 20px 0;
        `}
      >
        <span
          css={css`
            border: 1px solid #282c34;
            padding: 5px;
          `}
        >
          <select
            onChange={(e) => setLanguage(e.target.value)}
            value={language}
          >
            <option value="en">en</option>
            <option value="fr">fr</option>
            <option value="-">-</option>
          </select>
          <Button>Pull request changes</Button>
        </span>
      </div>
      <LanguageContext.Provider value={{ language }}>
        {props.children}
      </LanguageContext.Provider>
    </div>
  );
};
