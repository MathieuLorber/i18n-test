import {createContext, PropsWithChildren, useState} from "react";

export const LanguageContext = createContext({
    language: global.language
})

export const Updater = (props: PropsWithChildren<{}>) => {
    const [language, setLanguage] = useState(global.language)
    return (
        <div>
            <button onClick={() => {
                if (language === 'fr') {
                    setLanguage("en");
                } else {
                    setLanguage("fr");
                }
            }}>
                switch
            </button>
            <LanguageContext.Provider value={{language: language}}>
                {props.children}
            </LanguageContext.Provider>
        </div>
    )
}
