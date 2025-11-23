import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import styles from "./index.module.css";
import { apiPrefix } from "../constant.js";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>{
    toast.error(err, {
      position: "bottom-left",
    });
    console.log("Error in login :: ", err);
  }

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting login form");
      const { data } = await axios.post(
        `${apiPrefix}/login`,
        {
          ...inputValue,
        },
        { withCredentials: true }
      );

      console.log("DATA :: ", data);
      const { success, message } = data;
      console.log(message)

      if (success) {
        handleSuccess(message);

        // ✅ Wait a bit for toast to show, then redirect
        setTimeout(() => {
          navigate("/Home");
        }, 1200);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.error(error);
      handleError("Something went wrong, please try again");
    }

    setInputValue({
      email: "",
      password: "",
    });
  };

  return (
    <div className={styles.formbody}>
      <div className={styles.form_container}>
        <h2>Login Account</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
              required
            />
          </div>

          <button type="submit">Submit</button>

          <span>
            Already have an account? <Link to={"/signup"}>Signup</Link>
          </span>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
