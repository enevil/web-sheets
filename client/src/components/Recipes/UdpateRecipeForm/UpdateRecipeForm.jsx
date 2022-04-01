import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadRecipe } from "../../../redux/recipe/recipeActions";
import AddRecipeForm from "../AddRecipeForm/AddRecipeForm";

const UpdateRecipeForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { recipe } = useSelector((state) => state.recipe);
  useEffect(() => {
    dispatch(loadRecipe(id));
  }, [dispatch, id]);
  return <AddRecipeForm defaultProps={recipe} />;
};

export default UpdateRecipeForm;
