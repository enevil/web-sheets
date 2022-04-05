import { withAuth } from "../hoc/withAuth";
import css from "./Settings.module.css";
import { useCallback, useState } from "react";
import MessagePopup from "./MessagePopup/MessagePopup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setMessage } from "../../redux/settings/settingsActions";
import SendButton from "./SendButton/SendButton";
import axios from "axios";
import { domain } from "../../config";
import FileUpload from "../Custom/FileUpload/FileUpload";

const Settings = () => {
  const { userId } = useSelector((state) => state.app);
  const { settingsMessages } = useSelector((state) => state.settings);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const changeProfileImage = useCallback(
    async (file) => {
      try {
        const response = await axios({
          method: "post",
          url: `${domain}/user/upload_img`,
          data: {
            userId,
            pathImg: `${file.uuid}/-/crop/${file.crop.width}x${file.crop.height}/${file.crop.left},${file.crop.top}/`,
          },
        });
        if (response.status === 200) {
          dispatch(setMessage("IMAGE_SET_SUCCESS"));
        }
      } catch (error) {
        console.log(error);
        dispatch(setMessage("UNDEFIEND_IMAGE_ERROR"));
      }
    },
    [dispatch, userId]
  );

  const sendPassword = useCallback(async () => {
    try {
      if (password.length < 6) {
        dispatch(setMessage("PASSWORD_CHANGE_LENGTH"));
        return;
      }
      const response = await axios({
        method: "put",
        url: `${domain}/user/change_password`,
        data: { id: userId, password },
      });
      if (response.status === 200) {
        dispatch(setMessage("PASSWORD_CHANGE_SUCCESS"));
      }
    } catch (error) {
      console.log(error);
      dispatch(setMessage("PASSWORD_CHANGE_ERROR"));
    }
  }, [dispatch, password, userId]);

  return (
    <div className="defaultContainer">
      {settingsMessages && <MessagePopup />}
      <ul>
        <li className={css.item}>
          <p className={css.itemName}>Изменить фото профиля</p>
          <div className={css.itemSetter}>
            <FileUpload crop="1:1" onChange={changeProfileImage} />
          </div>
        </li>

        <li className={css.item}>
          <p className={css.itemName}>Изменить пароль</p>
          <div className={css.itemSetter}>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className={css.textInput}
            />
            <SendButton onClick={() => sendPassword()} />
          </div>
        </li>
      </ul>
    </div>
  );
};
export default withAuth(Settings);
