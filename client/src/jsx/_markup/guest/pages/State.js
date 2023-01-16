import React, { useEffect, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';

import web3 from '../../../../web3'
import electionStateFactory from "../../../contractDetail/contracts_confige/electionStateFactory"

import StateContract from "../../../contractDetail/contracts_confige/state"


export default function State() {
    const [allStates, setAllStates] = useState([])
    const [pinCode, setPinCode] = useState('')
    const [stateAddress, setStateAddress] = useState('')
    const [stateName, setStateName] = useState('')
    const [getVoter, setGetVoter] = useState('')

    const [voterName, setVoterName] = useState('')
    const [voterAge, setVoterAge] = useState('')
    const [voterResident, setVoterResidentAdd] = useState('')
    const [voterCity, setVoterCity] = useState('')
    const [voterPincode, setVoterPincode] = useState('')

    const [voterIndexId, setVoterIndexId] = useState('')




    const setPublic = async () => {
       
        setAllStates(await electionStateFactory.methods.getStates().call())
    }

    useEffect(() => {
        setPublic()
        // console.log("hello")

    }, [])

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

        alert("added succsessFully")
    }

    const submitGetVoter = async (e) => {
        e.preventDefault();

        const stateContract = StateContract(stateAddress)
        const result = await stateContract.methods.voters(getVoter).call()
        console.log("result->", result);

    }

    const submitAddVoter = async (e) => {
        e.preventDefault()
        const accounts = await web3.eth.getAccounts()
        const stateContract = StateContract(stateAddress)
        const result = await stateContract.methods.addVoter(voterName, voterAge, voterResident, voterCity, voterPincode).send({ from: accounts[0] })
        setVoterIndexId(await stateContract.methods.votersCount().call())

        console.log("result->", result,)
        console.log("voterIndexId->", voterIndexId)
        alert('voter Added successfully.. ')

        setVoterName("")
        setVoterAge('')
        setVoterResidentAdd('')
        setVoterCity('')
        setVoterPincode('')

    }

    return (
        <>

           

            {['Info'].map(
                (variant) => (
                    <SplitButton
                        key={variant}
                        id={`dropdown-split-variants-${variant}`}
                        variant={variant.toLowerCase()}
                        title={"Select Your State"}
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

            <hr />
            <div>
                {
                    stateName &&
                        stateAddress && stateName.length > 0 && stateAddress.length > 0
                        ?
                        <div>
                            <form onSubmit={submitPinCode}>
                                <h3> Office Use Only</h3>
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


                            <hr />
                            <h6>
                                State Name is:{stateName}
                            </h6>
                            <h5>
                                State Edress is:{stateAddress}
                            </h5>

                            <hr />
                            <h3> Add Voter</h3>
                            <form onSubmit={submitAddVoter}>
                                <h5>Name</h5>
                                <input type="name" name="" value={voterName} onChange={(e) => setVoterName(e.target.value)} />
                                <h5>Age</h5>
                                <input type="name" name="" value={voterAge} onChange={(e) => setVoterAge(e.target.value)} />
                                <h5>RecidentAddress</h5>
                                <input type="name" name="" value={voterResident} onChange={(e) => setVoterResidentAdd(e.target.value)} />
                                <h5>City</h5>
                                <input type="name" name="" value={voterCity} onChange={(e) => setVoterCity(e.target.value)} />
                                <h5>PinCode</h5>
                                <input type="name" name="" value={voterPincode} onChange={(e) => setVoterPincode(e.target.value)} />

                                <br />
                                <button className="btn btn-primary mt-3 mb-5" type="submit" >Submit</button>

                            </form>

                        </div>



                        : null
                }
            </div>




        </>
    );
}













