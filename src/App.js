import './App.css';
import Canvas from './canvas/Canvas'

function App() {
  let points = [
    {x:0,y:0},
    {x:10,y:10},
    {x:20,y:20},
    {x:30,y:30},

  ]


  function radian (degree){
    return degree * Math.PI /180
  }

  function getPointFromAngleAndDistance({degree,distance,offset}){
    return {
      x:distance * Math.sin(radian(degree)) + offset.x,
      y:distance * Math.cos(radian(degree)) + offset.y,
    }
  }

  function AASgetAngleInTriangle(degreeA,degreeB){

    const MAX_ANGLE = 360
    const MAX_TRIANGLE_ANGLE = 180
    let angleA = Math.abs(120 - degreeA);
    angleA = (angleA > MAX_TRIANGLE_ANGLE) ? MAX_ANGLE - angleA : angleA; 

    let angleB = Math.abs(300 - degreeB);
    angleB = (angleB > MAX_TRIANGLE_ANGLE) ? MAX_ANGLE - angleB : angleB;
    if (angleA + angleB >= 180) throw `ASS : more than 180 degrees`

    let angleC = MAX_TRIANGLE_ANGLE - angleA - angleB;

    return [angleA,angleB,angleC];
  }

  function AASgetDistance(angleB,angleC){
    return 10 * Math.sin(radian(angleB)) / Math.sin(radian(angleC));
  }


  return (
    <div className="App">
      <Canvas points={points} scale={10}></Canvas>
    </div>
  );
}

export default App;
