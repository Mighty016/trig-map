import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Canvas from './canvas/Canvas'
import Form from './point_gen/Form'
import Point from './point_gen/Point';

function App() {

  // const [points,setPoints] = useState([
  //   {x:0,y:0},
  // ])

  const DISTANCE_SCALE = 10

  const [points,setPoints] = useState<Point[]>([])
  // const [frame,setFrame] = useState<number[]>([0,0])
  const [updateFrameFunc,setUpdateFrameFunc] = useState(
    ()=>function(point:Point){}
  )

  // const points = useMemo(()=>{
  //   let newPoints = [{x:0,y:0}]

  //   newPoints.push(getPointFromAngleAndDistance({
  //     degree:120,
  //     distance:12.1,
  //     offset:newPoints[0]
  //   }));

  //   newPoints.push(AASGetPoint(120,50,20,newPoints[0]));
  //   newPoints.push(AASGetPoint(120,85,66,newPoints[0]));

  //   console.log(newPoints);

  //   return newPoints;


  // })
  
  function addPoints(point:Point){
    setPoints(prevVal=>{
      let temp = [...prevVal];
      temp.push(point);
      return temp;
    })
  }
  function removePoints(point:Point){

    console.log(setPoints);
    setPoints(prevVal=>{
      let temp = [...prevVal];
      console.log(temp,point);
      return temp.filter(val=>val !== point);
    })
  }

  


  return (
    <div className="App">
      
      {/* <Form 
        AddPoints={addPoints} 
        removePoints={removePoints} 
        points={points} 
        moveToPoint={updateFrameFunc}
      /> */}
      <Canvas 
        points={points} 
        scale={DISTANCE_SCALE} 
        setFrameFunction={setUpdateFrameFunc}
      />
    </div>
  );
}

export default App;
