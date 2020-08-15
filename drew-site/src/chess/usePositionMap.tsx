import React, { useReducer } from "react";
import { useCallback } from "react";

function reducer(state: any, action: any){
    var toReturn: any = {};
    for(const[key, value] of Object.entries(state)){
        toReturn[key] = value;
    }
    if(action.moves != undefined){
        action.moves.map((move: {to: string | undefined, from:string}) =>{
           
            if(move.to != undefined){
                toReturn[move.to] = toReturn[move.from];
            }
            delete toReturn[move.from];
        })
    }
    else if(action.piece != undefined){
        toReturn[action.to] = action.piece;
        delete toReturn[action.from];
    }
    else{
        if(action.to != undefined){
            toReturn[action.to] = toReturn[action.from];
        }
        delete toReturn[action.from];
    }
    return toReturn;
}

export function usePositionMap(positionsMap: {[position: string]: string}): [{[position: string]: string}, (start?: string, end?: string, moves?:{start: string, end: string | undefined}[], piece?:string) => void]{
    const [stateMap, dispatch] = useReducer(reducer, positionsMap);
    const makeMove = useCallback((start?: string, end?:string, moves?:{start: string, end:string | undefined}[], piece?:string) =>{
        if(moves != undefined){
            dispatch({moves: moves.map((move)=> ({to: move.end, from: move.start}))});
        }
        else{
            dispatch({to: end, from: start, piece: piece});
        }
    }, [stateMap])
    return [stateMap, makeMove];
}