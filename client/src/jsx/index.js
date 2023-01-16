import { Route, Routes } from "react-router-dom";
import React from "react";
import DeclareState from './_markup/guest/pages/DeclaredState'

import OffieWork from "./_markup/admin/pages/officeWork";

import State from './_markup/guest/pages/State'
// import VotingSystem from './jsx/_markup/guest/pages/VotingSystem'
import HomePage from './_markup/guest/pages/HomePage'
import LoginSignup from './_markup/guest/pages/LoginSinup'




import ServiceContextProvider from "./_contex/contractsContext";




function Markup() {
    return (
        <ServiceContextProvider>
            <div className="container">
                <Routes>

                    {/* Admin user page */}
                    <Route path="/officeWork" element={<OffieWork />} />




                    {/* Guest user pages  */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginSignup />} />
                    <Route path="/DeclareState" element={<DeclareState />} />
                    <Route path="/stateinfo" element={<State />} />
                    {/* <Route path="/votingSystem" element={<VotingSystem />} />  */}

                </Routes>
            </div>


        </ServiceContextProvider>
    );
}

export default Markup;
