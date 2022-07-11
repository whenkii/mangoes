//import logo from './logo.svg';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {Route,Switch} from 'react-router-dom'
import Nav from './components/Nav'
import ProductList from './components/ProductList'
import {ProductsProvider} from './contexts/mangoesContext'
import {AccountsProvider} from './contexts/accountsContext'
import Cart from './components/Cart.jsx'
import Login from './components/Login'
import SignUp from './components/SignUp'
import NotFound from './components/NotFound'
import OrderConfirmation from './components/OrderConfirmation'
import ProductInfo from './components/ProductInfo'
import {Orders,OrderDetails,Products,AllOrders} from './components/Orders'
import Checkout from './components/Checkout'
import AddComments from './components/AddComments'
import AddstockComments from './components/AddstockComments'
import Payment from './components/Payment'
import Admin from './components/Admin.js'
import AddProducts from './components/AddProducts'
import ContactUs from './components/ContactUs'
// import IdleTimeCotainer from './components/IdleTimeCotainer' 


function App() {
  return (
      <div className="App">
        {/* <IdleTimeCotainer> */}
        <AccountsProvider>
        <ProductsProvider>
          <Nav/> 
          <Switch> 
            <Route exact path="/aboutProduct/:name" component={ProductInfo} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/orderconfirmation/:id/:deliverycharges?" component={OrderConfirmation} />
            <Route path="/orders" component={Orders} />
            <Route path="/allorders" component={AllOrders} />
            <Route path="/orderdetails/:id" component={OrderDetails} />
            <Route path="/addcomments/:id" component={AddComments} />
            <Route path="/stock/:id" component={AddstockComments} />
            <Route path="/products" component={Products} />
            <Route exact path="/products" component={ProductList} />
            <Route exact path="/account" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/payment" component={Payment} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/addProduct" component={AddProducts} />
            <Route exact path="/contactus" component={ContactUs} />
            <Route exact path="/" component={ProductList} />
            <Route component={NotFound} />
          </Switch>
        </ProductsProvider>
        </AccountsProvider>
        {/* </IdleTimeCotainer> */}
      </div>
  );
}

export default App;



