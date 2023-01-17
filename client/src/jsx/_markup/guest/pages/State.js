import React, { useEffect, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';

import web3 from '../../../../web3'
import electionStateFactory from "../../../contractDetail/contracts_confige/electionStateFactory"

import StateContract from "../../../contractDetail/contracts_confige/state"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAlert, positions } from 'react-alert'


export default function State() {
    const alert = useAlert()
    const [allStates, setAllStates] = useState([])
    const [stateAddress, setStateAddress] = useState('')
    const [stateName, setStateName] = useState('')

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


    }, [])

    const setState = async (state, address) => {
        const stateContract = StateContract(address)
        setStateAddress(await stateContract.methods.stateAddress().call())
        setStateName(await stateContract.methods.stateName().call())
    }




    const submitAddVoter = async (e) => {
        e.preventDefault()


        const accounts = await web3.eth.getAccounts()
        const stateContract = StateContract(stateAddress)
        const result = await stateContract.methods.addVoter(voterName, voterAge, voterResident, voterCity, voterPincode).send({ from: accounts[0] })
        setVoterIndexId(await stateContract.methods.votersCount().call())

        console.log("result->", result,)
        console.log("voterIndexId->", voterIndexId)

        alert.success('voter added successfully', {
            position: positions.TOP_CENTER,
            timeout: 5000,
        })

        setVoterName("")
        setVoterAge('')
        setVoterResidentAdd('')
        setVoterCity('')
        setVoterPincode('')

    }

    return (
        <>
            <div className="row justify-content-center ">
                <div className="col-5 mt-5 mb-3">
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
                        )
                    )}

                    <div className="col">

                        {
                            stateName &&
                                stateAddress && stateName.length > 0 && stateAddress.length > 0
                                ?
                                <div>
                                    <hr />
                                    <h6>
                                        State Name : {stateName}
                                    </h6>
                                    <h6>
                                        State Eddress : {stateAddress}
                                    </h6>

                                    <hr />
                                    <h3> Add Voter</h3>

                                    <Form className="col mb-5" onSubmit={submitAddVoter}>
                                        <Form.Group className="mb-1 " controlId="formBasicEmail">
                                            <Form.Label>Full Name</Form.Label>
                                            <Form.Control type="text" placeholder="" value={voterName} onChange={(e) => setVoterName(e.target.value)} />
                                        </Form.Group>

                                        <Form.Group className="mb-1 " controlId="formBasicEmail">
                                            <Form.Label>Age</Form.Label>
                                            <Form.Control type="text" placeholder="" value={voterAge} onChange={(e) => setVoterAge(e.target.value)} />
                                        </Form.Group>

                                        <Form.Group className="mb-1 " controlId="formBasicEmail">
                                            <Form.Label>RecidentAddress</Form.Label>
                                            <Form.Control type="text" placeholder="" value={voterResident} onChange={(e) => setVoterResidentAdd(e.target.value)} />
                                        </Form.Group>

                                        <Form.Group className="mb-1 " controlId="formBasicEmail">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control type="text" placeholder="" value={voterCity} onChange={(e) => setVoterCity(e.target.value)} />
                                        </Form.Group>

                                        <Form.Group className="mb-1 " controlId="formBasicEmail">
                                            <Form.Label>PinCode</Form.Label>
                                            <Form.Control type="text" placeholder="" value={voterPincode} onChange={(e) => setVoterPincode(e.target.value)} />
                                        </Form.Group>


                                        <Button className="" variant="primary" type="submit">
                                            Submit
                                        </Button>

                                    </Form>
                                </div>
                                : null
                        }
                    </div>
                </div>



            </div>


        </>
    );
}













