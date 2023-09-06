import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  createUserWithEmailAndPassword } from "firebase/auth";
import {auth, db} from '../firebase/config'
import { toast } from "react-toastify";
import Loader from "./Loader";
import { doc, setDoc } from "firebase/firestore";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate=useNavigate()
  let validateUser = (email, password, cPassword) => {
    let error = {};
    let pattern = /^([a-zA-Z0-9_\!\#\$]+)\@([a-zA-Z0-9]+)\.([a-zA-Z]{3})$/;
    if (email == "") error.emailerr = "Email is required";
    else if (!pattern.test(email)) error.emailerr = "Invalid Email";
    if (password == "") error.passworderr = "Password is required";
    if (password != cPassword) error.cPassworderr = "Passwords not same";
    return error;
  };
  let registerUser = (e) => {
    e.preventDefault();
    setErrors(validateUser(email, password, cPassword));
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {           
            const user = userCredential.user;
            const role="user"
            const ref=doc(db,"users",userCredential.user.uid)
            await setDoc(ref,{email,password,role})
            setIsLoading(false)
            toast.success("registered successfully")
            navigate('/login')
      })
      .catch((error) => { 
        setIsLoading(false)
        toast.error(error.message)
      });
  };
  return (
    <div className="container">
      {isLoading && <Loader/>}
      <div class="card mt-5 shadow ">
        <div className="card-body row">
          <div className="col-4">
            <img
              src={require("../assets/register.png")}
              alt="Title"
              style={{ height: "300px" }}
            />
          </div>
          <div class="col-6">
            <h1>Register User</h1>
            <hr />
            <form onSubmit={registerUser} noValidate>
              <input
                type="text"
                placeholder="Email"
                className="form-control mt-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="text-danger">{errors.emailerr}</span>
              <input
                type="password"
                placeholder="Password"
                required
                className="form-control mt-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="text-danger">{errors.passworderr}</span>
              <input
                type="password"
                placeholder="Confirm Password"
                required
                className="form-control mt-2"
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
              <span className="text-danger">{errors.cPassworderr}</span>
              <br></br>
              <button type="submit" className="btn btn-primary mt-2">
                Register
              </button>
            </form>
            <span>
              Already an account?
              <Link to="/login">Login</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
