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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await result.json();
    console.log(data);
    if (data.token) {
      document.cookie = `token=${data.token}`;
    }
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

        <button type="submit">Sign in</button>
        <Link to={"/signup"}>sign_up</Link>
      </form>
    </div>
  );
}

export default SignIn;
