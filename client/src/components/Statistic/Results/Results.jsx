import lodash from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setRate } from "../../../redux/user/userActions";
import css from "./Results.module.css";

const Results = ({ visDate }) => {
  const { personRate } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className={css.results}>
      <div className={css.resultsRow}>
        <p>Итого за этот месяц:</p>
        <p className={css.bold}>{lodash.sum(visDate)} часов</p>
      </div>
      <div className={css.resultsRow}>
        <p>При ставке в </p>
        <p>
          <input
            className={css.rateValue}
            type="number"
            value={personRate}
            onChange={(e) => dispatch(setRate(e.target.value))}
          ></input>
          рублей
        </p>
      </div>
      <div className={css.resultsRow}>
        <p>Вы получите</p>
        <p className={css.bold}>{lodash.sum(visDate) * personRate} рублей</p>
      </div>
    </div>
  );
};

export default Results;
