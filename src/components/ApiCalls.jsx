// import {useContext} from 'react'
// import {productContext} from '../contexts/products'
import axios from 'axios'
import {config} from './reactConfig'

export const GetSQLOutput = props => {
    let outPut;
    console.log("Inside GetSQLOutput")
    axios.get(`${config.restAPIserver}:${config.restAPIHost}/api/getSqlresult/${props}`)
    .then(({data}) => {
            let {rows} = data;
            outPut = rows;
            // console.log(rows);
                     })
    .catch((e) => {
                    console.log(e);
                    })
    return outPut;
}


export const GetApiData = (sql, fileName) => {
const apiUrl = `${config.restAPIserver}:${config.restAPIHost}/api/adhocSqlsViaBodyPost`;
return axios.post(apiUrl,{sqltext:sql, fileName:fileName})
.then ((result) => {
// console.log(result)
return result.data.rows;
})
.catch((e) => {
// console.log("SQL in GetApiData",sql);
// alert("Couldn't get data from Database")
// if error, return 0 rows
console.log(apiUrl)
return ["ERROR"];
})};


export const GetApiDataUpdate = (sql, fileName) => {
    const apiUrl = `${config.restAPIserver}:${config.restAPIHost}/api/adhocSqlsViaBodyPost`;
    return axios.post(apiUrl,{sqltext:sql, fileName:fileName})
    .then ((result) => {
    // console.log(result.data.rowsAffected)
    return result.data.rowsAffected;
    })
    .catch((e) => {
    // console.log("SQL in GetApiData",sql);
    // alert("Couldn't get data from Database")
    // if error, return 0 rows
    console.log(apiUrl)
    return ["ERROR"];
    })};