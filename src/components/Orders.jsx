import React,{useState,useEffect,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import axios from 'axios';
import DisplayTableData from './DisplayTableData'
import styled from 'styled-components'
import {accountsContext} from '../contexts/accountsContext'
import {config} from './reactConfig'



export function Orders() {
    const [accountInfo] = useContext(accountsContext);
    const history = useHistory();
    const query = `select id order_id,sum(price) Total_Price,to_char(max(ts),'DD-MON-YY') time,max(status) status from orders where email='${accountInfo.email}' group by id order by id desc`;
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
    const query = `select b.NAME,category,QTY,a.PRICE,TOTAL_PRICE TOTAL,to_char(ts,'DD-MON-YY HH24:MI') TS from orders a join products b on (a.prodid=b.id) where a.id= `+ props.match.params.id ;
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
            <DisplayTableData state={orderDetails}/>

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
    const query = `select id order_id,sum(price) Total_Price,count(*) quantity,to_char(max(ts),'DD-MON-YY') time,max(status) status from orders group by id order by id desc`;
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
    const query = `select NAME,UNITS,PRICE,OFFERPRICE,TO_CHAR(CREATED,'DD-Mon-YY HH24:MI') created from products`;
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
                       alert( `Couldn't get Products\n ` + e);
                        })
    }, [query])
    //Unmount
    useEffect(() => () => {}, []) 
    return (
        <OrdersContainer className="container">
            {accountInfo.isLoggedIn ?
            <>
            <DataHeader className="text-center p-1">PRODUCTS</DataHeader>
            {orderDetails.length > 0 ?
            <DisplayTableData state={orderDetails} comp="PRODUCTS"/>
            : 
            <p className="text-white text-center">No Products available </p>}
            </>
            : <p className="text-white text-center"> Please <Link className="text-danger" to="/signin">Signin </Link> to see your Orders </p>}
            <div className="d-flex justify-content-center">
                <div className="btn btn-warning btn-sized-md m-1" onClick={() => history.goBack()}>Go Back</div>
                <div className="btn btn-success btn-sized-md m-1" onClick={() => history.push("/")}>Home</div>
            </div>
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
font-family: 'Brush Script MT', cursive;
color:var(amazonChime);
border-radius:0.25rem;
box-shadow: 0 0 0.8rem 0.25rem rgba(0,0,0,1);
@media (max-width:390px)
{
    font-size:1.2rem;
    font-weight:bold;
}
`






