import React from 'react';
import { useEffect, useRef, useState } from 'react'
import Point from '../point_gen/Point';
import './canvas.css'

export default function Canvas(
  {points,scale,setFrameFunction} : 
  {points:Point[],scale:number,setFrameFunction:React.Dispatch<React.SetStateAction<(point: Point) => void>>}
) {

  const canvas = useRef<HTMLCanvasElement>(null);
  const [frame,setFrame] = useState([0,0])

  

  

  useEffect(()=>{
    console.log(points);
    if(canvas.current == null) return;
    canvas.current.width = canvas.current.offsetWidth;
    canvas.current.height = canvas.current.offsetHeight;
    setFrameFunction(()=>{
      return moveToPoint;
    })
    clearCanvas();
    
    drawPoints();
    drawFrameCoord();
    
  },[frame,points])

  function handleKeyDown({keyCode} :{keyCode:number}){
    const newFrame = [...frame];
    switch(keyCode){
      case 37:
        newFrame[0] += scale
        break;
      case 38:
        newFrame[1] += scale
        break;
      case 39:
        newFrame[0] -= scale
        break;
      case 40:
        newFrame[1] -= scale
        break;
  
      default:
        break;
    }
    // console.log(n)

    setFrame(newFrame);
  }
  

  function getContext(){
    
    return canvas.current?.getContext('2d');
  }

  function drawPoints(){

    const ctx = getContext();
    if(ctx == null || ctx == undefined) return
    ctx.fillStyle = "yellow"
    points.forEach(element => {
      const offsets = [
        ctx.canvas.width / 2  + frame[0], ctx.canvas.height /2 + frame[1]
      ];

      ctx.fillRect((element.x * 10 + offsets[0]) , (offsets[1] - element.y * 10),10,10);
    });
    
  }

  function clearCanvas(){

    const ctx = getContext();
    if(ctx == null || ctx == undefined) return
    ctx.fillStyle = "gray"
    ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);

  }

  function drawFrameCoord(){
    const ctx = getContext();
    if(ctx == null || ctx == undefined) return
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText(`frame(${-frame[0]/10},${-frame[1]/10})`,0,ctx.canvas.height -10);
  }

  function moveToPoint(point:Point){
    setFrame(prevFrame=>{
      const newFrame = [...prevFrame];
      const ctx = getContext();
      if(ctx == null || ctx == undefined) return prevFrame
      newFrame[0] = -(point.x * 10);
      newFrame[1] = point.y * 10;
      return newFrame;
    })
  }

  

  return (
    <div>
      <canvas id="canvas" ref={canvas} onKeyDown={handleKeyDown} tabIndex={0}></canvas>
    </div>
  )
}
