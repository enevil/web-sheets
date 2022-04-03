import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { withAuth } from "../hoc/withAuth";
import css from "./Profile.module.css";
import { getOneUser } from "../../redux/user/userActions";
import { loadMainDate } from "../../redux/calendar/calendarActions";
import WorkshiftItem from "./WorkshiftItem/WorkshiftItem";
import InfoBlock from "./InfoBlock/InfoBlock";
import { domain } from "../../config";

const ProfileContent = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { userId } = useSelector((state) => state.app);
  const { workShifts } = useSelector((state) => state.calendar);
  const { userData, personId } = useSelector((state) => state.user);
  const { firstName, lastName, username, profileImage } = userData;
  const [sortedWorkShifts, setSortedWorkShifts] = useState();
  const [imagePath, setImagePath] = useState();

  useEffect(() => {
    const path = `${domain}/static/ProfileImages`;
    if (profileImage) {
      return setImagePath(`url('https://ucarecdn.com/${profileImage}')`);
    }
    setImagePath(`url('${path}/default_user.png')`);
  }, [profileImage]);

  useEffect(() => {
    const sorted = workShifts.filter((item) => {
      const now = new Date();
      const date = new Date(item.date);
      const oneDay = 86400000;
      if (date - now + oneDay > 0) return true;
      return false;
    });

    const workshiftItems = sorted.slice(0, 3).map((item) => {
      const { shiftTime, shiftProp, date } = item;
      return (
        <WorkshiftItem
          key={date}
          wsDate={date}
          wsTime={shiftTime + shiftProp}
        />
      );
    });

    setSortedWorkShifts(workshiftItems);
  }, [workShifts, dispatch]);

  useEffect(() => {
    dispatch(loadMainDate(personId));
  }, [personId, dispatch]);

  useEffect(() => {
    dispatch(getOneUser(userId));
  }, [dispatch, userId]);

  if (!id) return <Navigate to={userId} />;

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.imgSection}>
          <div
            className={css.imgCover}
            style={{
              backgroundImage: imagePath,
            }}
          ></div>
        </div>
        <div className={css.mainInfo}>
          <p className={css.name}>{firstName + " " + lastName}</p>
          <p className={css.username}>{username}</p>
        </div>
      </div>
      <div className={css.bodyContainer}>
        <div className={css.soonWorkshifts}>
          <div className={css.soonWorkshifts_header}>БЛИЖАЙШИЕ СМЕНЫ</div>
          <div className={css.soonWorkshifts_body}>
            {sortedWorkShifts?.length ? (
              sortedWorkShifts
            ) : (
              <p className={css.notFound}>Найди себя в календаре</p>
            )}
          </div>
        </div>
        <InfoBlock />
      </div>
    </div>
  );
};

export default withAuth(ProfileContent);
