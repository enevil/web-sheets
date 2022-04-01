import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { domain } from "../../../config";

export const useDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const deleteRecipe = () => {
    axios({
      method: "delete",
      url: `${domain}/recipe/delete`,
      data: { id },
    })
      .then(() => navigate(-1))
      .catch((error) => console.log(error));
  };
  return () => deleteRecipe(id);
};
