import {validationResult} from 'express-validator';
import createHttpError from "http-errors"
const {badRequest} = createHttpError;
export function CheckValidation(rules){
    return [rules, doValidation]
}

function doValidation(request, responce, next){
    const result = validationResult(request);
    if(result.isEmpty()){
        return next();
    }

    const errObj = new badRequest('womp womp');
    

    // const errObj = {
    //     errors: result.array(),
    //     message: 'input invaild'
    // }
    return next(errObj);
}
