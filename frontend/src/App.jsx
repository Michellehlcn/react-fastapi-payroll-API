import "./App.css";
import React, { Component } from "react";

import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";
import ErrorPage from "./components/ErrorPage";
import DashBoard from "./components/DashBoard";


import { BrowserRouter,Routes, Route } from "react-router-dom";


import AdminPage from './components/AdminPage';
import AdminLayout from './components/AdminLayout';
import AllUsers from "./components/AllUsers";
import AdminPageTimeSheet from "./components/AdminPage.TimeSheet";
/*
const App = () => {
  const [message, setMessage] = useState("");
  const [token] = useContext(UserContext);

  const getWelcomeMessage = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch("/api", requestOptions);
    const data = await response.json();

    if (!response.ok) {
      console.log("something messed up");
    } else {
      setMessage(data.message);
    }
  };

  useEffect(() => {
    getWelcomeMessage();
  }, []);


         <Route path="/admin"> 
              <Route index={true} element={<AdminPage />} />
              <Route path="users" element={<AdminPage />} />
          </Route> 
*/

class App extends Component {

  render() {

/*function App () {*/
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />} >
              <Route index element={<Login />} />
              <Route path="register" element= {<Register />} />
              <Route path="dashboard" element={<DashBoard />} />
              {/*<Route path="admin" element={<AdminPage />} />*/}
             <Route path="admin/" element={<AdminLayout />}>
                  <Route index element={<AdminPage />} />
                  <Route path='all-timesheets' element={<AdminPageTimeSheet />} />
                  <Route index={true} path="*" element={<ErrorPage />} />                          
              </Route>
              <Route index={true} path="*" element={<ErrorPage />} />
          </Route>
          
          
        </Routes>
      </BrowserRouter>


);
}
}


export default App;
