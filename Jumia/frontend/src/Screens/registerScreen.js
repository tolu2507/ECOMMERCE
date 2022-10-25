import React, { useEffect, useState } from "react";
// import data from "../data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/Useractions.js";

function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const userRegister = useSelector((state) => state.userRegister);
  const { registerInfo, loading, error } = userRegister;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const re = new URLSearchParams(search).get("redirect");
  const redirect = re ? re : '/';

  useEffect(() => {
    if (registerInfo && search) {
      navigate(redirect);
    }
    return () => {
      //
    };
  }, [registerInfo, navigate, search, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password, repassword));
    navigate('/signin');
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <div className="form-sign">
              {" "}
              <h3>CREATE AN ACCOUNT</h3>
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
            <label htmlFor="name">
              <h3>Name</h3>
            </label>
            <input
              type="name"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
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
            <label htmlFor="repassword">
              <h3>RePassword</h3>
            </label>
            <input
              type="repassword"
              name="repassword"
              id="repassword"
              onChange={(e) => setRePassword(e.target.value)}
            />
          </li>
          <li>
            <button type="submit" className="button">
              Sign Up
            </button>
          </li>
          <li>
            Already have an account ?
            <Link
              to={redirect === "/" ? "/signin" : "/signin?redirect=" + redirect}
              className="button-fullwidth"
            >
              Sign into Your TRENDz
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}
export default RegisterScreen;
