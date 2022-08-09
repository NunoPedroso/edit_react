
import  { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {NavLink} from "react-router-dom";
import Home from "./pages/Home";


import './index.css'
import './styles.css'
import About from "./pages/About";


export default function App() {

    return (
        <div className="App">
        <h1>React Router</h1>
        <Router>
            <header>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
            </header>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/about" element={<About/>} />
            </Routes>
        </Router>

        </div>
    );
}

