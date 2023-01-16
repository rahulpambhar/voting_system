import React, { useEffect, useState } from "react";
import web3 from '../../../../web3'
import electionStateFactory from "../../../contractDetail/contracts_confige/electionStateFactory"

import useServiceContextHook from '../../../_hooks/service.context.hook'



export default function App() {
    const [Ec, setEC] = useState('')
    const [account, setAccounts] = useState('')
    const [allStates, setAllStates] = useState([])
    const [newState, setNewState] = useState('')
    // const { hello } = useServiceContextHook()

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

    return (
        <>


            <h5>Elaction commitinior:</h5> {Ec}
            <hr />
            <br />
            <form onSubmit={newStateSubmit}>
                <h3>Create New State</h3>
                <input value={newState} onChange={(e) => { setNewState(e.target.value) }} />
                <br />
                <button type="submit">submit</button>
            </form>

            <hr />

            <p style={{ textAlign: "center", marginTop: "20px" }}>Declared States </p>
            {allStates.map((states, i) => {
                return (
                    <div
                        className="container-fluid"
                        style={{ width: "100%" }}
                        key={i}
                    >
                        <table
                            style={{
                                marginBottom: "10px",
                            }}
                        >
                            <tbody>
                                <tr>
                                    <td
                                        style={{
                                            backgroundColor: "#96D4D4",
                                            border: "1px solid white",
                                            borderCollapse: "collapse",
                                            padding: "7px",
                                            width: "100px",
                                        }}
                                    >
                                        {states.deployedStateName}
                                    </td>
                                    <td
                                        style={{
                                            backgroundColor: "#96D4D4",
                                            border: "1px solid white",
                                            borderCollapse: "collapse",
                                            padding: "7px",
                                            width: "800px",
                                        }}
                                    >
                                        {states.deployedStateAddress}
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            })}



        </>
    );
}