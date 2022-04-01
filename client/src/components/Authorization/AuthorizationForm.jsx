import css from "./AuthorizationForm.module.css";
import RegistrationForm from "./RegistrationForm/RegistrationForm";
import { useState } from "react";
import LoginForm from "./LoginForm/LoginForm";

const AuthorizationForm = () => {
  const [isRegistration, setIsRegistration] = useState(false);

  return (
    <div className={css.bg}>
      <div className="MainContainer">
        <div className={css.container}>
          <div className={css.innerContainer}>
            <div className={css.switcher}>
              <h2
                onClick={() => setIsRegistration(false)}
                className={css.label + " " + (!isRegistration && css.active)}
              >
                Вход
              </h2>
              <h2
                onClick={() => setIsRegistration(true)}
                className={css.label + " " + (isRegistration && css.active)}
              >
                Регистрация
              </h2>
            </div>

            <div className={css.hr} />

            {isRegistration ? <RegistrationForm /> : <LoginForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorizationForm;
