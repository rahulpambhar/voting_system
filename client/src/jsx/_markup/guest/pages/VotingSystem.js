import React, { useEffect, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';

import web3 from '../../../../web3'
import votingSystem from "../../../../contractDetail/contracts_confige/votingSystem"



export default function VotingSystem() {

    const [Ec, setEc] = useState('')
    const [addNewParty, setNewParty] = useState('')
    const [partyIndexId, setPartyIndexId] = useState('')
    const [partyIndex, setPartyIndex] = useState('')
    const [partyIs, getParty] = useState('')
    const [electionTime, setElectionTime] = useState('')
    const [voteStateAdd, setVoteStateAdd] = useState('')
    const [voteVoterId, setVoteVoterId] = useState('')
    const [votePartyIndex, setVotePartyIndex] = useState('')



    const setPublic = async () => {
        setEc(await votingSystem.methods.electionCommitioner().call())

    }

    useEffect(() => {
        setPublic();
        console.log("ok")
    }, [])

    const submitPartyIndex = async (e) => {
        e.preventDefault();
        getParty(await votingSystem.methods.party(partyIndex).call())
        console.log("party data-->", partyIs)
    }


    const submitNewParty = async (e) => {
        e.preventDefault()

        const accounts = await web3.eth.getAccounts()
        await votingSystem.methods.newParty(addNewParty).send({ from: accounts[0] })
        setPartyIndexId(await votingSystem.methods.partyCount().call())
        console.log("new party index id-->", partyIndexId)
        alert("new party added successfully...")

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

    const submitVote = async (e) => {
        e.preventDefault();
        const accounts = await web3.eth.getAccounts()
        await votingSystem.methods.voting(voteStateAdd, voteVoterId, votePartyIndex).send({ from: accounts[0] })
    }

    const getElectionWinner = async () => {
        // await votingSystem.methods.winnerIs().call();
        console.log("election winner is-->", await votingSystem.methods.winnersName().call())
        console.log("election year-->", await votingSystem.methods.ElectionYear().call())
    }


    return (
        <>
            <h5>Election commitionar is : {Ec}</h5>
            <hr />
            <div>
                <h3>Office Use Only</h3>

                <form onSubmit={submitPartyIndex}>
                    <h5>Enter Party IndexId</h5>
                    <input type="number" value={partyIndex} onChange={(e) => { setPartyIndex(e.target.value) }} />
                    <br />
                    <button type="submit" className="btn mt-3 btn-primary">submit</button>
                </form>

                <button className="btn btn-success mt-3" type="button" onClick={getElectionWinner} >Get Winner</button>

            </div>
            <hr />
            <div>

                <form onSubmit={submitNewParty}>
                    <h5>Generate New Party</h5>
                    <input type="text" value={addNewParty} onChange={(e) => { setNewParty(e.target.value) }} />
                    <br />
                    <button className="btn btn-primary mt-3" type="submit">submit</button>
                </form>
            </div>
            <hr />
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

            <div>
                <form onSubmit={submitVote}>
                    <h5>Cast Your Vote Here </h5>
                    <input type="text" placeholder="state address" value={voteStateAdd} onChange={(e) => { setVoteStateAdd(e.target.value) }} />
                    <br />
                    <input type="text" placeholder="voter ID" value={voteVoterId} onChange={(e) => { setVoteVoterId(e.target.value) }} />
                    <br />
                    <input type="text" placeholder="Party Index" value={votePartyIndex} onChange={(e) => { setVotePartyIndex(e.target.value) }} />
                    <br />
                    <button className="btn btn-success mt-3 mb-3" type="submit">VOTE</button>
                </form>
            </div>
            <hr />















        </>
    )

}