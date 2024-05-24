import React, {lazy} from 'react'
import {connect} from "react-redux"
import {Redirect, Route, Switch, useLocation} from "react-router-dom"
import users from "../../../reducer/users";
import Error409 from "../../../dashboard/jsx/pages/Error409";



const ProtectedRoute = ({path, component, roles, users}) => {

    if (roles.some(role => users.roles.includes(role))) {
        return <Route path={path} component={component}/>
    }
    return <Route path={'*'} component={Error409}/>


};

export default connect((users), {})(ProtectedRoute);