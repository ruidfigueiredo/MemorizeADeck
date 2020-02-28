import React from 'react';
import './App.scss';
import { BrowserRouter, Route } from 'react-router-dom';
import { HomePage } from './Home/Home';
import { MemorizationPage } from './Memorization/MemorizationPage';
import { RecallPage } from './Recall/RecallPage';
import {HighscoresPage} from './Highscores/HighscoresPage'
import { InstructionsPage } from './Instructions/InstructionsPage';
import { EditCardWordLinksPage } from './EditCardWordLinks/EditCardWordLinksPage';

function App() {
  return (    
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={HomePage}/>
        <Route path="/instructions" component={InstructionsPage}/>
        <Route path="/memorization" component={MemorizationPage}/>
        <Route path="/recall" component={RecallPage}/>
        <Route path="/highscores" component={HighscoresPage}/>
        <Route path="/edit-card-word-links" component={EditCardWordLinksPage}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
