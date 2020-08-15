import React, { useState, useCallback } from "react";
import { ChessPositions } from "./ChessPositions";
import { ReactComponent as BlackPawn } from './img/bpawn.svg';
import { ReactComponent as WhitePawn } from './img/wpawn.svg';
import { ReactComponent as BlackRook } from './img/brook.svg'
import { ReactComponent as WhiteRook } from './img/wrook.svg';
import { ReactComponent as BlackKnight } from './img/bknight.svg';
import { ReactComponent as WhiteKnight } from './img/wknight.svg'
import { ReactComponent as BlackBishop } from './img/bbishop.svg';
import { ReactComponent as WhiteBishop } from './img/wbishop.svg';
import { ReactComponent as BlackQueen } from './img/bqueen.svg';
import { ReactComponent as WhiteQueen } from './img/wqueen.svg';
import { ReactComponent as BlackKing } from './img/bking.svg';
import { ReactComponent as WhiteKing } from './img/wking.svg'

import { color } from "./ChessGame";
import { ChessSquare } from "./ChessSquare";


export interface ChessBoardProps{
    positionsMap: {[position: string]: string};
    toPlay: color;
    makeMove: (start: string, end: string) => void; 
    canCastleLeft: boolean;
    canCastleRight: boolean;
    EPCoord: string;
}

var codeToImage: {[piece: string] : JSX.Element } = {
    "wp": <WhitePawn />,
    "bp": <BlackPawn />,
    "wr": <WhiteRook />,
    "br": <BlackRook />,
    "wn": <WhiteKnight />,
    "bn": <BlackKnight />,
    "bb": <BlackBishop />,
    "wb": <WhiteBishop />,
    "wq": <WhiteQueen />,
    "bq": <BlackQueen />,
    "wk": <WhiteKing />,
    "bk": <BlackKing />
}

function previousChar(char: string): string{
    return String.fromCharCode(char.charCodeAt(0) - 1)
}

function nPreviousChar(char: string, n: number): string{
    return String.fromCharCode(char.charCodeAt(0) - n)
}


function nextChar(char: string): string{
    return String.fromCharCode(char.charCodeAt(0) + 1)
}

function nNextChar(char: string, n: number): string{
    return String.fromCharCode(char.charCodeAt(0) + n)
}

function pawnMoves(row: number, column: string, positionsMap: {[position: string]: string}, moves: string[], piece: string, EPCoord?: string): string[]{
    if("w" === piece.charAt(0)){
        if(row < 8 && positionsMap[column + (row + 1).toString()] == null){
            moves.push(column + (row + 1).toString())
        }
        if(row === 2 && positionsMap[column + (row + 2).toString()] == null){
            moves.push(column + (row + 2).toString())
        }
        if(row < 8 && column.charCodeAt(0) > 'A'.charCodeAt(0) && (positionsMap[previousChar(column) + (row + 1).toString()]?.charAt(0) == 'b' ?? false)){
            moves.push(previousChar(column) + (row + 1).toString())
        }
        if(row < 8 && column.charCodeAt(0) < 'H'.charCodeAt(0) && (positionsMap[nextChar(column) + (row + 1).toString()]?.charAt(0) == 'b' ?? false)){
            moves.push(nextChar(column) + (row + 1).toString())
        }
        if(EPCoord != null && (nextChar(column) === EPCoord.charAt(0) || (previousChar(column) === EPCoord.charAt(0))) && row === parseInt(EPCoord.charAt(1)) - 1)  {
            moves.push(EPCoord);
        }
    }
    else if("b" === piece.charAt(0)){
        if(row > 1 && positionsMap[column + (row - 1).toString()] == null){
            moves.push(column + (row - 1).toString())
        }
        if(row === 7 && positionsMap[column + (row - 2).toString()] == null){
            moves.push(column + (row - 2).toString())
        }
        if(row > 1 && column.charCodeAt(0) > 'A'.charCodeAt(0) && (positionsMap[previousChar(column) + (row - 1).toString()]?.charAt(0) == 'w' ?? false)){
            moves.push(previousChar(column) + (row - 1).toString())
        }
        if(row < 8 && column.charCodeAt(0) < 'H'.charCodeAt(0) && (positionsMap[nextChar(column) + (row - 1).toString()]?.charAt(0) == 'w' ?? false)){
            moves.push(nextChar(column) + (row - 1).toString())
        }
        if(EPCoord != null && (nextChar(column) === EPCoord.charAt(0) || (previousChar(column) === EPCoord.charAt(0))) && row === parseInt(EPCoord.charAt(1)) + 1)  {
            moves.push(EPCoord);
        }
    }
    return moves;
}

