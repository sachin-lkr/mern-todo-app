import { useState } from "react";
import "../style/signUp.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
      const user = localStorage.getItem("login");
  
      console.log(user);
  
      if (user) {
        navigate("/");
      }
    }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await fetch("http://localhost:8080/signup", {
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
      localStorage.setItem("login", formData.email);
      navigate("/");
    } else {
      alert(data.msg);
    }

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

        <button type="submit">Sign up</button>
        <Link to={"/signin"}>sign_in</Link>
      </form>
    </div>
  );
}

export default SignUp;
