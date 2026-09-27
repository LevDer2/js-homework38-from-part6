import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/auth/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate("/contacts", { replace: true });
    } catch (submitError) {
      setError(
        typeof submitError === "string" ? submitError : "Login failed.",
      );
    }
  };

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
      {error && <p>Error: {error}</p>}
      <p>
        No account yet? <Link to="/register">Register</Link>
      </p>
    </main>
  );
}

export default Login;
