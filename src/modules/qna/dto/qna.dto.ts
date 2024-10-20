import { IsString } from "class-validator";
import { userQues } from "src/constant/types";

export class QnaDto {
 
    _id: string;
    
    
    answers: userQues


}