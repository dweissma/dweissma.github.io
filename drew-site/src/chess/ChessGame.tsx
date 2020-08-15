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
    const [whiteCanCastleRight, setWCCR] = useState(true);//Tracks whether the king/rooks moved
    const [whiteCanCastleLeft, setWCCL] = useState(true);
    const [blackCanCastleRight, setBCCR] = useState(true);
    const [blackCanCastleLeft, setBCCL] = useState(true);
    const [enPassantCoord, setEnPassantCoord] = useState("");
    const makeMove = useCallback((start: string, end: string)=>{
        //En Passant
        if(stateMap[start].charAt(1) === "p" && Math.abs(parseInt(start.charAt(1)) - parseInt(end.charAt(1))) === 2){
            setEnPassantCoord(start.charAt(0) + (Math.max(parseInt(start.charAt(1)), parseInt(end.charAt(1))) - 1).toString());
        }
        else{
            setEnPassantCoord("");
        }
        //Castle
        if(start === "E8"){
            setBCCR(false);
            setBCCL(false);
        }
        else if(start === "A8"){
            setBCCL(false);
        }
        else if(start === "H8"){
            setBCCR(false);
        }
        else if(start === "E1"){
            setWCCR(false);
            setWCCL(false);
        }
        else if(start === "A1"){
            setWCCL(false);
        }
        else if(start === "H1"){
            setWCCR(false);
        }
        //Make the move
        if(stateMap[start].charAt(1) === "p" && enPassantCoord === end){
            if(stateMap[start].charAt(0) === "w"){
                makeBoardMove(undefined, undefined, [{start: end.charAt(0) + (parseInt(end.charAt(1)) - 1).toString(), end: undefined}, {start: start, end: end}]);
            }
            else{
                makeBoardMove(undefined, undefined, [{start: end.charAt(0) + (parseInt(end.charAt(1)) + 1).toString(), end: undefined }, {start: start, end: end}]);
            }
        }
        else if(start === "E8" && end === "G8"){
            makeBoardMove(undefined, undefined, [{start: "E8", end:"G8"}, {start: "H8", end: "F8"}])
        }
        else if(start === "E8" && end  === "C8"){
            makeBoardMove(undefined, undefined, [{start: "E8", end:"C8"}, {start: "A8", end: "D8"}])
        }
        else if((start === "E1" && end === "G1")){
            makeBoardMove(undefined, undefined, [{start: "E1", end:"G1"}, {start: "H1", end: "F1"}])
        }
        else if(start === "E1" && end === "C1"){
            makeBoardMove(undefined, undefined, [{start: "E1", end:"C1"}, {start: "A1", end: "D1"}])
        }
        else if(stateMap[start].charAt(0) === "w" && stateMap[start].charAt(1) === "p" && end.charAt(1) == "8"){
            makeBoardMove(start, end, undefined, "wq");
        }
        else if(stateMap[start].charAt(0) === "b" && stateMap[start].charAt(1) === "p" && end.charAt(1) == "1"){
            makeBoardMove(start, end, undefined, "bq");
        } 
        else{
            makeBoardMove(start, end);
        }
        //Flip the turn
        if(turn === color.white){
            setTurn(color.black)
        }
        else{
            setTurn(color.white);
        }
    }, [turn, makeBoardMove, setTurn])
    return(
        <div className="Chess">
            <ChessBoard toPlay={turn} positionsMap={stateMap} makeMove={makeMove} canCastleLeft={turn === color.white ? whiteCanCastleLeft : blackCanCastleRight} canCastleRight={turn === color.white ? whiteCanCastleRight : blackCanCastleRight} EPCoord={enPassantCoord}/>
        </div>
    );
}