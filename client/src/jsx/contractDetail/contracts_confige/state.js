import web3 from "../../web3";

const State = require ('../contracts_abi/state.json')


export default address=>{
    return new web3.eth.Contract(State, address)
   
};