import web3 from "../web3";

const electionStateFactory = require ('../contracts_abi/elactionStateFactory.json')

export default new web3.eth.Contract(electionStateFactory,"0xe12FaDa6E84075C05d29A12092856e912f60118E")

