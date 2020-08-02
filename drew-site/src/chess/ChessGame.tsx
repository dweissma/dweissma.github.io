import React, { useCallback, useState } from "react";
import { ChessPositions } from "./ChessPositions";
import InitialPositions from "./Start.json";
import { usePositionMap } from "./usePositionMap";
import { ChessBoard } from "./ChessBoard";
import "./Chess.scss";

export interface ChessGameProps{

}

export enum color{
    white = "w",
    black = "b"   
}

export function addPositions(positionColor: color, positions: ChessPositions, positionsMap: {[position: string]: string}): {[position: string]: string}{
    positions.pawns.forEach((pos) => positionsMap[pos] = positionColor === color.white ? "wp" : "bp");
    positions.rooks.forEach((pos) => positionsMap[pos] = positionColor === color.white ? "wr" : "br");
    positions.knights.forEach((pos) => positionsMap[pos] = positionColor === color.white ? "wn" : "bn");
    positions.bishops.forEach((pos) => positionsMap[pos] = positionColor === color.white ? "wb" : "bb");
    positions.queen.forEach((pos) => positionsMap[pos] = positionColor === color.white ? "wq" : "bq");
    positions.king.forEach((pos) => positionsMap[pos] = positionColor === color.white ? "wk" : "bk");
    return positionsMap;
}

export function ChessGame(props: ChessGameProps){
    var positionMap: {[position: string]: string} = {};
    const whitePositions = InitialPositions.White as ChessPositions;
    const blackPositions = InitialPositions.Black as ChessPositions;
    positionMap = addPositions(color.white, whitePositions, positionMap);
    positionMap = addPositions(color.black, blackPositions, positionMap);
    const [stateMap, makeBoardMove] = usePositionMap(positionMap);
    const [turn, setTurn] = useState(color.white);
    const makeMove = useCallback((start: string, end: string)=>{
        makeBoardMove(start, end);
        if(turn === color.white){
            setTurn(color.black)
        }
        else{
            setTurn(color.white);
        }
    }, [turn, makeBoardMove, setTurn])
    return(
        <div className="Chess">
            <ChessBoard toPlay={turn} positionsMap={stateMap} makeMove={makeMove} />
        </div>
    );
}