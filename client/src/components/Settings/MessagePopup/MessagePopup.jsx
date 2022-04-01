import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setMessage } from "../../../redux/settings/settingsActions";
import css from "./MessagePopup.module.css";

const MessagePopup = () => {
  const { settingsMessages } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const [type, setType] = useState();
  const [messageText, setMessageText] = useState();

  useEffect(() => {
    if (settingsMessages) {
      setTimeout(() => {
        dispatch(setMessage());
      }, 2500);
    }
  }, [dispatch, settingsMessages]);

  useEffect(() => {
    switch (settingsMessages) {
      case "IMAGE_SET_SUCCESS":
        setType(css.success);
        setMessageText("Аватар успешно обновлен");
        break;
      case "FORBIDDEN_TYPE":
        setType(css.error);
        setMessageText("Неправильный тип файла");
        break;
      case "LIMIT_FILE_SIZE":
        setType(css.error);
        setMessageText("Вес изображения слишком большой");
        break;
      case "UNDEFIEND_IMAGE_ERROR":
        setType(css.error);
        setMessageText("Не удалось обновить аватар");
        break;
      case "PASSWORD_CHANGE_LENGTH":
        setType(css.error);
        setMessageText("Не менее 6 символов");
        break;
      case "PASSWORD_CHANGE_ERROR":
        setType(css.error);
        setMessageText("Не удалось изменить пароль");
        break;
      case "PASSWORD_CHANGE_SUCCESS":
        setType(css.success);
        setMessageText("Пароль успешно изменен");
        break;

      default:
        setType(css.neutral);
        setMessageText("Неизвестная ошибка");
    }
  }, [settingsMessages]);

  return (
    <div className={[css.container, type].join(" ")}>
      <div>
        <p>{messageText}</p>
      </div>
    </div>
  );
};

export default MessagePopup;