function rookMoves(row: number, column: string, positionsMap: {[position: string]: string}, moves: string[], piece: string): string[]{
    for(var i = row + 1; i <= 8; i++){
        if(positionsMap[column + i.toString()] == null){
            moves.push(column + i.toString())
        }
        else if(positionsMap[column + i.toString()].charAt(0) !== piece.charAt(0)){
            moves.push(column + i.toString())
            break;
        }
        else{
            break;
        }
    }
    for(var i = row - 1; i >= 1; i--){
        if(positionsMap[column + i.toString()] == null){
            moves.push(column + i.toString())
        }
        else if(positionsMap[column + i.toString()].charAt(0) !== piece.charAt(0)){
            moves.push(column + i.toString())
            break;
        }
        else{
            break;
        }
    }
    for(var i = 1; i <= 8 - (column.charCodeAt(0) - 64); i++){
        if(positionsMap[nNextChar(column, i) + row.toString()] == null){
            moves.push(nNextChar(column, i) + row.toString())
        }
        else if(positionsMap[nNextChar(column, i) + row.toString()].charAt(0) !== piece.charAt(0)){
            moves.push(nNextChar(column, i) + row.toString())
            break;
        }
        else{
            break;
        }
    }
    for(var i = 1;  i < column.charCodeAt(0) - 64; i++){
        if(positionsMap[nPreviousChar(column, i) + row.toString()] == null){
            moves.push(nPreviousChar(column, i) + row.toString())
        }
        else if(positionsMap[nPreviousChar(column, i) + row.toString()].charAt(0) !== piece.charAt(0)){
            moves.push(nPreviousChar(column, i) + row.toString())
            break;
        }
        else{
            break;
        }
    }
    return moves;
}

function knightMoves(row: number, column: string, positionsMap: {[position: string]: string}, moves: string[], piece: string): string[]{
    [2, -2].map((move1)=>{
        [1, -1].map((move2)=>{
            var newCoord = nNextChar(column, move1) + (row + move2).toString();
            if(isValidCoord(newCoord) && (positionsMap[newCoord] == null || positionsMap[newCoord]?.charAt(0) !== piece.charAt(0))){
                moves.push(newCoord);
            }
            newCoord = nNextChar(column, move2) + (row + move1).toString();
            if(isValidCoord(newCoord) && (positionsMap[newCoord] == null || positionsMap[newCoord]?.charAt(0) !== piece.charAt(0))){
                moves.push(newCoord);
            }
        })
    })
    return moves;
}

function bishopMoves(row: number, column: string, positionsMap: {[position: string]: string}, moves: string[], piece: string): string[]{
    var moves: string[] = [];
    [1, -1].map((rowAdd)=>
        [1, -1].map((colAdd) =>{
            for(var i = 1; i < 8; i++){
                var newCoord = nNextChar(column, colAdd * i) + (row + rowAdd * i);
                if(isValidCoord(newCoord) && positionsMap[newCoord] == null){
                    moves.push(newCoord);
                }
                else if(isValidCoord(newCoord) && positionsMap[newCoord]?.charAt(0) !== piece.charAt(0)){
                    moves.push(newCoord);
                    break;
                }
                else{
                    break
                }
            }
        }));
    return moves;
}

function queenMoves(row: number, column: string, positionsMap: {[position: string]: string}, moves: string[], piece: string): string[]{
    moves = bishopMoves(row, column, positionsMap, moves, piece);
    moves = rookMoves(row, column, positionsMap, moves, piece);
    return moves;
}

