import React, { useEffect, useState } from "react";
import electionStateFactory from "../../../contractDetail/contracts_confige/electionStateFactory"


export default function OffieWork() {

    const [Ec, setEC] = useState('')
    const [account, setAccounts] = useState('')
    const [newState, setNewState] = useState('')


    const setPublic = async () => {

        const { ethereum } = window;
        if (ethereum) {
            setAccounts(await ethereum.request({
                method: "eth_requestAccounts"
            }))

        }
        setEC(await electionStateFactory.methods.electionCommitioner().call())

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


    return (
        <>

            <div className="row">
                <div className="col">
                    <h5 className="text-danger mt-3">  Elaction commitinior:<span className="text-dark">{Ec}</span></h5>
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

        </>


    )
}




