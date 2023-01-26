import React, { useRef, useState } from 'react'
import Point from './Point'

export default function ADForm(
    {points,addPoints,removePoints,id,remove,moveToPoint} :
    {
        points : Point[],
        addPoints : Function,
        removePoints:Function,
        id:String,
        remove:Function,
        moveToPoint: (point: Point) => void
    }
) {

    const [point,setPoint] = useState<Point>()
    const angle = useRef<HTMLInputElement>(null)
    const distance = useRef<HTMLInputElement>(null)
    const refPoint = useRef<HTMLSelectElement>(null)
    
    function removeSelf(){
        removePoints(point);
        remove(id);
    }

    function addPoint(){
        console.log(angle.current!.value,distance.current!.value,JSON.parse(refPoint.current!.value))
        const newPoint = Point.directionAndDistance({
            degree : Number.parseFloat(angle.current!.value),
            distance : Number.parseFloat(distance.current!.value),
            point : points[Number.parseInt(refPoint.current!.value)],
        })

        console.log(newPoint)
        setPoint(newPoint);
        addPoints(newPoint);
        
    }

    function editForm(){
        return(
            <>
                <button onClick={addPoint}>add</button>
                <select ref={refPoint}>
                    {points.map((val,index)=><option value={index}>({val.x},{val.y})</option>)}
                </select>
                <input placeholder='compass degree' type="number" pattern='[0-9]' ref={angle}/>
                <input placeholder='distance to next point' type="number" pattern='[0-9]' ref={distance}/>
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
                <div> Added Point : ({point!.x},{point!.y})</div>
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
