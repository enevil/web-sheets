import css from "./RecipesBook.module.css";
import RecipeCard from "./RecipeCard/RecipeCard";
import { useSelector } from "react-redux";
import SearchbarHeader from "./SearchbarHeader/SearchbarHeader";

const RecipesBook = () => {
  const { recipes } = useSelector((state) => state.recipe);

  return (
    <div className="defaultContainer">
      <SearchbarHeader />
      <div className={css.cardContainer}>
        {recipes.map((item) => (
          <RecipeCard
            key={item._id}
            id={item._id}
            recipeImg={item.pathImg}
            title={item.name}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipesBook;
