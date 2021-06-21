import './App.css';

import {Home} from './Home';
import {Department} from './Department';
import {Employee} from './Employee';
import {Navigation} from './Navigation';

import {BrowserRouter,Route,Switch} from 'react-router-dom';

function App() {
  return (
            <BrowserRouter>
            <Navigation/>
            <Switch>
                <Route path='/' component={Home} exact/>
                <Route path='/department' component={Department}/>
                <Route path='/employee' component={Employee}/>
            </Switch>
            </BrowserRouter>
  );
}

export default App;
