import { useState } from "react";
import "../style/signUp.css";
import { Link } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
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
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="container1">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>

        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

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
          Sign up
        </button>
        <Link to={"/signin"}>sign_in</Link>
      </form>
    </div>
  );
}

export default SignUp;