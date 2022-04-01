import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { check } from "../../redux/app/appActions";
import { Navigate } from "react-router-dom";

export function withAuth(Component) {
  return function (props) {
    const dispatch = useDispatch();
    const { isAuth } = useSelector((state) => state.app);
    useEffect(() => {
      dispatch(check());
    }, [dispatch]);

    if (!isAuth) return <Navigate to="/" />;

    return <Component {...props} />;
  };
}
