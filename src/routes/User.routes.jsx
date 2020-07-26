import React from 'react'
import HomePage from '../pages/HomePage'
import { Route, Redirect, Switch } from 'react-router-dom'
import NotFoundPage from '../pages/NotFoundPage'

const routes = [
    {
        path: "/",
        component: HomePage,
        exact: true
    },
    {
        path: "*",
        component: NotFoundPage,
        exact: false
    }
]

const UserRoutes = () => {
    return (
        <Switch>
            {
                routes.map(({ path, component, exact }, index) => <Route key={index} path={path} exact={exact} component={component} />)
            }
        </Switch>
    )
}

export default UserRoutes
