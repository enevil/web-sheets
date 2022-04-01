import { ReactComponent as CheckSvg } from "../../../svg/Check.svg";
import css from "./SendButton.module.css";

const SendButton = ({ onClick }) => {
  return (
    <button className={css.fileSend} onClick={onClick}>
      <CheckSvg />
    </button>
  );
};

export default SendButton;
