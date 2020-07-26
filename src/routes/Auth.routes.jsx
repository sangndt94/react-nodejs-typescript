import React from 'react'
import HomePage from '../pages/HomePage'
import { Route, Switch } from 'react-router-dom'
import SignUpPage from '../pages/SignUpPage'
import SignInPage from '../pages/SignInPage'
import NotFoundPage from '../pages/NotFoundPage'

const routes = [
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

const AuthRoutes = () => {
    return (
        <Switch>
            {
                routes.map(({ path, component, exact },index) => <Route key={index} path={path} component={component} />)
            }
        </Switch>
    )
}

export default AuthRoutes
