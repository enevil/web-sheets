import Input from "./../../Custom/FormInput/FormInput";
import { FormProvider } from "react-hook-form";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/app/appActions";
import css from "./RegistrationForm.module.css";
import { useNavigate } from "react-router-dom";
import { domain } from "../../../config";

const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const RegistrationForm = () => {
  const formMethods = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { setError, handleSubmit } = formMethods;

  const onSubmit = async (formData) => {
    if (!(formData.password === formData.repeatPassword)) {
      setError("password", {
        type: "notSame",
        message: "Passwords are not the same",
      });
      return;
    }
    try {
      const { data } = await axios.post(`${domain}/auth/registration`, {
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
        case "isExist":
          setError(myError.field, {
            type: "isExist",
            message: `${myError.label} уже существует`,
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
          <Input
            name="firstName"
            label="Имя"
            validator={{ minLength: 2, maxLength: 25 }}
          />
          <Input
            name="lastName"
            label="Фамилия"
            validator={{ minLength: 2, maxLength: 25 }}
          />
          <Input
            name="email"
            label="Email"
            validator={{ pattern: EMAIL_PATTERN }}
          />
          <Input
            name="username"
            label="Никнейм"
            validator={{ minLength: 2, maxLength: 25 }}
          />
          <Input
            name="password"
            type="password"
            label="Пароль"
            validator={{ minLength: 6, maxLength: 50 }}
          />
          <Input
            name="repeatPassword"
            type="password"
            label="Повторите пароль"
            validator={{ minLength: 6, maxLength: 50 }}
          />
        </div>

        <button type="submit" className={css.submit}>
          Отправить
        </button>
      </form>
    </FormProvider>
  );
};

export default RegistrationForm;
