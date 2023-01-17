import web3 from "../../../web3";

const electionStateFactory = require ('../contracts_abi/votingSystem.json')

export default new web3.eth.Contract(electionStateFactory,"0x92C83A5ba01241B4821F58CEAD7803393c756bD8")
