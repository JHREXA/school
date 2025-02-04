import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      navigate("/blog");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h1>Login Page</h1>
      {error && <p className="error">{error}</p>}
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Écrivez votre mot de passe"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
      <Link to="/register">Créer un nouveau utilisateur</Link>
    </>
  );
};
