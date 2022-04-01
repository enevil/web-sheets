import css from "./SidebarItem.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const SidebarItem = ({ to, text, svg }) => {
  const { userId } = useSelector((state) => state.app);
  to = to || `/user/${userId}`;
  return (
    <NavLink to={to} className={({ isActive }) => (isActive ? css.active : "")}>
      <div className={css.item}>
        <div className={css.innerText}>{text}</div>
        {svg}
      </div>
    </NavLink>
  );
};

export default SidebarItem;
