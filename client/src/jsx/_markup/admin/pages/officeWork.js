import React, { useEffect, useState } from "react";
import electionStateFactory from "../../../contractDetail/contracts_confige/electionStateFactory"
import web3 from '../../../../web3'
import Dropdown from 'react-bootstrap/Dropdown';
import { useAlert, positions } from 'react-alert'
import SplitButton from 'react-bootstrap/SplitButton';
import StateContract from "../../../contractDetail/contracts_confige/state"
import votingSystem from "../../../contractDetail/contracts_confige/votingSystem"


export default function OffieWork() {
    const alert = useAlert()

    const [Ec, setEC] = useState('')
    const [allStates, setAllStates] = useState([])
    const [account, setAccounts] = useState('')
    const [newState, setNewState] = useState('')
    const [stateAddress, setStateAddress] = useState('')
    const [stateName, setStateName] = useState('')
    const [pinCode, setPinCode] = useState('')
    const [getVoter, setGetVoter] = useState('')
    const [partyIs, getParty] = useState('')
    const [partyIndex, setPartyIndex] = useState('')
    const [partyIndexId, setPartyIndexId] = useState('')
    const [addNewParty, setNewParty] = useState('')
    const [electionTime, setElectionTime] = useState('')


    const setPublic = async () => {

        const { ethereum } = window;
        if (ethereum) {
            setAccounts(await ethereum.request({
                method: "eth_requestAccounts"
            }))

        }
        setEC(await electionStateFactory.methods.electionCommitioner().call())
        setAllStates(await electionStateFactory.methods.getStates().call())

    }

    useEffect(() => {
        setPublic()
    }, [])


    const newStateSubmit = async (e) => {
        e.preventDefault();
        // const account = await web3.eth.getAccounts()
        await electionStateFactory.methods.creatingNewState(newState).send({ from: account[0] })
        setNewState('')
        setPublic()
    }

    const setState = async (state, address) => {
        const stateContract = StateContract(address)
        setStateAddress(await stateContract.methods.stateAddress().call())
        setStateName(await stateContract.methods.stateName().call())
    }

    const submitPinCode = async (e) => {
        e.preventDefault()

        const account = await web3.eth.getAccounts()
        const stateContract = StateContract(stateAddress)
        await stateContract.methods.addPincode(pinCode).send({ from: account[0] })

        alert.success('added succsessFully', {
            position: positions.TOP_CENTER,
            timeout: 5000,
        })


    }

    const submitGetVoter = async (e) => {
        e.preventDefault();

        const stateContract = StateContract(stateAddress)
        const result = await stateContract.methods.voters(getVoter).call()
        console.log("result->", result);

    }

    const submitPartyIndex = async (e) => {
        e.preventDefault();
        getParty(await votingSystem.methods.party(partyIndex).call())
        console.log("party data-->", partyIs)
    }

    const getElectionWinner = async () => {
        // await votingSystem.methods.winnerIs().call();
        console.log("election winner is-->", await votingSystem.methods.winnersName().call())
        console.log("election year-->", await votingSystem.methods.ElectionYear().call())
    }


    const submitNewParty = async (e) => {
        e.preventDefault()

        const accounts = await web3.eth.getAccounts()
        await votingSystem.methods.newParty(addNewParty).send({ from: accounts[0] })
        setPartyIndexId(await votingSystem.methods.partyCount().call())
        console.log("new party index id-->", partyIndexId)

        alert.success('New party added succsessFully', {
            position: positions.TOP_CENTER,
            timeout: 5000,
        })

    }

    const submitElectionTime = async (e) => {
        e.preventDefault()
        const accounts = await web3.eth.getAccounts()
        await votingSystem.methods.timeScadule(electionTime).send({ from: accounts[0] })
    }

    const getTimeScadule = async () => {
        console.log("start time-->", await votingSystem.methods.votingStartTime().call())
        console.log("end time-->", await votingSystem.methods.votingEndTime().call())

    }


    return (
        <>

            <div className="row">
                <div className="col mt-5">
                    <h5 className="text-danger ">  Elaction commitinior:<span className="text-dark">{Ec}</span></h5>
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-5">
                    <form onSubmit={newStateSubmit}>
                        <h3>Create New State</h3>
                        <input className="form-control" value={newState} onChange={(e) => { setNewState(e.target.value) }} />
                        <br />
                        <button className="btn btn-success" type="submit">submit</button>
                    </form>
                </div>

            </div>
            <hr />

            <div className="row">
                <div className="col-5">

                    {['Info'].map(
                        (variant) => (
                            <SplitButton
                                key={variant}
                                id={`dropdown-split-variants-${variant}`}
                                variant={variant.toLowerCase()}
                                title={"Select state for add new pin code"}
                            >
                                {
                                    allStates.map((states, i) => {
                                        return (<Dropdown.Item key={i} eventKey="1" onClick={(e) => { setState(states.deployedStateName, states.deployedStateAddress) }}>
                                            {states.deployedStateName}
                                        </Dropdown.Item>)
                                    })
                                }
                            </SplitButton>
                        ),
                    )}

                    {
                        stateName &&
                            stateAddress && stateName.length > 0 && stateAddress.length > 0
                            ?
                            <div>
                                <h6>
                                    State Name is:{stateName}
                                </h6>
                                <h5>
                                    State Edress is:{stateAddress}
                                </h5>
                                <form onSubmit={submitPinCode}>
                                    <input type="" value={pinCode} onChange={(e) => { setPinCode(e.target.value) }} />
                                    <br />
                                    <br />
                                    <button type="submit" >setPinCode</button>
                                </form>

                                <form onSubmit={submitGetVoter}>
                                    <h4>Get voter(Enter voters index number )</h4>
                                    <input type="" value={getVoter} onChange={(e) => { setGetVoter(e.target.value) }} />
                                    <button type="submit">GetVoter</button>

                                </form>
                            </div>
                            :
                            null
                    }
                </div>
            </div>
            <hr />

            <div className="row">
                <div className="col">

                    <form onSubmit={submitPartyIndex}>
                        <h5>Enter Party IndexId</h5>
                        <input type="number" value={partyIndex} onChange={(e) => { setPartyIndex(e.target.value) }} />
                        <br />
                        <button type="submit" className="btn mt-3 btn-primary">submit</button>
                    </form>

                    <button className="btn btn-success mt-3" type="button" onClick={getElectionWinner} >Get Winner</button>

                </div>

                <div className="col">
                    <form onSubmit={submitNewParty}>
                        <h5>Generate New Party</h5>
                        <input type="text" value={addNewParty} onChange={(e) => { setNewParty(e.target.value) }} />
                        <br />
                        <button className="btn btn-primary mt-3" type="submit">submit</button>
                    </form>

                </div>
            </div> 
            <hr />
            <div className="row">
                <div className="col">
                    <div>
                        <form onSubmit={submitElectionTime}>
                            <h5>Set time for Election </h5>
                            <input type="text" value={electionTime} onChange={(e) => { setElectionTime(e.target.value) }} />
                            <br />
                            <button className="btn btn-primary mt-3" type="submit">submit</button>
                        </form>
                        <button className="btn btn-info mt-3" type="button" onClick={() => { getTimeScadule() }}>Get start/End time</button>
                    </div>
                    <hr />

                </div>

            </div>

        </>


    )
}




