import { useNavigate } from "react-router-dom";
import css from "./GoBack.module.css";

const GoBack = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className={css.back} onClick={() => goBack()}>
      Назад
    </div>
  );
};

export default GoBack;
