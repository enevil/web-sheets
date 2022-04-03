import css from "./Navbar.module.css";
import { ReactComponent as LogoSvg } from "../../svg/CoffeeMania.svg";
import { ReactComponent as SignOutSvg } from "../../svg/Sign-out .svg";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/app/appActions";

const Navbar = () => {
  const { isAuth } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <nav className="Navbar">
      <div className={css.nav}>
        <div className={css.wrapper}>
          <div className={css.logo}>
            <Link to="/">
              <LogoSvg />
            </Link>
          </div>
          <div className={css.itemContainer}>
            <div className={css.pages}>
              <div className={css.item}>
                <NavLink
                  to="/blog"
                  className={({ isActive }) => (isActive ? css.active : "")}
                >
                  Блог
                </NavLink>
              </div>
              <div className={css.item}>
                <NavLink
                  to="/about"
                  className={({ isActive }) => (isActive ? css.active : "")}
                >
                  О компании
                </NavLink>
              </div>
              {isAuth && (
                <div className={css.item}>
                  <NavLink
                    to="/user"
                    className={({ isActive }) => (isActive ? css.active : "")}
                  >
                    Таблицы
                  </NavLink>
                </div>
              )}
            </div>

            <div className={css.exit}>
              {isAuth ? (
                <div
                  className={css.button}
                  onClick={() => {
                    dispatch(logout());
                    navigate("/");
                  }}
                >
                  <div className={css.exitSvg}>
                    <SignOutSvg />
                  </div>
                  <div className={css.item + " " + css.loginText}>Выход</div>
                </div>
              ) : (
                <Link to="/login">
                  <div className={css.exitSvg}>
                    <SignOutSvg />
                  </div>
                  <div className={css.item + " " + css.loginText}>Вход</div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
