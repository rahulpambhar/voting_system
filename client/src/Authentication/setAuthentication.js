import axios from "axios"

const setAuthHeader=(jwt)=>{
    
    if(jwt){
     
        axios.defaults.headers={
            Authorization: 'bearer ' +jwt          
        }        
    }else{
        delete axios.defaults.headers.Authorization 
    }
}

export default setAuthHeader;