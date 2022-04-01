import css from "./WorkshiftItem.module.css";

const WorkshiftItem = ({ wsDate, wsTime }) => {
  const dateObj = new Date(wsDate);
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const weekdays = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const date =
    (day < 10 ? "0" + day : day) + "." + (month < 10 ? "0" + month : month);
  return (
    <div className={css.soonWorkshifts_item}>
      <span className={css.date}>{date}</span>

      <span>{weekdays[dateObj.getDay()]}</span>
      <span>{wsTime}</span>
    </div>
  );
};

export default WorkshiftItem;
