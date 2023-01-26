export default class Point {
    
    x: number;
    y: number;
    constructor({x,y} : {x:number,y:number}){
      this.x = x;
      this.y = y;
    }
  
    static #radian (degree : number){
      return degree * Math.PI /180
    }
  
    static #oppositeAngle(degree : number){
      return (degree + 180) % 360
    }
    
    static directionAndDistance(
      {point,degree,distance}: 
      {point:Point,degree:number,distance:number}
    ){
  
      return new Point({
        x:distance * Math.sin(Point.#radian(degree)) + point.x,
        y:distance * Math.cos(Point.#radian(degree)) + point.y,
      })
    }
  
    static #AASgetAngleInTriangle(degreeAB:number,degreeAC:number,degreeBC:number){
  
      const MAX_ANGLE = 360
      const MAX_TRIANGLE_ANGLE = 180
      let angleA = Math.abs(degreeAB - degreeAC);
      angleA = (angleA > MAX_TRIANGLE_ANGLE) ? MAX_ANGLE - angleA : angleA; 
  
      let angleB = Math.abs(Point.#oppositeAngle(degreeAB) - degreeBC);
      angleB = (angleB > MAX_TRIANGLE_ANGLE) ? MAX_ANGLE - angleB : angleB;
      if (angleA + angleB >= 180) throw `AAS : more than 180 degrees`
  
      let angleC = MAX_TRIANGLE_ANGLE - angleA - angleB;
  
      return [angleA,angleB,angleC];
    }
  
    static #AASCalculateDistance(angleB:number,angleC:number,distanceAB:number){
      return distanceAB * Math.sin(Point.#radian(angleB)) / Math.sin(Point.#radian(angleC));
    }
  
    static AASGetPoint(degreeAB:number,degreeAC:number,degreeBC:number,refPoint:Point,secondpoint:Point){
      const angles = Point.#AASgetAngleInTriangle(degreeAB,degreeAC,degreeBC);
      const distance = Point.#AASCalculateDistance(angles[1],angles[2],Point.distance(refPoint,secondpoint));
      console.log("AASGetPoint",angles,distance);
      return Point.directionAndDistance({
        degree:degreeAC,
        distance:distance,
        point:refPoint
      })
    }

    static distance(pointA:Point,pointB:Point) {
      return Math.sqrt(Math.pow(pointA.x - pointB.x,2) + Math.pow(pointA.y - pointB.y,2))
    }
  }
  