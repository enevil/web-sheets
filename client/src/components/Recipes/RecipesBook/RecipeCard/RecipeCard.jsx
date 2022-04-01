import { Link } from "react-router-dom";
import { domain } from "../../../../config";
import css from "./RecipeCard.module.css";
const RecipeCard = ({ id, title, recipeImg, ...otherProps }) => {
  let backgroundImage = `https://ucarecdn.com//${recipeImg}`;
  if (recipeImg === "default.png")
    backgroundImage = `${domain}/static/RecipesImages/${recipeImg}`;
  return (
    <Link to={id} className={css.card} {...otherProps}>
      <div className={css.imgSection}>
        <div
          className={css.img}
          style={{
            backgroundImage: `url('${backgroundImage}')`,
          }}
        >
          <div className={css.title}>{title}</div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
