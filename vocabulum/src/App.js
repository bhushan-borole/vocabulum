import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import AllWords from './pages/AllWords';
import AddWord from './pages/AddWord';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route
          exact
          path="/"
          component={Home}>
        </Route>

        <Route
          exact
          path="/add-word"
          component={AddWord}>
        </Route>

        {/* <Route
          exact
          path="/"
          component={AllWords}>
        </Route> */}
      </Switch>
    </Router>
  );
}

export default App;
