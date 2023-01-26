import React, { useRef, useState } from 'react'
import Point from './Point'

export default function AnchorForm(
    {id,remove,addPoints,removePoints,moveToPoint} : 
    {
        id : string,
        remove : Function,
        addPoints : Function ,
        removePoints : Function,
        moveToPoint: (point: Point) => void
    }
) {

    const [point,setPoint] = useState<Point>()
    const xcoord = useRef<HTMLInputElement>(null)
    const ycoord = useRef<HTMLInputElement>(null)
    
    function removeSelf(){
        removePoints(point);
        remove(id);
    }

    function addPoint(){

        const newPoint = new Point({
            x:Number.parseFloat(xcoord.current!.value),
            y:Number.parseFloat(ycoord.current!.value)
        })
        setPoint(newPoint);
        // console.log(setPoint);
        addPoints(newPoint);

    }

    function editForm(){
        return(
            <>
                <button onClick={addPoint}>add</button>
                <input placeholder='X' type="number" pattern='[0-9]' ref={xcoord} required/>
                <input placeholder='Y' type="number" pattern='[0-9]' ref={ycoord} required/>
                <button onClick={removeSelf}>X</button>
            </>

        )
    }

    function setMoveToPoint(){
        return moveToPoint(point!);
    }

    function showPoint(){
        return(
            <>
                <div> anchor at:({point!.x},{point!.y})</div>
                <button onClick={setMoveToPoint}>move to point</button>
                <button onClick={removeSelf}>X</button>
            </>
            
        )
    }

    function display(){
        if(point) return showPoint();
        return editForm()
    }

    

    return (
        <div className='AnchorForm' >
            {display()}
        </div>
    )
}
