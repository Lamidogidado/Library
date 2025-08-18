import React from 'react';
import GeneralInfo from './components/GeneralInfo';
import Education from './components/Education';
import PracticalExperience from './components/PracticalExperience';
import './App.css'; // You can create an App.css file for styling
import Header from './components/Header';

function App() {
  return (
    <div className="app-container">
      <Header />
      <br />
      <GeneralInfo />
      <hr />
      <Education />
      <hr />
      <PracticalExperience />
    </div>
  );
}

export default App;