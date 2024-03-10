import  { createContext, useReducer, ReactNode, FC } from "react";
import { AppReducer } from "./AppReducer";
import { Log } from "../components/LoggingPage";

export interface maintask {
    taskName:string;
    id:number;
    logs:Log[]
}
interface firstSate {
    mainlogs:[]
}

export interface InitialState {
       mainlogs:maintask [];
}

export interface addlog{
        id:number;
        log:Log;
    }
export interface updatelog{
    mainId:number;
    updatedLog:Log;
}
 interface loggings{
    id:number;
    log:Log
 }


export interface GlobalContextTypes {
        state: InitialState;
        addMainLogs: (mainTask: maintask) => void;
        deleteMainLogs:(id:number) =>void;
        addLogs:(addLog:loggings) =>void;
        updateLogs:(updatelog:updatelog) => void;
}

const initialState:InitialState = {
    mainlogs:[]
}

export const GlobalContext = createContext<GlobalContextTypes | null>(null);

const GlobalProvider: FC<{ children: ReactNode }> = ({ children }): JSX.Element => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

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

    const addLogs = (addLog:addlog) =>{
        dispatch({
            type:'ADD_LOGS',
            payload:addLog,
        })

    }

    const updateLogs = (updatedLog:updatelog) => {
        dispatch({
            type:'UPDATE_LOGS',
            payload:updatedLog
        })
    }

    const contextValue: GlobalContextTypes = {
        state,
        addMainLogs,
        deleteMainLogs,
        addLogs,
        updateLogs,
    };

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalProvider;
