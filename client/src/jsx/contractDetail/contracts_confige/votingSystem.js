import web3 from "../../web3";

const electionStateFactory = require ('../contracts_abi/votingSystem.json')

export default new web3.eth.Contract(electionStateFactory,"0x6D1cB97033840e085eF039cEA287B43784a38Dd4")
