import React from 'react';
import './App.scss';
import { BrowserRouter, Route } from 'react-router-dom';
import { HomePage } from './Home/Home';
import { MemorizationPage } from './Memorization/MemorizationPage';
import { RecallPage } from './Recall/RecallPage';

function App() {
  return (    
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={HomePage}/>
        <Route path="/instructions">Instructions</Route>
        <Route path="/memorization" component={MemorizationPage}/>
        <Route path="/recall" component={RecallPage}/>
        <Route path="/highscores">Highscores</Route>
        <Route path="/edit-card-word-links">Edit Card Word Links</Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
