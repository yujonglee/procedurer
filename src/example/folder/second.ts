export const id = "SECOND"; 
export const previous = ["FIRST"]; 

export default function current(): string | null {
    console.log(2);
    return "FOURTH";
}
