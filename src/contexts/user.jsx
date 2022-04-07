import React,{createContext} from 'react'


export const userContext = createContext(true);


// const [loggedin,setLogin] = useState(false);

export function userProvider(props) {
    return (
        <userContext.Provider value={true}>
        {props.children}
        </userContext.Provider>
    )
}
