import { Link, useNavigate } from "react-router-dom";
import { useLoggedUser } from "./hooks/loggedUser";
import { getAuth, signOut } from "firebase/auth";
import { useState, useCallback } from "react";

export const NavBar = () => {
  const { user } = useLoggedUser();
  const navigate = useNavigate();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = useCallback(async () => {
    setSigningOut(true);
    try {
      await signOut(getAuth());
      navigate("/"); // Redirect to home page after signing out
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setSigningOut(false);
    }
  }, [navigate]);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/" className="menu">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="menu">
            About
          </Link>
        </li>
        {user && (
          <>
            <li>
              <Link to="/blog" className="menu">
                Blog
              </Link>
            </li>
          </>
        )}
      </ul>
      <div className="nav-right">
        {user ? (
          <button
            onClick={handleSignOut}
            disabled={signingOut} // Disable button while signing out
          >
            {signingOut ? "Logging out..." : "Log out"}
          </button>
        ) : (
          <button onClick={() => navigate("/login")}>Log in</button>
        )}
      </div>
    </nav>
  );
};