function kingMoves(row: number, column: string, positionsMap: {[position: string]: string}, moves: string[], piece: string, canCastleLeft: boolean, canCastleRight:boolean): string[]{
    [1, 0, -1].map((move1)=>{
        [1, 0, -1].map((move2)=>{
            if(move1 != 0 || move2 != 0){
                var newCoord = nNextChar(column, move1) + (row + move2).toString();
                if(isValidCoord(newCoord) && (positionsMap[newCoord] == null || positionsMap[newCoord]?.charAt(0) !== piece.charAt(0))){
                    if(!spaceIsChecked(positionsMap, newCoord, piece.charAt(0) as color)){
                        moves.push(newCoord);
                    }
                }
                newCoord = nNextChar(column, move2) + (row + move1).toString();
                if(isValidCoord(newCoord) && (positionsMap[newCoord] == null || positionsMap[newCoord]?.charAt(0) !== piece.charAt(0))){
                    if(!spaceIsChecked(positionsMap, newCoord, piece.charAt(0) as color)){
                        moves.push(newCoord);
                    }
                }
            }
        })
    })
    if(canCastleLeft && piece.charAt(0) === "w" && positionsMap["D1"] == null && !spaceIsChecked(positionsMap, "D1", color.white) && positionsMap["C1"] == null && positionsMap["B1"] == null){
        moves.push("C1");
    }
    else if(canCastleRight && piece.charAt(0) === "w" && positionsMap["F1"] == null && !spaceIsChecked(positionsMap, "F1", color.white) && positionsMap["G1"] == null){
        moves.push("G1")
    }
    else if(canCastleLeft && piece.charAt(0) === "b" && positionsMap["D8"] == null && !spaceIsChecked(positionsMap, "D8", color.black) && positionsMap["C8"] == null && positionsMap["B8"] == null){
        moves.push("C8");
    }
    else if(canCastleLeft && piece.charAt(0) === "b" && positionsMap["F8"] == null && !spaceIsChecked(positionsMap, "F8", color.black) && positionsMap["G8"] == null){
        moves.push("G8")
    }
    return moves;
}

function kingMovesNoChecks(row: number, column: string, positionsMap: {[position: string]: string}, moves: string[], piece: string): string[]{
    [1, 0, -1].map((move1)=>{
        [1, 0, -1].map((move2)=>{
            if(move1 != 0 || move2 != 0){
                var newCoord = nNextChar(column, move1) + (row + move2).toString();
                if(isValidCoord(newCoord) && (positionsMap[newCoord] == null || positionsMap[newCoord]?.charAt(0) !== piece.charAt(0))){
                    moves.push(newCoord);
                }
                newCoord = nNextChar(column, move2) + (row + move1).toString();
                if(isValidCoord(newCoord) && (positionsMap[newCoord] == null || positionsMap[newCoord]?.charAt(0) !== piece.charAt(0))){
                    moves.push(newCoord);
                }
            }
        })
    })
    return moves;
}

export function possibleMoves(positionsMap: {[position: string]: string}, position: string, canCastleLeft?: boolean, canCastleRight?: boolean, EPCoord?: string): string[] {
    if(position.length != 2 || positionsMap[position] == null){
        return [];
    }
    const cCCR = canCastleRight ?? false;
    const cCCL = canCastleLeft ?? false; 
    const piece = positionsMap[position];
    const row = parseInt(position.charAt(1));
    const column = position.charAt(0);
    var moves: string[] = [];
    if("p" === piece.charAt(1)){
        moves = pawnMoves(row, column, positionsMap, moves, piece, EPCoord);
    }
    else if("r" === piece.charAt(1)){
        moves = rookMoves(row, column, positionsMap, moves, piece);
    }
    else if("n" == piece.charAt(1)){
        moves = knightMoves(row, column, positionsMap, moves, piece);
    }
    else if("b" == piece.charAt(1)){
        moves = bishopMoves(row, column, positionsMap, moves, piece);
    }
    else if("q" == piece.charAt(1)){
        moves = queenMoves(row, column, positionsMap, moves, piece);
    }
    else if("k" == piece.charAt(1)){
        moves = kingMoves(row, column, positionsMap, moves, piece, cCCL, cCCR);
    }
    return moves;
}

