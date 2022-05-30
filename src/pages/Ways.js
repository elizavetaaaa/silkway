import {Route, Routes} from "react-router-dom";
import React from "react";
import Home from './Home'
import Hotels from "./Hotels";
import News from "./News";
import SignUp from "./SignUp";
import MyArea from "./MyArea";
import PrivateRoute from "../accessHelpers/PrivateRoute"
import Extra from "../components/Extra";
import Patners from "./Patners";
import Hotel from "./Hotel";

export default function Ways() {
    return (
        <Routes>
            <Route exact path="/" element={<Home/>}>
            </Route>
            <Route exact path="/news" element={<News/>}/>
            <Route exact path="/signup" element={<SignUp/>}/>
            <Route exact path="/hotels" element={<Hotels/>}/>
            <Route exact path="/patners" element={<Patners/>}/>
            <Route exact path="/hotel" element={<Hotel/>}/>


            <Route exact path='/my-area' element={<MyArea/>}/>



            // private route declaration for MyArea Table component
            {/*<Route exact path='/my-area' element={<PrivateRoute/>}>*/}
            {/*    <Route exact path='/my-area' element={<MyArea/>}/>*/}
            {/*</Route>*/}
            {/*<Route path="/authe/password-reset/" element={<Extra/>}/>*/}
                <Route path="/authe/password-reset/:lol/:22/" element={<Extra/>}/>



            {/*<Route path="/hotels" element={*/}
            {/*    <PrivateRoute exact path="/hotels" >*/}
            {/*        <Hotels/>*/}
            {/*    </PrivateRoute>*/}
            }/>


        </Routes>
    )
}
