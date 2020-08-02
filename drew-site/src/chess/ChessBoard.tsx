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

function pawnMoves(row: number, column: string, positionsMap: {[position: string]: string}, moves: string[], piece: string): string[]{
    if("w" === piece.charAt(0)){
        if(row < 8 && positionsMap[column + (row + 1).toString()] == null){
            moves.push(column + (row + 1).toString())
        }
        if(row < 8 && column.charCodeAt(0) > 'A'.charCodeAt(0) && (positionsMap[previousChar(column) + (row + 1).toString()]?.charAt(0) == 'b' ?? false)){
            moves.push(previousChar(column) + (row + 1).toString())
        }
        if(row < 8 && column.charCodeAt(0) < 'H'.charCodeAt(0) && (positionsMap[nextChar(column) + (row + 1).toString()]?.charAt(0) == 'b' ?? false)){
            moves.push(nextChar(column) + (row + 1).toString())
        }
    }
    else if("b" === piece.charAt(0)){
        if(row > 1 && positionsMap[column + (row - 1).toString()] == null){
            moves.push(column + (row - 1).toString())
        }
        if(row > 1 && column.charCodeAt(0) > 'A'.charCodeAt(0) && (positionsMap[previousChar(column) + (row - 1).toString()]?.charAt(0) == 'w' ?? false)){
            moves.push(previousChar(column) + (row - 1).toString())
        }
        if(row < 8 && column.charCodeAt(0) < 'H'.charCodeAt(0) && (positionsMap[nextChar(column) + (row - 1).toString()]?.charAt(0) == 'w' ?? false)){
            moves.push(nextChar(column) + (row - 1).toString())
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
    for(var i = 1; i <= 8 - column.charCodeAt(0) - 64; i++){
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
    var upbreak = false;
    var downbreak = false;
    for(var i = row + 1; i <= 8; i++){
        var nextCoord = nNextChar(column, row-i) + i.toString()
        if(!isValidCoord(nextCoord)){
            upbreak = true;
        }
        if(!upbreak && positionsMap[nextCoord] == null){
            moves.push(nextCoord)
        }
        else if(!upbreak && positionsMap[nextCoord].charAt(0) !== piece.charAt(0)){
            moves.push(nextCoord)
            upbreak = true;
        }
        else{
            upbreak = true;
        }
        nextCoord = nPreviousChar(column, row-i) + i.toString();
        if(!isValidCoord(nextCoord)){
            downbreak = true;
        }
        if(!downbreak && positionsMap[nextCoord] == null){
            moves.push(nextCoord)
        }
        else if(!downbreak && positionsMap[nextCoord].charAt(0) !== piece.charAt(0)){
            moves.push(nextCoord)
            downbreak = true;
        }
        else{
            downbreak = true;
        }
    }
    for(var i = row - 1; i >= 1; i--){
        var nextCoord = nNextChar(column, row-i) + i.toString()
        if(!isValidCoord(nextCoord)){
            upbreak = true;
        }
        if(!upbreak && positionsMap[nextCoord] == null){
            moves.push(nextCoord)
        }
        else if(!upbreak && positionsMap[nextCoord].charAt(0) !== piece.charAt(0)){
            moves.push(nextCoord)
            upbreak = true;
        }
        else{
            upbreak = true;
        }
        nextCoord = nPreviousChar(column, row-i) + i.toString();
        if(!isValidCoord(nextCoord)){
            downbreak = true;
        }
        if(!downbreak && positionsMap[nextCoord] == null){
            moves.push(nextCoord)
        }
        else if(!downbreak && positionsMap[nextCoord].charAt(0) !== piece.charAt(0)){
            moves.push(nextCoord)
            downbreak = true;
        }
        else{
            downbreak = true;
        }
    }
    return moves;
}

function queenMoves(row: number, column: string, positionsMap: {[position: string]: string}, moves: string[], piece: string): string[]{
    moves = bishopMoves(row, column, positionsMap, moves, piece);
    moves = rookMoves(row, column, positionsMap, moves, piece);
    return moves;
}

function kingMoves(row: number, column: string, positionsMap: {[position: string]: string}, moves: string[], piece: string): string[]{
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

export function possibleMoves(positionsMap: {[position: string]: string}, position: string): string[] {
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
        moves = kingMoves(row, column, positionsMap, moves, piece);
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

export function ChessBoard(props: ChessBoardProps){
    const { positionsMap, toPlay, makeMove } = props;
    const [selected, setSelected] = useState("");
    const rows = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const moves = possibleMoves(positionsMap, selected);
    const moveHere = useCallback((coord: string)=>{
        makeMove(selected, coord);
    }, [makeMove, selected]);
    return(
        <div className="ChessBoard">
            {rows.reverse().map((row)=>
                <div className="row">
                    {columns.map((col)=>
                        positionsMap[col + row] == null ?
                        <ChessSquare coordinate={col+row} highlighted={moves.includes(col+row)} setSelected={setSelected} moveHere={moveHere} isSelectable={false} isMoveable={moves.includes(col+row)} selected={selected} key={col+row}/> :
                        <ChessSquare coordinate={col+row} highlighted={moves.includes(col+row) || selected === col+row} setSelected={setSelected}moveHere={moveHere} isSelectable={positionsMap[col+row]?.charAt(0) === toPlay} isMoveable={moves.includes(col+row)} selected={selected} key={col+row}>
                            {codeToImage[positionsMap[col+row]]}
                        </ChessSquare>
                    )}
                </div>
            )}
            <div className="attributions">
                Chess pieces by <a href="https://en.wikipedia.org/wiki/User:Cburnett" className="extiw" title="en:User:Cburnett">en:User:Cburnett</a> - <span className="int-own-work" lang="en">Own work</span><a href="//commons.wikimedia.org/wiki/File:Inkscape-un.svg" title="File:Inkscape-un.svg"></a>This W3C-unspecified <a href="https://en.wikipedia.org/wiki/Vector_images" className="extiw" title="w:Vector images">vector image</a> was created with <a href="https://en.wikipedia.org/wiki/Inkscape" className="extiw" title="w:Inkscape">Inkscape</a>., <a href="http://creativecommons.org/licenses/by-sa/3.0/" title="Creative Commons Attribution-Share Alike 3.0">CC BY-SA 3.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=1499810">Link</a>
            </div>
        </div>
    );
}
