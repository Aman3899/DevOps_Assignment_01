import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import SingleBlog from './pages/SingleBlog';
import SignUp from './pages/SignUp';
import Login from './pages/Loign';
import UploadBlog from './pages/UploadBlog';
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Blogs from './components/Blogs';


const App = () => {
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={isLoggedIn ? <Home /> : <Navigate to={"/login"}/>} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/blog/:blogId' element={isLoggedIn ? <SingleBlog /> : <Navigate to={"/login"}/>} />
          <Route path='/uploadBlog' element={isLoggedIn ? <UploadBlog /> : <Navigate to={"/login"}/>} />
          <Route path="*" element={<NoPage />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/services' element={<Services />} />
          <Route path='/blogs' element={<Blogs />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App