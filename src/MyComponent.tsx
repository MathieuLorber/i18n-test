import {useMessages} from "./generated/MyComponent.t";
// @ts-ignore
import i18nFile from './MyComponent.i18n';
import {useEffect, useState} from "react";

// const [i18n, setI18n] = useState('');
// useEffect(() => {
//     fetch(i18nFile as unknown as string)
//         .then((response) => response.text())
//         .then((text) => setI18n(text));
// }, [])

export const MyComponent = () => {
    const messages = useMessages();
    return (messages && (
        <div>
            {messages.Key}
            <br/>
            {messages.Hello_firstname('you')}
        </div>
    )) ?? null;
}
