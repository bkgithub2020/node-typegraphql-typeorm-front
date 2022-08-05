import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CategoryList from './components/category/CategoryList';
import AddCategory from './components/category/AddCategory';
import EditCategory from './components/category/EditCategory';
import Toast from "./components/LoadingError/Toast";
import "react-toastify/dist/ReactToastify.css";
import './App.css';

function App() {
  
  return (
    <div className="App">
      <Toast/>
      <Router>
        <Switch>
          <Route path="/" component={CategoryList} exact />
          <Route path="/category/add" component={AddCategory} />
          <Route path="/category/edit/:id" component={EditCategory} />
          <Route path="*" component={CategoryList} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
