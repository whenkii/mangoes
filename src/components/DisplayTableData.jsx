import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {AllSpinners} from './Spinners'
import styled from 'styled-components'
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import {faArrowUp} from '@fortawesome/free-solid-svg-icons';
// import {faArrowDown} from '@fortawesome/free-solid-svg-icons';
import { CSVLink } from "react-csv";
// import { GiConsoleController } from 'react-icons/gi';

export default function DisplayTableData({state,comp}) {

let stateVarInitial = state;
let hyperLinks = {attr:"ORDER_ID",link:"/orderdetails"}
// [{comp:"ORDERS",attr:"ORDER_ID",link:"/orderdetails"},{comp:"ALLORDERS",attr:"ORDER_ID",link:"/orderdetails"}]

const [stateVar,setOrderDetails]= useState(stateVarInitial);
const [sort,setSort]= useState({propertyName:"",mode:'ASC'});

const propComparator = (propName,type) => (a, b) => {

    if (type === 'ASC') 
    {
         if(a[propName] < b[propName]){
                    return -1;
            // a should come after b in the sorted order
            }else if(a[propName] > b[propName]){
                    return 1;
            // a and b are the same
            }
            else{
                    return 0;
            }
    }

    if (type === 'DSC') 
    {
        if(a[propName] > b[propName]){
                return -1;
        // a should come after b in the sorted order
        }else if(a[propName] < b[propName]){
                return 1;
        // a and b are the same
        }
        else{
                return 0;
        }
    }

};

const orderbyAttribute = (props) => {
    setSort(prevState => ({...prevState,propertyName:props,mode:sort.mode === 'ASC' ? 'DSC' : "ASC"}))
    // console.log(sort)
    let newOrders = stateVar.sort(propComparator(props,sort.mode));
    setOrderDetails(() => [...newOrders]);
    }       

useEffect(() => {
    setOrderDetails(stateVarInitial);
}, [stateVarInitial])
//Unmount
useEffect(() => {
  return () => setOrderDetails([]);
}, [stateVarInitial])   

    return (
        <TableContainer>
             {stateVar.length > 0 ?
             <div>
                <div className="d-flex justify-content-end">
                         <CSVLink className="text-danger csv-exporter mb-1" data={stateVar}>Export CSV</CSVLink>
                </div>
                <div className="table-responsive bordered">
                    <table className="table text-center">
                        <thead className="thead">
                            <tr className="header">
                                {Object.keys(stateVar[0]).map((item,index) => 
                                    <th key={index} className="border">
                                        <ButtonContainer onClick={() => orderbyAttribute(item)}>
                                            <div className="row">
                                                <div className={`col tab-headings ${sort.propertyName === item ? " text-danger":null}`} >{item}</div>  
                                                <span className={`col ${sort.propertyName === item ? " text-danger":null}`}>
                                                    {/* {sort.propertyName === item ? <FontAwesomeIcon className="text-dark" icon={sort.mode === "ASC" ? faArrowUp : faArrowDown} /> :null} */}
                                                    </span>
                                            </div>
                                        </ButtonContainer>
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="bod">
                        {stateVar.map((dataArray,index) =>
                            <tr key={index}> 
                                {Object.keys(state[0]).map( (attrName,index) =>
                                    <th key={index} scope="row" className={`border tdata ${attrName === "PRICE" ? "text-danger":"text-white"}`}> 
                                    { attrName === hyperLinks.attr 
                                    // && comp === hyperLinks.comp 
                                    ?  
                                    <Link className="text-danger col" to={`${hyperLinks.link}/${dataArray[attrName]}`}>{dataArray[attrName]}</Link> : dataArray[attrName]}
                                    </th>
                                )}
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
            : stateVar.length === 0 ? null : <AllSpinners />}
        </TableContainer>
    )
}


const TableContainer = styled.div`
// margin-top:5rem;
.thead {
    background:white;
}
.tab-headings{
    align-text:center;
    margin:0.25rem;
    font-weight:bold;
    color:var(--amzonChime);
}
.border{
    color:var(--csBlue);
    font-weight:none;
    padding:0;
    // border:none !important;
}
.bod{
    margin-top:1rem;
}
.col {
    font-size:0.7rem;
    font-weight:bold;
    }
.tdata{
    font-size:0.6rem;
}
@media (max-width:798px){
.csv-exporter{
    font-size:0.6rem;
}
.col {
        font-size:0.6rem;
        // font-weight:bold;
        }
.tdata{
    color:white;
    font-size:0.6rem;
}
.border{
    padding:0;
        }
}
`

const ButtonContainer = styled.button`
background-color:transparent;
padding:none;
border:none;
`

