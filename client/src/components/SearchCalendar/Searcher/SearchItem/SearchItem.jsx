import { Link } from "react-router-dom";
import { ReactComponent as CoffeeSvg } from "../../../../svg/Coffee.svg";
import css from "./SearchItem.module.css";

const SearchItem = ({ name, _id }) => {
  return (
    <Link to={`${_id}`} className={css.personItem}>
      <CoffeeSvg />
      <span className={css.personName}>{name.toLowerCase()}</span>
    </Link>
  );
};

export default SearchItem;
