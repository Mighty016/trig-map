
export interface Point {
    x: number;
    y: number;
}

export interface DirectionAndDistance {
    distance : number;
    degree : number
}

export function radian(degree:number){ return degree * Math.PI /180;}
export function oppositeAngle(degree:number) { return (degree + 180) % 360}

export function calcDistance(refPoint:Point,secondPoint:Point):number {
    const xSquare = Math.pow(refPoint.x - secondPoint.x,2);
    const ySquare = Math.pow(refPoint.y - secondPoint.y,2)
    return Math.sqrt(xSquare + ySquare);
}

export function angleFromPoints(refPoint:Point,secondPoint:Point):number{
    const deltaX = secondPoint.x - refPoint.x;
    const deltaY = secondPoint.y - refPoint.y;

    return Math.atan2(deltaX,deltaY) * 180 / Math.PI + 180;
}


export function directionAndDistance(point:Point, dad:DirectionAndDistance) : Point {
    return {
      x:dad.distance * Math.sin(radian(dad.degree)) + point.x,
      y:dad.distance * Math.cos(radian(dad.degree)) + point.y,
    }
}

function AASgetAngleInTriangle(degreeAB:number,degreeAC:number,degreeBC:number){
  
    const MAX_ANGLE = 360
    const MAX_TRIANGLE_ANGLE = 180

    let angleA = Math.abs(degreeAB - degreeAC);
    angleA = (angleA > MAX_TRIANGLE_ANGLE) ? MAX_ANGLE - angleA : angleA; 

    let angleB = Math.abs(oppositeAngle(degreeAB) - degreeBC);
    angleB = (angleB > MAX_TRIANGLE_ANGLE) ? MAX_ANGLE - angleB : angleB;
    if (angleA + angleB >= 180) throw `AAS : more than 180 degrees`

    let angleC = MAX_TRIANGLE_ANGLE - angleA - angleB;

    return [angleA,angleB,angleC];
  }

function AASCalculateDistance(angleB:number,angleC:number,distanceAB:number){
    return distanceAB * Math.sin(radian(angleB)) / Math.sin(radian(angleC));
  }

export function twoAngleOneSide(degreeAB:number,degreeAC:number,degreeBC:number,refPoint:Point,secondpoint:Point){
    const angles = AASgetAngleInTriangle(degreeAB,degreeAC,degreeBC);
    const distance = AASCalculateDistance(angles[1],angles[2],calcDistance(refPoint,secondpoint));
    console.log("AASGetPoint",angles,distance);
    return directionAndDistance(refPoint,{
      degree:degreeAC,
      distance:distance,
    })
}
