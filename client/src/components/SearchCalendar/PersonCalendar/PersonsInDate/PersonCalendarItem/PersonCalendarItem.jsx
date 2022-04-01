import css from "./PersonCalendarItem.module.css";

const PersonCalendarItem = ({ personName, personWs, className }) => {
  return (
    <div className={css.container + " " + className}>
      <p className={css.text}>{personName.slice(0, 17)}</p>
      <p className={css.text}>{personWs}</p>
    </div>
  );
};

export default PersonCalendarItem;
