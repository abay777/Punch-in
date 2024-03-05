import React, { createContext, useReducer, ReactNode, FC } from "react";
import { AppReducer } from "./AppReducer";

export interface maintask {
    taskName:string;
    id:number;
    logs:[]
}

export interface InitialState {
       mainlogs:maintask [];
}



export interface GlobalContextTypes {
        state: InitialState;
        addMainLogs: (mainTask: maintask) => void;
        deleteMainLogs:(id:number) =>void;
}

export const GlobalContext = createContext<GlobalContextTypes | null>(null);

const GlobalProvider: FC<{ children: ReactNode }> = ({ children }): JSX.Element => {
    const [state, dispatch] = useReducer(AppReducer, { mainlogs: [] });

    const addMainLogs= (newlog:maintask ) => {
        dispatch({
            type: 'ADD_MAIN_LOG',
            payload: newlog
        });
    };

    const deleteMainLogs = (id:number) =>{
        dispatch({
            type:'DELETE_MAIN_LOG',
            payload:id
        })
    }

    const contextValue: GlobalContextTypes = {
        state,
        addMainLogs,
        deleteMainLogs
    };

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalProvider;
