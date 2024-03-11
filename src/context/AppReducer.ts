
import { InitialState } from "./context";

interface Action {
    type:string;
    payload:any;
}
export const AppReducer = (state: InitialState, action: Action) => {
    switch (action.type) {
        case 'ADD_MAIN_LOG':
            return {
                ...state,
                mainlogs: [...state.mainlogs, action?.payload]     
            };

        case 'DELETE_MAIN_LOG':
            return {
                mainlogs: state.mainlogs.filter(log => log.id !== action?.payload)
            };

        case 'ADD_LOGS':
            const { id, log } = action.payload;
            const updatedMainlogs = state.mainlogs.map(mainlog => {
                if (mainlog.id === id) {  
                    return {
                        ...mainlog,
                        logs: [...mainlog.logs, log]
                    };
                }
                return mainlog;
            });
            if (updatedMainlogs.some(mainlog => mainlog.id === id)) {
                return {
                    ...state,
                    mainlogs: updatedMainlogs
                };
            } else {
                return state;
            }
            
        case 'UPDATE_LOGS':
            const { mainId, updatedLog } = action.payload;
            const updatedState = {
                ...state,
                mainlogs: state.mainlogs.map(mainlog => {
                    if (mainlog.id === mainId) {
                        return {
                            ...mainlog,
                            logs: mainlog.logs.map(logg => {
                                if (logg.id === updatedLog.id) {
                                    return {
                                        ...logg,
                                        ...updatedLog,
                                    };
                                }
                                return logg; 
                            }),
                        };
                    }
                    return mainlog; 
                }),
            };
            return updatedState;

        case 'DELETE_LOGS':
            const {mainLogId,logId} = action.payload ;
            const newMainLog = state.mainlogs.map(mainlog=>{
                    if(mainlog.id === mainLogId){
                        return {
                            ...mainlog,
                            logs:mainlog.logs.filter(log=>log.id!==logId)}
                }
                return mainlog
            })
            return {
                ...state,
                mainlogs:newMainLog
            }

        default:
            return state;
    }
};
