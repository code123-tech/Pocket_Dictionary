import React from 'react';
import {Switch,Route} from 'react-router-dom';
import AddWord from "./components/AddWord";
import dictionaryList from "./components/dictionaryList";
import wordPage from "./components/wordPage";
import error from "./components/error";
import './App.css';

function App() {
  return (
   <Switch>
        <Route exact path="/" component={dictionaryList} />
        <Route exact path="/addword" component={AddWord} />
        <Route exact path="/show-word/:word" component={wordPage} />
        <Route component={error}/>
   </Switch>
  );
}

export default App;