export function possibleMovesNoChecks(positionsMap: {[position: string]: string}, position: string): string[] {
    if(position.length != 2 || positionsMap[position] == null){
        return [];
    }
    const piece = positionsMap[position];
    const row = parseInt(position.charAt(1));
    const column = position.charAt(0);
    var moves: string[] = [];
    if("p" === piece.charAt(1)){
        moves = pawnMoves(row, column, positionsMap, moves, piece);
    }
    else if("r" === piece.charAt(1)){
        moves = rookMoves(row, column, positionsMap, moves, piece);
    }
    else if("n" == piece.charAt(1)){
        moves = knightMoves(row, column, positionsMap, moves, piece);
    }
    else if("b" == piece.charAt(1)){
        moves = bishopMoves(row, column, positionsMap, moves, piece);
    }
    else if("q" == piece.charAt(1)){
        moves = queenMoves(row, column, positionsMap, moves, piece);
    }
    else if("k" == piece.charAt(1)){
        moves = kingMovesNoChecks(row, column, positionsMap, moves, piece);
    }
    return moves;
}

export function isValidCoord(coord: string): boolean{
    if(coord.length != 2){
        return false;
    }
    if(coord.charCodeAt(0) < 'A'.charCodeAt(0) || coord.charCodeAt(0) > 'H'.charCodeAt(0)){
        return false;
    }
    if(isNaN((parseInt(coord.charAt(1)))) || parseInt(coord.charAt(1)) < 1 || parseInt(coord.charAt(1)) > 8){
        return false;
    }
    return true;
}

export function spaceIsChecked(positionsMap: {[position: string]: string}, coordinate: string, kingColor :color): boolean{
    var positionsMapCopy: {[position: string]: string} = {};
    for(const[key, value] of Object.entries(positionsMap)){
        if(value === kingColor + "k"){
            positionsMapCopy[coordinate] = value;
        }
        else if(positionsMapCopy[key] == null){
            positionsMapCopy[key] = value;
        }
    }
    for(const[key, value] of Object.entries(positionsMapCopy)){
        if(value.charAt(0) !== kingColor){
            if(possibleMovesNoChecks(positionsMapCopy, key).includes(coordinate)){
                return true;
            }
        }
    }
    return false;
}

export function isInCheck(positionsMap: {[position: string]: string}, kingColor: color): boolean{
    for(const[key, value] of Object.entries(positionsMap)){
        if(value === kingColor + "k"){
            return spaceIsChecked(positionsMap, key, kingColor);
        }
    }
    return false;
}

export function tryMove(positionsMap: {[position: string]: string}, start: string, end: string){
    var positionsMapCopy: {[position: string]: string} = {};
    for(const[key, value] of Object.entries(positionsMap)){
        positionsMapCopy[key] = value;
    }
    if(start === "E8" && end === "G8"){
        positionsMapCopy["G8"] = positionsMapCopy["E8"];
        delete positionsMapCopy["E8"];
        positionsMapCopy["F8"] = positionsMapCopy["H8"];
        delete positionsMapCopy["H8"];
    }
    else if(start === "E8" && end  === "C8"){
        positionsMapCopy["C8"] = positionsMapCopy["E8"];
        delete positionsMapCopy["E8"];
        positionsMapCopy["D8"] = positionsMapCopy["A8"];
        delete positionsMapCopy["A8"];
    }
    else if((start === "E1" && end === "G1")){
        positionsMapCopy["G1"] = positionsMapCopy["E1"];
        delete positionsMapCopy["E1"];
        positionsMapCopy["F1"] = positionsMapCopy["H1"];
        delete positionsMapCopy["H1"];
    }
    else if(start === "E1" && end === "C1"){
        positionsMapCopy["C1"] = positionsMapCopy["E1"];
        delete positionsMapCopy["E1"];
        positionsMapCopy["D1"] = positionsMapCopy["A1"];
        delete positionsMapCopy["A1"];
    }
    else{
        positionsMapCopy[end] = positionsMapCopy[start];
        delete positionsMapCopy[start];
    }
    return positionsMapCopy;
}

