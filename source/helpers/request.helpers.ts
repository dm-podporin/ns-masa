import { ErrorCodes, ErrorMessages } from "../constants";
import { systemError } from "../entities";
import { ErrorHelper } from "./error.helpers";

export class RequestHelper {

    public static ParseNumericInput(input: string): number | systemError {
        let result: number = -1;

        if (isNaN(Number(input))) {
            return ErrorHelper.createError(ErrorCodes.NonNumericInput, ErrorMessages.NonNumericInput);
        }

        if (input !== null && input !== undefined) {
            result = parseInt(input);
        }
        else {
            return ErrorHelper.createError(ErrorCodes.InputParameterNotSupplied, ErrorMessages.InputParameterNotSupplied);
        }

        return result;
    }
}