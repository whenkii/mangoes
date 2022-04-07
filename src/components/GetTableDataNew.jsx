import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {AllSpinners} from './Spinners'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {faArrowDown} from '@fortawesome/free-solid-svg-icons';
import { CSVLink } from "react-csv";

export default function GetTableDataNew({state}) {
let stateVarInitial = state; 

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
    // console.log(state);
    setOrderDetails(stateVarInitial);
}, [stateVarInitial])

    return (
        <TableContainer>
             {stateVar.length > 0 ?
             <div>
                <div className="d-flex justify-content-end">
                         <CSVLink className="font-weight-bold" data={stateVar}>Export CSV</CSVLink>
                </div>
                <div  className="d-flex">
                    {Object.keys(stateVar[0]).map((item,index) => 
                                <div key={index} className="column btn" onClick={() => orderbyAttribute(item)}>{item}
                                {sort.propertyName === item ? <FontAwesomeIcon className="mx-1" icon={sort.mode === "ASC" ? faArrowUp : faArrowDown} /> :null}  
                                </div>
                            )}
                </div>
                    {/* {stateVar.map((item,index) =>
                        <tr key={index}> 
                        {Object.keys(state[0]).map( (item2,index) =>
                            <th key={index} scope="row" className="border border-dark"> 
                            { item2 === "ID" ?  <Link className="text-success" to="/orders">{item[item2]}</Link> : item[item2]}
                            </th>
                        )}
                        </tr>
                    )} */}
            </div>
            : <AllSpinners />}
        </TableContainer>
    )
}


const TableContainer = styled.div`
.header {
    width:3rem !important;
}
.column{
    width:30rem;
    border:0.002rem solid white;
    background-color:black;
    color:white;
    text-transform:uppercase;
    text-align:center;
}
`