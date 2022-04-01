import { useFieldArray, useFormContext } from "react-hook-form";
import FormInput from "../../../Custom/FormInput/FormInput";
import css from "./FormBody.module.css";

const FormBody = () => {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  return (
    <div className={css.formBody}>
      <div className={css.bodyFieldsName}>
        <p>Ингридиенты</p>
        <p>Вес</p>
      </div>
      <div className={css.stepTable}>
        {fields.map((field, index) => (
          <div className={css.step} key={field.id}>
            <FormInput
              name={`products.${index}.ingredient`}
              control={control}
            />
            <FormInput name={`products.${index}.weightOf`} control={control} />
            {Boolean(index) && (
              <button
                type="button"
                onClick={() => {
                  remove(index);
                }}
                className={css.changeIngridient + " " + css.deleteIngridient}
              >
                x
              </button>
            )}
          </div>
        ))}
        <div className={css.changeIngridientContainer}>
          <button
            type="button"
            onClick={() => {
              append({ ingredient: "", weightOf: "" });
            }}
            className={css.changeIngridient + " " + css.addIngridient}
          >
            +
          </button>
        </div>
      </div>
      <div className={css.descriptionContainer}>
        <p>Описание приготовления</p>
        <textarea
          className={css.description}
          {...register("description", {})}
        />
      </div>
    </div>
  );
};

export default FormBody;
