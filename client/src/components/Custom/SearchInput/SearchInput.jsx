import css from "./SearchInput.module.css";
import { ReactComponent as SearchSvg } from "./../../../svg/Search.svg";

const SearchInput = ({ onInput, value }) => {
  return (
    <div className={css.searchbarItem}>
      <SearchSvg className={css.loupe} />
      <input
        className={css.searchInput}
        onInput={(e) => {
          onInput(e.target.value);
        }}
        value={value}
      />
    </div>
  );
};

export default SearchInput;
