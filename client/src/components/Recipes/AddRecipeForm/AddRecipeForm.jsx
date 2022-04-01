import { FormProvider, useForm } from "react-hook-form";
import { useCallback, useState } from "react";

import css from "./AddRecipeForm.module.css";
import FormBody from "./FormBody/FormBody";
import GoBack from "../../Custom/GoBack/GoBack";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormHeader from "./FormHeader/FormHeader";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { domain } from "../../../config";

const AddRecipeForm = ({ defaultProps }) => {
  const { userId } = useSelector((state) => state.app);
  const formMethods = useForm({
    defaultValues: defaultProps || {
      products: [{ ingredient: "", weightOf: "" }],
    },
  });
  const { handleSubmit, reset } = formMethods;
  const [img, setImg] = useState();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  // refresh defaultValues
  useEffect(() => {
    reset(defaultProps);
  }, [defaultProps, reset]);

  const onFileUpload = useCallback((file) => {
    setImg(
      `${file.uuid}/-/crop/${file.crop.width}x${file.crop.height}/${file.crop.left},${file.crop.top}/`
    );
  }, []);

  const onSubmit = async (formData) => {
    try {
      const { description, name, type, products } = formData;
      const prepFormData = {
        description,
        name,
        author: userId,
        type,
        products,
        pathImg: img || defaultProps?.pathImg,
        id: defaultProps?._id,
      };
      const endpoint = defaultProps ? "edit" : "add";
      const method = defaultProps ? "put" : "post";
      const response = await axios({
        method,
        url: `${domain}/recipe/${endpoint}`,
        data: prepFormData,
      });
      console.log(response);
      if (response.data.success) goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="defaultContainer">
      <GoBack />
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormHeader
            img={img}
            onFileUpload={onFileUpload}
            oldPreview={defaultProps?.pathImg}
          />
          <FormBody />
          <button type="submit" className={css.submit}>
            Подтвердить
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddRecipeForm;
