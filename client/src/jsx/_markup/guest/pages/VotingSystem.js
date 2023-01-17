import React, { useState, useEffect } from "react";

import web3 from '../../../../web3'
import votingSystem from "../../../contractDetail/contracts_confige/votingSystem"
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import StateContract from "../../../contractDetail/contracts_confige/state"
import electionStateFactory from "../../../contractDetail/contracts_confige/electionStateFactory"

export default function VotingSystem() {

    const [allStates, setAllStates] = useState([])
    const [stateAddress, setStateAddress] = useState('')
    const [stateName, setStateName] = useState('') 
    const [voteVoterId, setVoteVoterId] = useState('')
    const [votePartyIndex, setVotePartyIndex] = useState('')


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


    const submitVote = async (e) => {
        e.preventDefault();
        const accounts = await web3.eth.getAccounts()
        await votingSystem.methods.voting(stateAddress, voteVoterId, votePartyIndex).send({ from: accounts[0] })
    }

    return (
        <>
            <div className="row mt-5">
                <div className="col-5">
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
                    {
                        stateName &&
                            stateAddress && stateName.length > 0 && stateAddress.length > 0
                            ?
                            <div className="col-12">
                                <hr />
                                <h6>
                                    State Name : {stateName}
                                </h6>
                                <h6>
                                    State Eddress : {stateAddress}
                                </h6>
                                <hr />
                            </div>
                            :
                            null
                    }
                    <Form className=" mb-5" onSubmit={submitVote}>
                        {/* <Form.Group className="mb-1 " >
                            <Form.Label>state address</Form.Label>
                            <Form.Control type="text" placeholder="" value={voteStateAdd} onChange={(e) => { setVoteStateAdd(e.target.value) }} />
                        </Form.Group> */}
                        <Form.Group className="mb-1 " >
                            <Form.Label>voter ID</Form.Label>
                            <Form.Control type="text" placeholder="" value={voteVoterId} onChange={(e) => { setVoteVoterId(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-1 " >
                            <Form.Label>Party Index</Form.Label>
                            <Form.Control type="text" placeholder="" value={votePartyIndex} onChange={(e) => { setVotePartyIndex(e.target.value) }} />
                        </Form.Group>
                        <Button className="" variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    )

}