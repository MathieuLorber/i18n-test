import { EditI18n } from "./EditI18n";

const t = {
  Key: (
      <EditI18n file="./MyComponent" messageKey="Key" messages={{
          en: 'Actual string in english',
          fr: 'En français'
      }}/>
  )
};
export default t;
