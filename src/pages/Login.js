import React,{useState} from "react";
import "./Login.css";
import { NavLink,useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <>
      <div className="login_ctr">
      <form onSubmit={handleSubmit}>
        
          <h2>Login </h2>
          <input type="text " placeholder="Email" />
          <input type="passwprd" placeholder="Password" />
          <button  className="btn">Submit</button>
          <p>
            Don't have account ?
            <NavLink to="/register">
              <strong>Register here</strong>
            </NavLink>
          </p>
     
        </form>
      </div>
    </>
  );
}

export default Login;
