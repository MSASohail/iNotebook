import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./Components/About";
import Home from "./Components/Home";
import NotesState from "./context/notes/NotesState";
import Alert from "./Components/Alert";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { useState } from "react";
function App() {
  const [alert, setalert] = useState(null)
  const showAlert = (message, type) => {
    setalert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setalert(null)
    }, 1500);
  }
  return (
    <div className="App">
      <NotesState>
      <BrowserRouter>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">       
        <Routes>
          <Route exact path="/" element={<Home  showAlert={showAlert}/>}/>
            <Route exact path="/about" element={<About />} />         
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />         
            <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />         
        </Routes>
        </div>
      </BrowserRouter>
      </NotesState>
    </div>
  );
}

export default App;
