import css from "./InfoBlock.module.css";

const InfoBlock = () => {
  const now = new Date();
  const weekdays = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  return (
    <div className={css.blockContainer}>
      <div className={css.todayBlock}>
        <div className={css.todayBlockHeader}>
          <p className={css.today}>Сегодня</p>
        </div>

        <div className={css.todayBlockBody}>
          <div className={css.day}>{weekdays[now.getDay()]}</div>
          <div className={css.month}>{now.toLocaleDateString()}</div>
        </div>
      </div>
      <div className={css.weather}></div>
    </div>
  );
};

export default InfoBlock;
