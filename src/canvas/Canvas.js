import { useEffect, useRef, useState } from 'react'
import './canvas.css'

export default function Canvas({points,scale}) {
  const canvas = useRef();
  const [frame,setFrame] = useState([0,0])

  

  

  useEffect(()=>{
    canvas.current.width = canvas.current.offsetWidth;
    canvas.current.height = canvas.current.offsetHeight;
    clearCanvas();
    drawPoints();
    
  },[frame])

  function handleKeyDown({keyCode}){
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
    /** @type {CanvasRenderingContext2D} */
    return canvas.current.getContext('2d');
  }

  function drawPoints(){
    /** @type {CanvasRenderingContext2D} */

    const ctx = getContext();
    ctx.fillStyle = "black"
    points.forEach(element => {
      const offsets = [
        ctx.canvas.width / 2  + frame[0], ctx.canvas.height /2 + frame[1]
      ];

      ctx.fillRect(element.x + offsets[0], offsets[1] - element.y,10,10);
    });
    
  }

  function clearCanvas(){
    /** @type {CanvasRenderingContext2D} */

    const ctx = getContext();
    ctx.fillStyle = "gray"
    ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);

  }

  

  return (
    <div>
      <canvas id="canvas" ref={canvas} onKeyDown={handleKeyDown} tabIndex="0"></canvas>
    </div>
  )
}
