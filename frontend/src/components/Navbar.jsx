import logo from "../images/logo.png" 
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <div className="navbar flex items-center justify-between h-[100px] px-[100px] bg-[#0c0c0c] overflow-hidden">
        <Link to="/">
          <div className="logo">
            <img className='w-[240px]' src={logo} alt="" />
          </div>
        </Link>
        <div className="links flex items-center gap-[20px]">
          <Link to="/" className='navLink active'>Home</Link>
          <Link to="/about" className='navLink'>About</Link>
          <Link to="/blogs" className='navLink'>Blogs</Link>
          <Link to="/services" className='navLink'>Services</Link>
          <Link to="/contact" className='navLink'>Contact</Link>
          <Link to="/uploadBlog" className='navLink'>Upload Blog</Link>

          <button onClick={()=>{
            localStorage.removeItem("token");
            localStorage.removeItem("isLoggedIn");
            window.location.href = "/login";
          }} className="btnNormal !bg-red-500 transition-all hover:!bg-red-600">Logout</button>
        </div>
      </div>
    </>
  )
}

export default Navbar