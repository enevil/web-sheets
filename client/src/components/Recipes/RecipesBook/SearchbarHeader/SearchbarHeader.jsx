import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadRecipes } from "../../../../redux/recipe/recipeActions";
import Input from "../../../Custom/SearchInput/SearchInput";
import css from "./SearchbarHeader.module.css";

const SearchbarHeader = () => {
  const [searchValue, setSearchValue] = useState("");
  const [belongToUser, setBelongToUser] = useState(false);
  const { userId } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadRecipes(searchValue, belongToUser ? userId : null));
  }, [dispatch, searchValue, userId, belongToUser]);

  return (
    <div className={css.header}>
      <Input value={searchValue} onInput={setSearchValue} />
      <div className={css.checkContainer}>
        <label htmlFor="belong">Мои</label>
        <input
          value={belongToUser}
          onInput={(e) => setBelongToUser(e.target.checked)}
          className={css.checkbox}
          type="checkbox"
          name="belong"
        />
      </div>

      <Link to="add" className={css.add}>
        Добавить
      </Link>
    </div>
  );
};

export default SearchbarHeader;
