import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { logoutUser } from "../../redux/auth/authSlice";
import {
  selectCurrentUser,
  selectIsLoggedIn,
} from "../../redux/auth/selectors";

export default function Layout() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>{" "}
        {isLoggedIn ? (
          <>
            <NavLink to="/contacts">Contacts</NavLink>{" "}
            <span>{currentUser.name}</span>{" "}
            <button type="button" onClick={() => dispatch(logoutUser())}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/register">Register</NavLink>{" "}
            <NavLink to="/login">Login</NavLink>
          </>
        )}
      </nav>
      <Outlet />
    </>
  );
}
