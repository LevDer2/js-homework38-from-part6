import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/auth/authSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      await dispatch(registerUser({ name, email, password })).unwrap();
      navigate("/contacts", { replace: true });
    } catch (submitError) {
      setError(
        typeof submitError === "string"
          ? submitError
          : "Registration failed.",
      );
    }
  };

  return (
    <main>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>
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
        <button type="submit">Register</button>
      </form>
      {error && <p>Error: {error}</p>}
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </main>
  );
}

export default Register;
