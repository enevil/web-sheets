import React, { useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import Calendar from "react-calendar";
import css from "./PersonCalendar.module.css";
import { ReactComponent as ChangeNameSvg } from "../../../svg/Write.svg";
import "./ReactCalendar.css";
import PersonsInDate from "./PersonsInDate/PersonsInDate";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  loadMainDate,
  loadSidePersons,
  nextSidePage,
  showWorkshift,
  updateTargetDate,
} from "../../../redux/calendar/calendarActions";
import { bindPersonToUser } from "../../../redux/user/userActions";
import Spinner from "../../Custom/Spinner/Spinner";

const VISIBLE_ITEMS = 4;

function sameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth()
  );
}

const PersonCalendar = (props) => {
  const { person_id } = useParams();
  const { workShifts, personName, isLoading } = useSelector(
    (state) => state.calendar
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMainDate(person_id));
    dispatch(bindPersonToUser(person_id));
  }, [person_id, dispatch]);

  useEffect(() => {
    dispatch(loadSidePersons(new Date(+props.targetDate + 10800000)));
  }, [props.targetDate, dispatch]);

  useEffect(() => {
    const currrentWsItem = workShifts.filter((item) =>
      sameDay(item.date, props.targetDate)
    )[0];
    const workshift = currrentWsItem?.shiftTime || currrentWsItem?.shiftProp;
    dispatch(showWorkshift(workshift));
    dispatch(nextSidePage("reset"));
  }, [props.targetDate, dispatch, workShifts]);

  const resetBind = useCallback(() => {
    dispatch(bindPersonToUser());
  }, [dispatch]);

  const highlightWorkdates = useCallback(
    (date) => {
      if (
        workShifts.map((item) => +item.date).includes(+date.date + 10800000)
      ) {
        return "highlight__day";
      }
    },
    [workShifts]
  );

  return (
    <section className="defaultContainer">
      <div className={css.namefield}>
        <p className={css.name}>{personName}</p>
        <Link
          className={css.changeIcon}
          to="/user/calendar"
          onClick={resetBind}
        >
          <ChangeNameSvg />
        </Link>
      </div>
      <div className={css.calendar}>
        <div className={css.calendarItem}>
          <div className={css.calendarBox}>
            <Calendar
              tileClassName={highlightWorkdates}
              onChange={props.updateTargetDate}
              value={props.targetDate}
            />
          </div>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <PersonsInDate VISIBLE_ITEMS={VISIBLE_ITEMS} />
        )}
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    targetDate: state.calendar.targetDate,
  };
};

const mapDispatchToProps = {
  updateTargetDate,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonCalendar);
