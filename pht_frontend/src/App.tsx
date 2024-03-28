import React from "react";
import { ReactElement } from "react";
import './assets/styles/index.scss';
import MainPage from "./views/main-page";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ReadingsPage from "./views/readings-page";


const App:React.FC = ():ReactElement => {
    

    return(
        <React.Fragment>
            <div className='content'>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/readings" element={<ReadingsPage/>} />
                        <Route path="*" element={<Navigate to="/"/>} />
                    </Routes>
                </BrowserRouter>
            </div>
            <div className='background-image'></div>
        </React.Fragment>
    )
}

export default App