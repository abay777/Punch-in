import {  createContext, useReducer } from "react";
import { AppReducer } from "./AppReducer";



const intialState ={
    mainlogs:[]
}
export const GlobalContext = createContext("")


const globalProvider = ({children})=>{
    const [state,dispatch] = useReducer(AppReducer,intialState)
}