//import logo from './logo.svg';
import './App.css';
import {Route,Switch} from 'react-router-dom'
import styled from "styled-components"
// import Navbar from './components/Navbar'
import Products from './components/Products.jsx'
import Cart from './components/Cart'
import Notfound from './components/Notfound'
import {Orders,OrderDetails} from './components/Orders'
import {ListProducts} from './components/ListProducts'
import Signup from './components/Signup'
import Signin from './components/Signin'
import NavSideBar from './components/NavSideBar' 
// import Coursel from './components/Coursel.jsx'

function App() {
  return (
      <div className="App">
        <NavSideBar/>
        <MarginLeft>
              <Switch> 
                <Route exact path="/" component={Products} />
                <Route exact path="/products" component={ListProducts} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/orders" component={Orders} />
                <Route exact path="/orderdetails/:id" component={OrderDetails} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/signin" component={Signin} />
                <Route component={Notfound}/>
              </Switch>
        </MarginLeft>
      </div>
  );
}

export default App;

const MarginLeft = styled.div`
margin:30px 0px 0px 250px;
hieght:100vh;
padding-top:200px;
`


