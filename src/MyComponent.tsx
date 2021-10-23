import t from "./generated/MyComponent.i18n";

export const MyComponent = () => (
  <div>
    {t.Key}
    <br />
    {t.Hello_firstname("you")}
  </div>
);
