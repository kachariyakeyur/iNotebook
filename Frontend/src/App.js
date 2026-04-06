import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./Context/Notes/NoteState";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import "./LoginSignup.css"

function App() {

  return (
    <>
    <NoteState>
      <Router>
        
        <div>
          <Routes>

            <Route exact path="/" element={ <ProtectedRoute> <Navbar/> <Home /> </ProtectedRoute> } />

            <Route exact path="/about" element={<ProtectedRoute> <Navbar/> <About /> </ProtectedRoute>} />

            <Route exact path="/login" element={<Login/>} />

            <Route exact path="/signup" element={<Register />} />

          </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
