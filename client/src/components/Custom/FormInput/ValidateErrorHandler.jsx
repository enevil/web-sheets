import { useFormContext } from "react-hook-form";
import css from "./FormInput.module.css";

const ValidateErrorHandler = ({ fieldName }) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <>
      {errors[fieldName]?.type === "required" && (
        <span className={css.error}>Поле не заполнено</span>
      )}
      {errors[fieldName]?.type === "pattern" && (
        <span className={css.error}>Неправильный паттерн</span>
      )}
      {errors[fieldName]?.type === "minLength" && (
        <span className={css.error}>Слишком короткий</span>
      )}
      {errors[fieldName]?.type === "maxLength" && (
        <span className={css.error}>Слишком длинный</span>
      )}
      {errors[fieldName]?.type === "isExist" && (
        <span className={css.error}>{errors[fieldName]?.message}</span>
      )}
      {errors[fieldName]?.type === "notSame" && (
        <span className={css.error}>Пароли должны совпадать</span>
      )}
      {errors[fieldName]?.type === "isNotExist" && (
        <span className={css.error}>{errors[fieldName]?.message}</span>
      )}
      {errors[fieldName]?.type === "wrongData" && (
        <span className={css.error}>{errors[fieldName]?.message}</span>
      )}
    </>
  );
};

export default ValidateErrorHandler;
