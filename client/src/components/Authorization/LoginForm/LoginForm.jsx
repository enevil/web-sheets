import Input from "./../../Custom/FormInput/FormInput";
import { FormProvider } from "react-hook-form";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/app/appActions";
import css from "./../RegistrationForm/RegistrationForm.module.css";
import { useNavigate } from "react-router-dom";
import { domain } from "../../../config";

const LoginForm = () => {
  const formMethods = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setError, handleSubmit } = formMethods;

  const onSubmit = async (formData) => {
    try {
      const { data } = await axios.post(`${domain}/auth/login`, {
        ...formData,
      });

      if (data.response === "success") {
        dispatch(login(data.userId));
        navigate("/user");
      }
      if (data.response === "fail") console.log("Database error");
    } catch (error) {
      const myError = error?.response?.data;

      switch (myError?.cause) {
        case "isNotExist":
          setError(myError.field, {
            type: "isNotExist",
            message: `${myError.label} не найден`,
          });
          break;

        case "wrongData":
          setError(myError.field, {
            type: "wrongData",
            message: `${myError.label} не верен`,
          });
          break;

        default:
          console.log("Неизвестная ошибка", error);
      }
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.form}>
          <Input name="email" label="Email" />
          <Input name="password" type="password" label="Пароль" />
        </div>

        <button type="submit" className={css.submit}>
          Войти
        </button>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
