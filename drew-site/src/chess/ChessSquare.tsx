import React, { useCallback } from "react";


export interface ChessSquareProps{
    coordinate: string;
    children?: JSX.Element;
    highlighted?: boolean;
    setSelected: (coord: string) => void;
    moveHere: (coord: string) => void;
    selected: string;
    isSelectable: boolean;
    isMoveable: boolean; //Whether a piece can move to this square
}

export function ChessSquare(props: ChessSquareProps){
    const { coordinate, children, highlighted, setSelected, isSelectable, moveHere, selected, isMoveable} = props;
    const isHighlighted = highlighted ?? false;
    const color = ((coordinate.charCodeAt(0) - 64) + (parseInt(coordinate.charAt(1)))) % 2 == 0 ? "#784200" :"#ffddb3";
    const handleClick = useCallback(()=>{
        if(isSelectable){
            if(selected === coordinate){
                setSelected("");
            }
            else{
                setSelected(coordinate);
            }
        }
        else if(isMoveable){
            moveHere(coordinate);
        }
    }, [selected, isSelectable, isMoveable, coordinate, setSelected, moveHere]);
    
    return(
        <div className={isHighlighted ? "square-highlighted" : "square"} style={{backgroundColor: color}} onClick={handleClick}>
            { children }
        </div>
    );
}