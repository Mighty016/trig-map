import React, { useRef, useState } from 'react'
import Point from './Point'

export default function AASForm(
    {points,addPoints,removePoints,id,remove,moveToPoint} :
    {
        points:Point[],
        addPoints:Function,
        removePoints:Function,
        id:string,
        remove:Function,
        moveToPoint: (point: Point) => void
    } 
) {
    const [point,setPoint] = useState<Point>()
    const firstPoint = useRef<HTMLSelectElement>(null);
    const secondPoint = useRef<HTMLSelectElement>(null);
    const angleFirstToSecond = useRef<HTMLInputElement>(null);
    const angleFirstToThird = useRef<HTMLInputElement>(null);
    const angleSecondToThird = useRef<HTMLInputElement>(null);

    function removeSelf(){
        removePoints(point);
        remove(id);
    }

    function addPoint(){
        const pointA = points[Number.parseInt(firstPoint.current!.value)];
        const pointB = points[Number.parseInt(secondPoint.current!.value)]
        console.log(pointA,pointB)

        
        const newPoint = Point.AASGetPoint(
            Number.parseInt(angleFirstToSecond.current!.value),
            Number.parseInt(angleFirstToThird.current!.value),
            Number.parseInt(angleSecondToThird.current!.value),
            pointA,
            pointB
        )

        console.log(newPoint)
        setPoint(newPoint);
        addPoints(newPoint);
        
    }

    function editForm(){
        return(
            <>
                <button onClick={addPoint}>add</button>
                <select ref={firstPoint}>
                    {points.map((val,index)=><option value={index}>({val.x},{val.y})</option>)}
                </select>
                <select ref={secondPoint}>
                    {points.map((val,index)=><option value={index}>({val.x},{val.y})</option>)}
                </select>
                
                <input placeholder='compass angle First to Second' type="number" pattern='[0-9]' ref={angleFirstToSecond}/>
                <input placeholder='compass angle First to Third' type="number" pattern='[0-9]' ref={angleFirstToThird}/>
                <input placeholder='compass angle Second to Third' type="number" pattern='[0-9]' ref={angleSecondToThird}/>
                
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
