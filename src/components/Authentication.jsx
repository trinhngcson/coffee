import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Authentication = (props) => {
  const { handleCloseModal } = props;
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login, signup } = useAuth();

  async function handleAuthenticate() {
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password < 6 ||
      authLoading
    ) {
      return;
    }
    try {
      setAuthLoading(true);
      setError(null);
      if (isRegister) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      handleCloseModal();
    } catch (error) {
      setError(error.message);
    } finally {
      setAuthLoading(false);
    }
  }
  return (
    <>
      <h2 className="sign-up-text">{isRegister ? "Sign Up" : "Login"}</h2>
      <p>{!isRegister ? "Sign in to your account!" : "Create an account!"}</p>
      {error && (
        <p>
          <i className="fa-solid fa-xmark" />
          {error}
        </p>
      )}
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="*************"
        type="password"
      />
      <button onClick={handleAuthenticate}>
        <p>{authLoading ? "Authenticating..." : "Submit"}</p>
      </button>
      <hr />
      <div className="register-content">
        <p>
          {!isRegister ? "Don't have an account?" : "Already have an account?"}
        </p>
        <button
          onClick={() => {
            setIsRegister(!isRegister);
          }}
        >
          <p>{isRegister ? "Login" : "Sign Up"}</p>
        </button>
      </div>
    </>
  );
};

export default Authentication;
