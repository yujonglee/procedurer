export const id = "THIRD"; 
export const previous = ["FIRST"]; 

export default function current(): string | null {
    console.log(3);
    return "FOURTH";
}
