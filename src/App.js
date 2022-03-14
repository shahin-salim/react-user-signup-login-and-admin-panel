import Signup from './Pages/Signup'
import Login from './Pages/Login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import AdminHome from "./Pages/AdminHome";
import EditUser from './Pages/EditUser'
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";


function App() {


     return <div className="App" >
          <BrowserRouter>
               <Routes>
                    <Route path="/signup/:value" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/admin_home" element={<AdminHome />} />
                    <Route path="/edit_user/:id" element={<EditUser />} />
               </Routes>
          </BrowserRouter>
     </div>
}

export default App;
