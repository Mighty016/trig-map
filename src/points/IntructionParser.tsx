
export interface Instruction {
    task : string,
    from : string,
    to : string,
    value : number
}

export function parseInstruction(instruction: string) : Instruction{
    const fragment = instruction.split(" ");

    return {
        task : fragment[0].toLocaleLowerCase(),
        from : fragment[1].charAt(0),
        to : fragment[1].charAt(1),
        value : Number.parseFloat(fragment[2])
    }
}

export function runInstruction(instruction : Instruction){
   
}





