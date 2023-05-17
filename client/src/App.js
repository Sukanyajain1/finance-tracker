import logo from './logo.svg';
import './App.css';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import {
  BrowserRouter,
  Switch,
  Route,
  Link 
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path = "/">
            <SignIn></SignIn>
          </Route>
          <Route exact path = "/dashboard">
            <Dashboard></Dashboard>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;