import { useState } from "react";
import "../style/signUp.css";
import { Link } from "react-router-dom";

function SignIn() {
  const [formData, setFormData] = useState({
    
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert("Signup Successful");

    setFormData({
      
      email: "",
      password: "",
    });
  };

  return (
    <div className="container1">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>Sign In</h1>

       

        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Sign in
        </button>
        <Link to={"/signup"}>sign_up</Link>
      </form>
      
    </div>
  );
}

export default SignIn;