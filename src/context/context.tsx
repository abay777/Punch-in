import  { createContext, useReducer, ReactNode, FC, useCallback, useEffect } from "react";
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
export interface deleteLog{
    mainLogId:number;
    logId:number
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
        deleteLogs:(deleteLog:deleteLog)=>void;
}

const state:InitialState = {
    mainlogs:[]
}
const storedState = localStorage.getItem('state');
const initialState: InitialState = storedState ? JSON.parse(storedState) : state
export const GlobalContext = createContext<GlobalContextTypes | null>(null);

const GlobalProvider: FC<{ children: ReactNode }> = ({ children }): JSX.Element => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
  
    useEffect(() =>{
        console.log('storage is working');
        localStorage.setItem('state',JSON.stringify(state))
        console.log(localStorage);
    },[state])
     
     

    const addMainLogs= (newlog:maintask ) => {
        dispatch({
            type: 'ADD_MAIN_LOG',
            payload: newlog
        });
         console.log(state)

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

    const deleteLogs = (deleteLog:deleteLog) => {
        dispatch({
            type:'DELETE_LOGS',
            payload:deleteLog
        })
         
    }

    const contextValue: GlobalContextTypes = {
        state,
        addMainLogs,
        deleteMainLogs,
        addLogs,
        updateLogs,
        deleteLogs,
    };

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalProvider;
