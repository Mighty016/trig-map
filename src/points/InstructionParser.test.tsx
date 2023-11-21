import {parseInstruction,Instruction} from './IntructionParser' 

describe('test instruction parser',()=>{
    const testCases = [
        ["angle AB 120",{
            task : "angle",
            from : "A",
            to : "B",
            value : 120
        }],
        ["distance AB 12.1",{
            task : "distance",
            from : "A",
            to : "B",
            value : 12.1
        }],
        ["Angle AB 120",{
            task : "angle",
            from : "A",
            to : "B",
            value : 120
        }],
        ["Distance AB 12.1",{
            task : "distance",
            from : "A",
            to : "B",
            value : 12.1
        }],
        ["Angle 12 120",{
            task : "angle",
            from : "1",
            to : "2",
            value : 120
        }],
    ]

    testCases.forEach(val=>{
        const instruction = val[0] as string
        const target = val[1] as Instruction
        test(`test : ${instruction}`,()=>{
            const result = parseInstruction(instruction)
            expect(result).toEqual(target);
        })
    })
})