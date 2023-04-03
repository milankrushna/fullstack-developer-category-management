// import logo from './logo.svg';
import './App.css';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
