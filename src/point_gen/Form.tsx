import React, { useState } from 'react'
import './Form.css'
import AnchorForm from './AnchorForm';
import ADForm from './ADForm';
import AASForm from './AASForm';
import Point from './Point';
import { v4 as uuid } from 'uuid';

export default function Form(
  {points,AddPoints,removePoints,moveToPoint} : 
  {points : Point[],AddPoints : Function,removePoints : Function, moveToPoint : (point: Point) => void}
) {

  

  const [forms,setForms] = useState<JSX.Element[]>([]) 

  // function radian (degree){
  //   return degree * Math.PI /180
  // }

  // function getPointFromAngleAndDistance({degree,distance,offset}){
  //   return {
  //     x:DISTANCE_SCALE * distance * Math.sin(radian(degree)) + offset.x,
  //     y:DISTANCE_SCALE * distance * Math.cos(radian(degree)) + offset.y,
  //   }
  // }

  // function oppositeAngle(degree){
  //   return (degree + 180) % 360
  // }

  // function AASgetAngleInTriangle(degreeAB,degreeAC,degreeBC){

  //   const MAX_ANGLE = 360
  //   const MAX_TRIANGLE_ANGLE = 180
  //   let angleA = Math.abs(degreeAB - degreeAC);
  //   angleA = (angleA > MAX_TRIANGLE_ANGLE) ? MAX_ANGLE - angleA : angleA; 

  //   let angleB = Math.abs(oppositeAngle(degreeAB) - degreeBC);
  //   angleB = (angleB > MAX_TRIANGLE_ANGLE) ? MAX_ANGLE - angleB : angleB;
  //   if (angleA + angleB >= 180) throw `AAS : more than 180 degrees`

  //   let angleC = MAX_TRIANGLE_ANGLE - angleA - angleB;

  //   return [angleA,angleB,angleC];
  // }

  // function AASCalculateDistance(angleB,angleC){
  //   return 10 * Math.sin(radian(angleB)) / Math.sin(radian(angleC));
  // }

  // function AASGetPoint(degreeAB,degreeAC,degreeBC,refPoint){
  //   const angles = AASgetAngleInTriangle(degreeAB,degreeAC,degreeBC);
  //   const distance = AASCalculateDistance(angles[1],angles[2]);
  //   return getPointFromAngleAndDistance({
  //     degree:degreeAC,
  //     distance:distance,
  //     offset:refPoint
  //   })
  // }

  function addAnchorForm(){
    
    setForms(val=>{
      const id = uuid();
      let updateForm = [...val];
      
      updateForm.push(
        <AnchorForm 
          key={id} 
          id={id} 
          remove={removeInput}
          addPoints={AddPoints}
          removePoints={removePoints}
          moveToPoint={moveToPoint}
          />
      )
      console.log(val)
      return updateForm;
    })
  }

  function addADForm(){
    console.log(points)
    if(!points || points.length === 0) return
    
    setForms(val=>{
      const id = uuid();
      let updateForm = [...val];
      
      updateForm.push(
        <ADForm 
          key={id} 
          id={id} 
          remove={removeInput}
          points={points}
          addPoints={AddPoints}
          removePoints={removePoints}
          moveToPoint={moveToPoint}
          />
      )
      console.log(updateForm)
      return updateForm;
    })
  }

  function addAASForm(){
    console.log("AAS:",points,points.length)
    if(!points || points.length < 2) return
    
    setForms(val=>{
      const id = uuid();
      let updateForm = [...val];
      
      updateForm.push(
        <AASForm 
          key={id} 
          id={id} 
          remove={removeInput}
          points={points}
          addPoints={AddPoints}
          removePoints={removePoints}
          moveToPoint={moveToPoint}
          />
      )
      console.log(updateForm)
      return updateForm;
    })
  }

  function removeInput(id:string){
    setForms(forms=>{
      return forms.filter(val=>val.props.id !== id);
    })
    
  }

  function AddButtons(){

    let buttons = [
      <button onClick={addAnchorForm} key="anchor">Add Anchor</button>
    ];

    if(points && points.length > 0) buttons.push(
      <button onClick={addADForm} key="angle and distance">Add by direction and angle</button>
    )

    if(points && points.length >= 2) buttons.push(
      <button onClick={addAASForm} key="AAS">Add by 2 angle and distance between 2 angle</button>
    )

    return(
      <div className='AddButtons' >
        {buttons}
      </div>
    )
    
  }

  return (
    <div className='Form'>
      {forms}
      {AddButtons()}
    </div>
  )
}



// TYPE OF POINTS
// 1. ANCHOR POINT
// 2. ANGLE AND DISTANCE
// 3. 2 ANGLE AND DISTANCE BETWEEN 2 POINTS