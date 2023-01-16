import React, { createContext, useEffect, useState, useMemo } from "react";
import ReactDOM from "react-dom";
import axios from 'axios'
// import electionStateFactory from "../../../contractDetail/contracts_confige/electionStateFactory"


export const ServiceContext = createContext();

export default function ContractContext(props) {

    const [userRole,setUserRole]=useState('')


    const fetchRole =async ()=>{        
        // setUserRole(await axios.get('http://localhost/8000/'))
        console.log("hello");
    }

    useEffect(()=>{
        
        fetchRole()

    },[])


    return (

        <ServiceContext.Provider
            value={{
                hello: "helloworld",
                userRole
            }}

        >
            {props.children}
        </ServiceContext.Provider>
    )



}