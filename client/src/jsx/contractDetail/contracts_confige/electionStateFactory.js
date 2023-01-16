import web3 from "../../../web3";

const electionStateFactory = require ('../contracts_abi/elactionStateFactory.json')

export default new web3.eth.Contract(electionStateFactory,"0x0531d87593F3a31a087888d7903eca1F139FeBA8")

