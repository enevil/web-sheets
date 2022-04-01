import { useEffect, useState } from "react";
import FormInput from "../../../Custom/FormInput/FormInput";
import FileUpload from "../../../Custom/FileUpload/FileUpload";
import css from "./FormHeader.module.css";
import { useFormContext } from "react-hook-form";
import { domain } from "../../../../config";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { setMessage } from "../../../../redux/settings/settingsActions";

const FormHeader = ({ img, oldPreview, onFileUpload }) => {
  const { register } = useFormContext();
  const [preview, setPreview] = useState();
  const dispatch = useDispatch();

  const onDialogClose = useCallback(() => {
    dispatch(setMessage(""));
  }, [dispatch]);

  useEffect(() => {
    if (img || oldPreview) {
      setPreview(`url('https://ucarecdn.com/${img || oldPreview}')`);
      return;
    }

    setPreview(`url("${domain}/static/RecipesImages/default.png")`);
  }, [img, oldPreview]);

  return (
    <div className={css.formHeader}>
      <div className={css.imgSection}>
        <div
          className={css.img}
          style={{
            backgroundImage: preview,
          }}
        ></div>
      </div>
      <div className={css.mainFields}>
        <FormInput name="name" label="Название" />
        <div className={css.typeContainer}>
          <select className={css.type} {...register("type")}>
            <option value="ХОЛОДНЫЙ НАПИТОК" defaultValue>
              Холодный напиток
            </option>
            <option value="ЧАЙ">Чай</option>
            <option value="ДЕСЕРТ">Десерт</option>
          </select>
        </div>

        <FileUpload
          crop="3:4"
          onChange={onFileUpload}
          onDialogClose={onDialogClose}
        />
      </div>
    </div>
  );
};

export default FormHeader;
