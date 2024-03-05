
import { InitialState } from "./context";
interface Action {
    type: string;
    payload?: any;
}


export const AppReducer = (state: InitialState, action: Action) => {
    switch (action.type) {
        case 'ADD_MAIN_LOG':
            return {
                ...state,
                mainlogs: [...state.mainlogs, action?.payload]
            };
        case 'DELETE_MAIN_LOG':
            return{
                
                mainlogs: state.mainlogs.filter(log=>log.id != action?.payload)
            }
        
        default:
            return state;
    }
};
