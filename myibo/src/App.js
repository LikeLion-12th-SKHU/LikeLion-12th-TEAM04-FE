import React from 'react';
import Nav from './components/Nav';
import Content from './components/Section1';
import './App.css';
import main1 from './img/main1.png';
import main2 from './img/main2.png';
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <Nav />
      <div className="main-content">
        <div className="main1-image">
          <img src={main1} alt="Main 1 visual" className="image" />
        </div>
        <Content />
        <div className="main2-image">
          <img src={main2} alt="Main 2 visual" className="image" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
