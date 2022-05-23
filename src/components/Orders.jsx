import React,{useState,useEffect,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import axios from 'axios';
import DisplayTableData from './DisplayTableData'
import styled from 'styled-components'
import {accountsContext} from '../contexts/accountsContext'
import {config} from './reactConfig'
import {AllSpinners} from './Spinners';



export function Orders() {
    const [accountInfo] = useContext(accountsContext);
    const history = useHistory();
    const query = `select id order_id,sum(price) Total_Price,to_char(max(ts),'DD-MON-YY') time,max(status) status from orders where email='${accountInfo.email}' group by id order by id desc`;
    const [orderDetails,setOrderDetails]= useState([]);
    // const [isLoading,setIsLoading]= useState(false);

    //Mount - Get Orders details
    useEffect(() => {
        axios.get(`${config.restAPIserver}:${config.restAPIHost}/api/getSqlresult/${query}`)
        .then((result) => {
            let {data} = result;
            let {rows} = data;
            //Set state once data is returned from AXIOS
        setOrderDetails(rows);
                         })
        .catch((e) => {
                       alert( `Couldn't get Orders\n ` + e);
                        })
    }, [query])
    //Unmount
    useEffect(() => () => {}, []) 
    return (
        <OrdersContainer className="container">
            {accountInfo.isLoggedIn ?
            <>
            <DataHeader className="text-center p-1">ORDERS</DataHeader>
            {orderDetails.length > 0 ?
            <DisplayTableData state={orderDetails} comp="ORDERS"/>
            : 
            <p className="text-white text-center">No orders yet </p>}
            </>
            : <p className="text-white text-center"> Please <Link className="text-danger" to="/signin">Signin </Link> to see your Orders </p>}
            <div className="d-flex justify-content-center">
                <div className="btn btn-warning btn-sized-md m-1" onClick={() => history.goBack()}>Go Back</div>
                <div className="btn btn-success btn-sized-md m-1" onClick={() => history.push("/")}>Home</div>
            </div>
        </OrdersContainer>
    )
}


export function OrderDetails(props) {
    const history = useHistory();
    // const [accountInfo] = useContext(accountsContext);
    const query = `select b.NAME,category,QTY,a.PRICE,TOTAL_PRICE TOTAL,to_char(a.ts,'DD-MON-YY HH24:MI') TS from sggr.orders a join sggr.products b on (a.prodid=b.id) where a.id= `+ props.match.params.id ;
    const [orderDetails,setOrderDetails]= useState([]);

    //Mount - Get Orders details
    useEffect(() => {
        axios.get(`${config.restAPIserver}:${config.restAPIHost}/api/getSqlresult/${query}`)
        .then((result) => {
            let {data} = result;
            let {rows} = data;
    //Set state once data is returned from AXIOS
        setOrderDetails(rows);
                         })
        .catch((e) => {
                       alert( `Couldn't get Orders from API\n ` + e);
                        })
    }, [query])
    //Unmount
    useEffect(() => () => {}, []) 
    return (
        <OrdeDetailsContainer className="container">
            <DataHeader className="text-center p-1">ORDER DETAILS</DataHeader>
            <DisplayTableData state={orderDetails} id={props.match.params.id} comp="ORDERDETAILS"/>

            <div className="d-flex justify-content-center">
                <div className="btn btn-warning btn-sized-md m-1" onClick={() => history.goBack()}>Go Back</div>
                <div className="btn btn-success btn-sized-md m-1" onClick={() => history.push("/")}>Home</div>
            </div>
        </OrdeDetailsContainer>
    )
}


export function AllOrders() {
    const [accountInfo] = useContext(accountsContext);
    const history = useHistory();
    const query = `with ordersall as (select a.modified_by,a.id order_id,sum(a.price*qty) order_price,sum(qty) quantity,to_char(max(a.ts),'DD-MON-YY HH24:MI') time,max(status) status,listagg(substr(name,1,4)||'('||qty||')',',') within group(order by prodid) prod_list from orders a ,products b where b.id=a.prodid and a.status <> 'CANCELLED' group by a.id,modified_by order by a.id desc) select a.order_id,order_price,decode(del_mode,'delivery',(case when quantity >= 5 then 0 else decode(location, 'Other', 6, 4 ) end) + order_price, order_price) total_price,prod_list,quantity,time,status,del_mode,location,paymode,address,modified_by from ordersall a,deliveries b  where a.order_id=b.order_id `;
    const [orderDetails,setOrderDetails]= useState([]);
    const [,setIsLoading]= useState(true);

    const orderTotal = orderDetails.reduce ( (prev,{QUANTITY}) => prev+QUANTITY,0);
    const orderTotalPrice = orderDetails.reduce ( (prev,{TOTAL_PRICE}) => prev+TOTAL_PRICE,0);
    // const cartReducePrice = inCartItems.reduce((prev,{PRICE,QTY}) => prev+PRICE*QTY,0);
    // console.log(orderTotal)

    //Mount - Get Orders details
    useEffect(() => {
        setIsLoading(false)
        axios.get(`${config.restAPIserver}:${config.restAPIHost}/api/getSqlresult/${query}`)
        .then((result) => {
            let {data} = result;
            let {rows} = data;
            //Set state once data is returned from AXIOS
        setOrderDetails(rows);
                         })
        .catch((e) => {
                       alert( `Couldn't get Orders\n ` + e);
                        })
    }, [query])
    //Unmount
    useEffect(() => () => {}, []) 
    return (
        <OrdersContainer className="container">
            {accountInfo.isLoggedIn ?
            <>  
            <DataHeader className="text-center p-1">ALL ORDERS</DataHeader>
            <div className="d-flex justify-content-center">
                <div className="btn btn-warning btn-sized-md m-1" onClick={() => history.goBack()}>Go Back</div>
                <div className="btn btn-success btn-sized-md m-1" onClick={() => history.push("/")}>Home</div>
            </div>
            <div className="d-flex flex-column justify-content-center text-center card">
                <div className="text-dark font-weight-bold"> Total : <span className="text-danger">{orderTotal}</span></div>
                <div className="text-dark font-weight-bold">Amount : <span className="text-danger">${orderTotalPrice}</span></div>
            </div>
            {orderDetails.length > 0 ?
            <DisplayTableData state={orderDetails} comp="ALLORDERS"/>
            : 
            <p className="text-white text-center">No orders yet </p>}
            </>
            : <p className="text-white text-center"> Please <Link className="text-danger" to="/signin">Signin </Link> to see your Orders </p>}
            <div className="d-flex justify-content-center">
                <div className="btn btn-warning btn-sized-md m-1" onClick={() => history.goBack()}>Go Back</div>
                <div className="btn btn-success btn-sized-md m-1" onClick={() => history.push("/")}>Home</div>
            </div>
        </OrdersContainer>
    )
}

export function Products() {
    const [accountInfo] = useContext(accountsContext);
    const history = useHistory();
    const query = `select a.NAME,UNITS,PRICE,OFFERPRICE,stock,ordered,TO_CHAR(a.ts,'DD-Mon-YY HH24:MI') created from sggr.products a,sggr.stock b where a.name=b.name`;
    const [orderDetails,setOrderDetails]= useState([]);
    const [isLoading,setIsLoading]= useState(true);
    const [loadingError,setIsLoadingError]= useState("Fetching data");

    //Mount - Get Orders details
    useEffect(() => {
        axios.get(`${config.restAPIserver}:${config.restAPIHost}/api/getSqlresult/${query}`)
        .then((result) => {
            setIsLoading(false);
            let {data} = result;
            let {rows} = data;
            //Set state once data is returned from AXIOS
        setOrderDetails(rows);
                         })
        .catch((e) => {
            setIsLoading(false);
            setIsLoadingError("Couldn't get data");
            alert( `Couldn't get Products\n ` + e);    
                        })
    }, [query])
    //Unmount
    useEffect(() => () => {}, []) 
    return (
        <OrdersContainer className="container">
            {!isLoading ?
            <>

            {accountInfo.isLoggedIn ?
            <>
            <DataHeader className="text-center p-1">PRODUCTS</DataHeader>
            {orderDetails.length > 0 ?
                <DisplayTableData state={orderDetails} comp="PRODUCTS"/>
            : 
            <p className="text-danger text-center">{loadingError} </p>}
            </>
            : <p className="text-white text-center"> Please <Link className="text-danger" to="/signin">Signin </Link> to see your Orders </p>
            }
            <div className="d-flex justify-content-center">
                <div className="btn btn-warning btn-sized-md m-1" onClick={() => history.goBack()}>Go Back</div>
                <div className="btn btn-success btn-sized-md m-1" onClick={() => history.push("/")}>Home</div>
            </div>
            </>
            :
            <AllSpinners />}
            
        </OrdersContainer>
    )
}

const OrdeDetailsContainer = styled.div`
margin-top:8rem;
`

const OrdersContainer = styled.div`
margin-top:8rem;
`

const DataHeader = styled.h1`
background:white;
font-size:2rem;
// font-family: 'Brush Script MT', cursive;
font-family: 'Courier New', monospace;
font-weight:bold;
font-family: 'Courier New', monospace;
color:var(amazonChime);
border-radius:0.25rem;
box-shadow: 0 0 0.8rem 0.25rem rgba(0,0,0,1);
@media (max-width:390px)
{
    font-size:1.2rem;
    font-weight:bold;
}
`






