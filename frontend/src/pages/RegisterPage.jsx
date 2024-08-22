import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const createAccount = async () => {
    try {
      if (password !== confirmPass) {
        setError("Les mots de passe ne coïncedent pas");
        return;
      }

      await createUserWithEmailAndPassword(getAuth(), email, password);
      navigate("/blog");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h1>Créer nouveau utilisateur</h1>
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
      <input
        placeholder="Confirmez votre mot de passe"
        type="password"
        value={confirmPass}
        onChange={(e) => setConfirmPass(e.target.value)}
      />
      <button onClick={createAccount}>Créez votre compte</button>
      <Link to="/login">Si vous aves déjà un compte clickez ici</Link>
    </>
  );
};
