import css from "./PersonsInDate.module.css";
import PersonCalendarItem from "./PersonCalendarItem/PersonCalendarItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { nextSidePage } from "../../../../redux/calendar/calendarActions";

const PersonsInDate = ({ VISIBLE_ITEMS }) => {
  const dispatch = useDispatch();

  const { sidePersons, currentWs, sidePage } = useSelector(
    (state) => state.calendar
  );

  const personsList = sidePersons.map((item, index) => {
    if (
      index > VISIBLE_ITEMS - 1 + sidePage * VISIBLE_ITEMS ||
      index < 0 + sidePage * VISIBLE_ITEMS
    ) {
      return null;
    }
    const { _id, name, workShift } = item;
    return (
      <PersonCalendarItem key={_id} personName={name} personWs={workShift} />
    );
  });

  return (
    <div className={css.workshiftItem}>
      <div className={css.workshiftBox}>
        <PersonCalendarItem
          className={css.myShift}
          personName={"Моя смена"}
          personWs={currentWs}
        />
        <button
          className={css.nextPersons}
          type="button"
          onClick={() =>
            sidePage >= Math.ceil(sidePersons.length / VISIBLE_ITEMS - 1)
              ? dispatch(nextSidePage("reset"))
              : dispatch(nextSidePage(sidePage))
          }
        >
          Следующие →
        </button>
        {personsList}
      </div>
    </div>
  );
};

export default PersonsInDate;
