import css from "./OneRecipe.module.css";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadRecipe } from "../../../redux/recipe/recipeActions";
import GoBack from "../../Custom/GoBack/GoBack";
import { useDelete } from "./useDelete";
import { domain } from "../../../config";

const OneRecipe = () => {
  const { id } = useParams();
  const { userId } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const { recipe } = useSelector((state) => state.recipe);
  const { name, type, products, description, pathImg, author } = recipe;
  const belongToMe = author === userId;
  let backgroundImage = `https://ucarecdn.com//${pathImg}`;
  if (pathImg === "default.png")
    backgroundImage = `${domain}/static/RecipesImages/${pathImg}`;

  useEffect(() => {
    dispatch(loadRecipe(id));
  }, [dispatch, id]);

  const deleteRecipe = useDelete();

  return (
    <div className="defaultContainer">
      <div className={css.navbar}>
        <GoBack />
        {belongToMe && (
          <div className={css.changeContainer}>
            <Link className={`${css.button} ${css.change}`} to="edit">
              Изменить
            </Link>
            <button
              className={`${css.button} ${css.delete}`}
              onClick={() => deleteRecipe()}
            >
              Удалить
            </button>
          </div>
        )}
      </div>
      <div className={css.header}>
        <div className={css.imgSection}>
          <div
            className={css.img}
            style={{
              backgroundImage: `url('${backgroundImage}')`,
            }}
          ></div>
        </div>
        <div className={css.mainFields}>
          <p className="title">{name}</p>
          <p className={css.type}>{type}</p>
        </div>
      </div>
      <div>
        <div className={css.body}>
          <div className={css.bodyNames}>
            <p className={css.caption}>Ингридиенты</p>
            <p className={css.caption}>Вес</p>
          </div>
          <div className={css.products}>
            {products?.map(({ ingredient, weightOf }) => (
              <div key={ingredient} className={css.productBox}>
                <p>{ingredient}</p>
                <p>{weightOf}</p>
              </div>
            ))}
          </div>
          <div className={css.descriptionContainer}>
            <p className={css.caption}>Описание</p>
            <div className={css.descriptionText}>{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneRecipe;
