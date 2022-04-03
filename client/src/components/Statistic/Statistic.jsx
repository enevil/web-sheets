import { withAuth } from "../hoc/withAuth";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import css from "./Statistic.module.css";
import { Bar } from "react-chartjs-2";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadMainDate } from "../../redux/calendar/calendarActions";
import Results from "./Results/Results";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ruMonthes = [
  "январь",
  "февраль",
  "март",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабрь",
];

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

function sameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth()
  );
}

function getDaysInMonth(date) {
  let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  let startDay = firstDay;
  let days = [];
  while (!sameDay(lastDay, startDay)) {
    days.push(new Date(startDay));
    startDay.setDate(startDay.getDate() + 1);
  }
  days.push(new Date(startDay));
  return days;
}

const Statistic = () => {
  const { workShifts } = useSelector((state) => state.calendar);
  const { personId } = useSelector((state) => state.user);
  const [visDate, setVisDate] = useState([]);
  const [datesInMonth, setDatesInMonth] = useState([]);
  const [currentDate, setCurrentDate] = useState(
    new Date(new Date().setDate(1))
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMainDate(personId));
  }, [personId, dispatch]);

  useEffect(() => {
    const datesInMonth = getDaysInMonth(currentDate);
    const wsInThisMonth = workShifts.filter((item) => {
      const lastDateInMonth = new Date(currentDate).setDate(30);
      if (item.date <= lastDateInMonth && item.date >= currentDate) return true;
      return false;
    });

    if (wsInThisMonth.length) {
      let wsIndex = 0;
      const vis = datesInMonth.map((date) => {
        if (wsIndex >= wsInThisMonth.length) return 0;
        if (sameDay(date, wsInThisMonth[wsIndex].date)) {
          const workHours = wsInThisMonth[wsIndex].shiftTime.split("-");
          const workTime = +workHours[1] - +workHours[0];
          wsIndex++;
          if (isNaN(workTime)) return 0;
          return workTime;
        }
        return 0;
      });

      setVisDate(vis);
    } else if (wsInThisMonth.length === 0) {
      const vis = datesInMonth.map(() => 0);
      setVisDate(vis);
    }
    setDatesInMonth(datesInMonth);
  }, [workShifts, currentDate]);

  const monthSwitch = useCallback(
    (step) => {
      const newDate = new Date(currentDate);
      newDate.setMonth(newDate.getMonth() + step);
      setCurrentDate(newDate);
    },
    [currentDate]
  );

  const data = {
    labels: datesInMonth.map((_, i) => i + 1),
    datasets: [
      {
        label: "Отработанные часы",
        data: visDate,
        backgroundColor: "rgba(201, 119, 119, 0.8)",
      },
    ],
  };

  return (
    <div className={css.container}>
      <div className={css.topInfo}>
        <p>Кол-во отработанных часов</p>
      </div>
      <Bar options={options} data={data} />
      <div className={css.month}>
        <button onClick={() => monthSwitch(-1)} className={css.arrow}>
          {"<"}
        </button>
        <p className={css.monthText}>
          {ruMonthes[currentDate.getMonth()]} {currentDate.getFullYear()}
        </p>
        <button onClick={() => monthSwitch(1)} className={css.arrow}>
          {">"}
        </button>
      </div>
      <Results visDate={visDate}></Results>
    </div>
  );
};

export default withAuth(Statistic);
