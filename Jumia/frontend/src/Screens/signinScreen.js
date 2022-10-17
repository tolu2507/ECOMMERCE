import React, { useEffect, useState } from "react";
// import data from "../data";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../actions/Useractions.js";

function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const {userInfo, loading, error} = userSignin;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
    return () => {
      //
    };
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signIn(email, password));
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <div className="form-sign">
              {" "}
              <h3>SIGN-IN</h3>
            </div>
          </li>
          <li>
            {loading && (
              <div>
                <h2>Loading....</h2>
              </div>
            )}
            {error && (
              <div>
                <h2>{error}</h2>
              </div>
            )}
          </li>
          <li>
            <label htmlFor="email">
              <h3>Email</h3>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="password">
              <h3>Password</h3>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li>
            <button type="submit" className="button">
              Sign In
            </button>
          </li>
          <li>
            <h3>New to Jumia ?</h3>
          </li>
          <li>
            <Link to="/register" className="button-fullwidth">
              Creata Your Jumia Account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}
export default SigninScreen;
