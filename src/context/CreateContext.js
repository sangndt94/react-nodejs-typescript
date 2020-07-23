import React, { createContext, useState, useContext } from 'react'

const StateContext = createContext({ state: "", setState: () => { } });

const CreateContext = () => {
    const StateProvider = ({ children }) => {
        const [state, setState] = useState({ state: "", setState: () => { } });
        return (
            <StateContext.Provider value={{ state, setState }} >
                {children}
            </StateContext.Provider>
        );
    };

    const State = () => {
        const { state, setState } = useContext(StateContext);
        return {
            state,
            setState
        }
    }

    return {
        StateProvider,
        State
    }
}

export default CreateContext