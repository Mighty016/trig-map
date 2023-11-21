import {radian,oppositeAngle,calcDistance,Point} from './Point';

function floatError(target:number,result:number){
    return Math.abs(target - result);
}

test('radian of 180 degrees' ,()=>{
    const result = radian(180);
    const error = floatError(Math.PI,result);

    expect(error).toBeLessThan(0.001)
})

describe('test opposite angle',()=>{
    test('30 degrees',()=>{
        const result = oppositeAngle(30);
        expect(result).toBe(210);
    });
    test('210 degrees',()=>{
        const result = oppositeAngle(210);
        expect(result).toBe(30);
    });
})



describe('test distance of 2 points' ,()=>{

    const testCases = [
        [{x:0,y:0},{x:12,y:12},16.9705]
    ]

    testCases.forEach(val=>{
        const refPoint = val[0] as Point;
        const secondPoint = val[1] as Point;
        const target = val[2] as number;
        test(`test (${refPoint.x},${refPoint.y}) to (${secondPoint.x},${secondPoint.y})`,()=>{
            const result = calcDistance(refPoint,secondPoint);
            const error = floatError(target,result);
    
            expect(error).toBeLessThan(0.001)
            
        })  
    })
    
    
})
