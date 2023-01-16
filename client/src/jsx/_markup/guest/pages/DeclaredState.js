import React, { useEffect, useState } from "react";
import web3 from '../../../../web3'
import electionStateFactory from "../../../contractDetail/contracts_confige/electionStateFactory"

import useServiceContextHook from '../../../_hooks/service.context.hook'



export default function App() {

    const [allStates, setAllStates] = useState([])
    const [account, setAccounts] = useState('')

    // const { hello } = useServiceContextHook()

    const setPublic = async () => {

        const { ethereum } = window;
        if (ethereum) {
            setAccounts(await ethereum.request({
                method: "eth_requestAccounts"
            }))

        }

        setAllStates(await electionStateFactory.methods.getStates().call())
    }

    useEffect(() => {
        setPublic()
    }, [])



    return (
        <>

            <div className="row  " style={{  marginTop: "20px" }}>
                <div className="col">
                    <h4 className="mx-3" style={{  marginTop: "20px" }}>Declared States </h4>
                    {allStates.map((states, i) => {
                        return (
                            <div
                                className="container-fluid"
                                style={{ width: "100%"  }}
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

                </div>

            </div>





        </>
    );
}