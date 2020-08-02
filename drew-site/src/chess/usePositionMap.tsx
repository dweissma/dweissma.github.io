import React, { useReducer } from "react";
import { useCallback } from "react";

function reducer(state: any, action: any){
    var toReturn: any = {};
    for(const[key, value] of Object.entries(state)){
        toReturn[key] = value;
    }
    toReturn[action.to] = toReturn[action.from];
    delete toReturn[action.from];
    return toReturn;
}

export function usePositionMap(positionsMap: {[position: string]: string}): [{[position: string]: string}, (start: string, end: string) => void]{
    const [stateMap, dispatch] = useReducer(reducer, positionsMap);
    const makeMove = useCallback((start: string, end:string) =>{
        dispatch({to: end, from: start});
    }, [stateMap])
    return [stateMap, makeMove];
}