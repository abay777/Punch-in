
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
                return mainlog; // Return the unchanged mainlog for other items
            });
        
            if (updatedMainlogs.some(mainlog => mainlog.id === id)) {
                // If mainlog with id is found, return the updated state
                return {
                    ...state,
                    mainlogs: updatedMainlogs
                };
            } else {
                // If mainlog with id is not found, return the original state
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
                                    return logg; // Return the unchanged log if not the one to update
                                }),
                            };
                        }
                        return mainlog; // Return the unchanged mainlog for other items
                    }),
                };
                console.log('log successfully updated');
                return updatedState;
            


            default:
                return state;
        }
};
