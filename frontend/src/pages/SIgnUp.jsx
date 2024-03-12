import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const SIgnUp = () => {
  const navigate = useNavigate();

  const [getData, setData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeValue = (e) => {
    setData({
      ...getData,
      [e.target.name]: e.target.value,
    });
  };

  const handleData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(getData),
      });

      const data = await response.json();
      if (response.status === 201) {
        localStorage.setItem("jwt", data.jwt);
        console.log(data);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div>
        <form method="POST" onSubmit={handleData}>
          username:
          <input type="text" name="username" onChange={changeValue} />
          email:
          <input type="email" name="email" onChange={changeValue} />
          password:
          <input type="password" name="password" onChange={changeValue} />{" "}
          <button type="submit">SignUp</button>
        </form>
      </div>
    </div>
  );
};

export default SIgnUp;