export function isInCheckMate(positionsMap: {[position: string]: string}, kingColor: color): boolean{
    if(isInCheck(positionsMap, kingColor)){
        for(const[key, value] of Object.entries(positionsMap)){
            if(value.charAt(0) === kingColor){
                const moves = possibleMoves(positionsMap, key);
                for(var i = 0; i < moves.length; i++){
                    if(!isInCheck(tryMove(positionsMap, key, moves[i]), kingColor)){
                        return false;
                    }
                }
            }
        }
        return true;
    }
    else{
        return false
    }
}

export function isInStaleMate(positionsMap: {[position: string]: string}, kingColor: color): boolean{
    if(!isInCheck(positionsMap, kingColor)){
        for(const[key, value] of Object.entries(positionsMap)){
            if(value.charAt(0) === kingColor){
                const moves = possibleMoves(positionsMap, key);
                for(var i = 0; i < moves.length; i++){
                    if(!isInCheck(tryMove(positionsMap, key, moves[i]), kingColor)){
                        return false;
                    }
                }
            }
        }
        return true;
    }
    else{
        return false
    }
}

export function ChessBoard(props: ChessBoardProps){
    const { positionsMap, toPlay, makeMove, canCastleLeft, canCastleRight, EPCoord } = props;
    const [selected, setSelected] = useState("");
    var checked = isInCheck(positionsMap, toPlay);
    var checkmated = false;
    var stalemated = false;
    if(checked){
        checkmated = isInCheckMate(positionsMap, toPlay);
    }
    else{
        stalemated = isInStaleMate(positionsMap, toPlay);
    }
    const rows = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    var moves: string[];
    if(checkmated){
        moves = [];
    }
    else{
        moves = possibleMoves(positionsMap, selected, canCastleLeft, canCastleRight, EPCoord).filter((moves) => !isInCheck(tryMove(positionsMap, selected, moves), toPlay));
    }
    const moveHere = useCallback((coord: string)=>{
        makeMove(selected, coord);
    }, [makeMove, selected]);
    return(
        <div className="ChessBoard">
            {rows.reverse().map((row)=>
                <div className="row" key={row}>
                    {columns.map((col)=>
                        positionsMap[col + row] == null ?
                        <ChessSquare coordinate={col+row} highlighted={moves.includes(col+row)} setSelected={setSelected} moveHere={moveHere} isSelectable={false} isMoveable={moves.includes(col+row)} selected={selected} key={col+row}/> :
                        <ChessSquare coordinate={col+row} highlighted={moves.includes(col+row) || selected === col+row} setSelected={setSelected}moveHere={moveHere} isSelectable={positionsMap[col+row]?.charAt(0) === toPlay} isMoveable={moves.includes(col+row)} selected={selected} key={col+row}>
                            {codeToImage[positionsMap[col+row]]}
                        </ChessSquare>
                    )}
                </div>
            )}
            <div className="outcome">{checkmated ? <h3>Checkmate {toPlay === color.white ? "Black wins" : "White wins"}</h3> : stalemated ? <h3>Stalemate</h3> : <div />}</div>
            <div className="attributions">
                Chess pieces by <a href="https://en.wikipedia.org/wiki/User:Cburnett" className="extiw" title="en:User:Cburnett">en:User:Cburnett</a> - <span className="int-own-work" lang="en">Own work</span><a href="//commons.wikimedia.org/wiki/File:Inkscape-un.svg" title="File:Inkscape-un.svg"></a>This W3C-unspecified <a href="https://en.wikipedia.org/wiki/Vector_images" className="extiw" title="w:Vector images">vector image</a> was created with <a href="https://en.wikipedia.org/wiki/Inkscape" className="extiw" title="w:Inkscape">Inkscape</a>., <a href="http://creativecommons.org/licenses/by-sa/3.0/" title="Creative Commons Attribution-Share Alike 3.0">CC BY-SA 3.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=1499810">Link</a>
            </div>
        </div>
    );
}
