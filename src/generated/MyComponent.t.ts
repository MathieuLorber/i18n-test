import {useContext, useEffect, useState} from "react";
import {LanguageContext} from "../Updater";

interface Messages {
    Key: string
    Hello_firstname: (firstname: string) => string
}

const loadMessages = async (language: string) => {
    if (language === 'fr') {
        return await import("./MyComponent.i18n-fr") as any;
    } else {
        return await import("./MyComponent.i18n-en") as any;
    }
}
export const useMessages = () => {
    const {language} = useContext(LanguageContext);
    const [messages, setMessages] = useState<Messages | undefined>(undefined)
    useEffect(() => {
        loadMessages(language).then(r => setMessages(r.default))
    }, [language])
    return messages;
}