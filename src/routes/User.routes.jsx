import React from 'react'
import HomePage from '../pages/HomePage'
import { Route, Redirect, Switch } from 'react-router-dom'
import NotFoundPage from '../pages/NotFoundPage'
import SignUpPage from '../pages/SignUpPage'
import SignInPage from '../pages/SignInPage'
import CreateContext from '../context/CreateContext'

const { State } = CreateContext()

const routes = [
    {
        path: "/",
        component: HomePage,
        exact: true
    },
    {
        path: "/sign-up",
        component: SignUpPage,
        exact: true
    },
    {
        path: "/sign-in",
        component: SignInPage,
        exact: true
    },
    {
        path: "*",
        component: NotFoundPage,
        exact: false
    }
]

const UserRoutes = () => {
    const { user } = State().state
    return (
        <Switch>
            {
                routes.map(({ path, component, exact }, index) => {
                    if (user && window.location.pathname === "/sign-in" || window.location.pathname === "/sign-up") {
                        return <Route key={index} exact={exact} component={NotFoundPage} />
                    }
                    return <Route key={index} path={path} exact={exact} component={component} />
                })
            }
        </Switch>
    )
}

export default UserRoutes
