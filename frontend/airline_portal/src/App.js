
import './App.css';
import Heading from './components/widgets/heading';
import MainPage from "./components/pages/mainPage";
import './mainStyle.css';
import Footer from "./components/widgets/footer";
import {Route, Router, Routes} from "react-router";
import ErrorPage from "./components/pages/errorPage";
import {BrowserRouter} from "react-router-dom";
import Login from "./components/pages/login";
import Register from "./components/pages/register";


import AirlineListPage from "./components/pages/airlineListPage";
import {useState} from "react";
import Logout from "./components/pages/logoutPage";
import ChangeProfile from "./components/pages/profile";
import {checkLogin, getLoginUser} from "./components/services/loginService";
import AdminPage from "./components/pages/adminMainPage";
import SearchFlightsPage from "./components/pages/searchFlightsPage";
import UserList from "./components/pages/userList";
import ChangeProfileAdmin from "./components/pages/profileAdmin";
import CompaniesPage from "./components/pages/companies";
import {AllBooks, BooksForUser} from "./components/pages/bookPage";



function App() {

    const isLoggedIn = checkLogin();
    const loginUser = isLoggedIn ? getLoginUser() : null;
    const isAdmin = isLoggedIn ? loginUser.role === 'admin' : false;

  return (
    <div className="App">
        <Heading />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={isAdmin ? <AdminPage/> : <MainPage/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/logout" element={<Logout/>} />
                <Route path="/profile" element={<ChangeProfile/>} />
                <Route path="/profileAdmin" element={<ChangeProfileAdmin/>} />
                <Route path="/register" element={<Register />} />
                <Route path="/airlineListPage" element={<AirlineListPage />} />
                <Route path="/searchFlights" element={<SearchFlightsPage />} />
                <Route path="/userList" element={<UserList />} />
                <Route path="/companies" element={<CompaniesPage />} />
                <Route exact path="/books" element={<AllBooks/>} />
                <Route exact path="/books/:userId" element={<BooksForUser />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
        <Footer />
    </div>
  );
}

export default App;
