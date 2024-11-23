import {NextResponse} from "next/server";
import {ZodError} from "zod";
import {RequestError, ValidationError} from "@/lib/https-errors";

export type ResponseType = 'api' | 'server';

const formatResponse = (
    responseType: ResponseType,
    status: number,
    message: string,
    errors?: Record<string, string[]> | undefined)=> {

    const responseContent = {
        success: false,
        error: {
            message,
            details: errors,
        }
    };

    return responseType === 'api' ? NextResponse.json(responseContent, {status}) : {status, ...responseContent};
}

// @ts-ignore
const handleError = (error: uknown, responseType: ResponseType) => {
    if(error instanceof RequestError) {
        return formatResponse(responseType,error.statusCode,error.message,error.errors);
    }

    if(error instanceof ZodError) {
        const validationErrors = new ValidationError(error.flatten().fieldErrors as Record<string, string[]>);

        return formatResponse(responseType,
            validationErrors.statusCode,
            validationErrors.message,
            validationErrors.errors);

    }

    if(error instanceof Error) {
        return formatResponse(responseType,500,"An unexpected error has occurred");
    }
}

export default handleError;