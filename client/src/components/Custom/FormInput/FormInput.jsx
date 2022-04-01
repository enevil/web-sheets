import { useFormContext, useWatch } from "react-hook-form";
import ValidateErrorHandler from "./ValidateErrorHandler";
import css from "./FormInput.module.css";

const FormInput = ({ name, label, validator, control, ...rest }) => {
  const { register } = useFormContext();
  validator = { ...validator, required: true };
  useWatch({
    name: "products",
    control,
  });

  return (
    <div className={css.inputGroup}>
      <label htmlFor={name}>{label}</label>
      <input
        className={css.loginInput}
        {...register(name, validator)}
        {...rest}
      />
      <ValidateErrorHandler fieldName={name} />
    </div>
  );
};

export default FormInput;
