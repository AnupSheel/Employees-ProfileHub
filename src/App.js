import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Header from './components/Header';
import About from './pages/About';
import AddEditProfile from './pages/AddEditProfile';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <div className='App'>
        <Header></Header>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/addProfile" element={<AddEditProfile></AddEditProfile>}></Route>
          <Route path="/editProfile/:id" element={<AddEditProfile></AddEditProfile>}></Route>
          <Route path="about" element={<About></About>}></Route>
          <Route path="/profile/:id" element={<Profile></Profile>}></Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
       </div>
       </BrowserRouter>
    </div>
  );
}

export default App;
