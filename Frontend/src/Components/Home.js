import React, { useEffect} from "react";
import {useNavigate} from "react-router-dom"
import Notes from "./Notes";
import "../home.css"



function Home() {

      const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
    <div className="container home">
      <Notes/>
    </div>
    </>
  );
}

export default Home;
