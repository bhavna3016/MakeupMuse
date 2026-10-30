import { Components } from "./componentdata";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Navbar } from "./Component/navbar";
import { Footer } from "./Component/footer";

function App() {

 
  return (
    <>
    <Navbar/>
    <ToastContainer position="top-right" autoClose={3000} />
  <Components/>
  <Footer/>
  
    </>
  );
}

export default App;
