import { useState } from "react";
import { Route, BrowserRouter as Router, Routes, Link, useNavigate, Outlet} from "react-router-dom";

function App() {
  const [SearchQuery,SetSearchQuery] = useState('');

  const Home = ()=><h1>HOME</h1>

  const PageNotFound = () => <h1>Page Not Found</h1>

  const About = () => <h1>About</h1>

  const ContactUs = () => <h1>Contact Us</h1>

  const SearchBar = () =>{
    const navigate = useNavigate(); // To change the URL
    const handleChangeInput = (e) => {
      console.log(e.target.value);
      SetSearchQuery(e.target.value);
      navigate(`/${e.target.value}`);
    }
    
    return (
      <>
      <h1>Search</h1>
      <input type="text" onChange={handleChangeInput} value={SearchQuery} autoFocus/>
      </>
    )
  }

  const More = ()=> (
    <>
      <h2>More</h2>
      <Link to={'One'}>One</Link>
      <Link to={'Two'}>Two</Link>
      <Outlet/>

      {/* Relative Links in More: The Link components for navigating to /One and /Two should use relative paths because they are inside the /More route. Thus, instead of linking to /One, you link to One, which will resolve to /More/One. */}

      {/* Outlet for Nested Routes: The Outlet component inside the More component is the placeholder where the nested routes (/More/One and /More/Two) will be rendered when those paths are accessed. */}
    </>
  )
  const One = () => <h1>ONE</h1>

  const Two = () => <h1>TWO</h1>;
  
  function Header (){
    const navigate = useNavigate();
    const handleNavigation = ()=>{
      navigate('/ContactUs');
    }
    return(
      <>
        <SearchBar/>
        <header>
          <Link to="/" > Home </Link>
          <Link to="/About" > About </Link>
          <Link to="/More" > More </Link>
          <button onClick={handleNavigation}>Contact us</button>
        </header>
      </>
    )
  }

  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/About" element={<About/>}/>
          <Route path="/ContactUs" element={<ContactUs/>}/>
          <Route path="/More" element={<More/>}>
            <Route path='One' element={<One/>}/>
            <Route path='Two' element={<Two/>}/>
          </Route>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </Router>
    </>
  )
}
export default App
