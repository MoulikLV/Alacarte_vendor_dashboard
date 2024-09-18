import "./App.css";
import NoPagefound from "./vendorDashboard/Components/NoPagefound";

import LandingPage from "./vendorDashboard/Pages/LandingPage";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<NoPagefound/>}/>
      </Routes>
    </>
  );
} 

export default App;
