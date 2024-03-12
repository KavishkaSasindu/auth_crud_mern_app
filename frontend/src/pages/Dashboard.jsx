import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [message, setMessage] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const token = await localStorage.getItem("jwt");
      if (token) {
        try {
          const response = await fetch("http://localhost:3000/api/dashboard", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          if (response.status === 200) {
            const data = await response.json();
            console.log(data.message);
            setMessage(data.message);
          }
        } catch (error) {
          console.log(error.message);
        }
      } else {
        navigate("/");
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-full h-[300px] flex justify-center items-center">
      <div className="w-[80%] h-[200px] bg-slate-600/20 text-black flex justify-center items-center">
        <h1 className="text-center text-4xl">Dashboard</h1>
        <p className="text-center text-black text-xl ml-40"> {message}</p>
      </div>
    </div>
  );
};

export default Dashboard;
