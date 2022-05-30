import {Route, Navigate, Outlet} from "react-router-dom"
import { useSelector } from "react-redux"
import React from "react";


const PrivateRoute = ({ children, ...remainingProps }) => {

    // const isAuthenticated = useSelector(state => state.auth.isAuth)
    const isAuthenticated = useSelector(state => state.registration.auth);
    console.log(isAuthenticated);
    // {false ? <div>aaaa :O</div> : <p>kjhkj</p>}
    return(
           <div>{isAuthenticated ? <h1>Azamat :)</h1> : <Navigate to='/'/>}</div>
        )



    // return (
    //     <Route
    //         {...remainingProps}
    //         render={({ location }) =>(
    //             // isAuthenticated ? (
    //                 <div className="c-app c-default-layout">
    //                     <div className="c-wrapper">
    //                         <div className="c-body">
    //                             {   }
    //                         </div>
    //                     </div>
    //                 </div>
    //         )
                // ) : (
                //     <Navigate
                //         to={{
                //             pathname: '/login',
                //             state: { from: location },
                //         }}
                //     />
                // )
    //         }
    //     />
    // )
}

export default PrivateRoute