import z from "zod";
import {createUser} from "@/utils/dbUtils/user";
import {NextResponse} from "next/server";

const createUserSchema = z.object({
    email: z.string().email(),
    username: z.string(),
    password: z.string(),
}).strict();

function validateUserSchema (data) {
    try {
        return createUserSchema.parse(data)
    }
    catch (error){
        if(error.issues && error.issues.length > 0){
            const validationErrors = error.issues.map((issue) => ({
                path: issue.path.join('.'),
                message: issue.message
            }));
            throw new Error(JSON.stringify(validationErrors));
        }
        else {
            throw new Error('Invalid Schema.');
        }

    }
}
export const POST = async (resquest) => {
    try {
        const json = await resquest.json();
        const validatedUser = validateUserSchema(json);
        const createUserResult = await createUser(validatedUser);
        return NextResponse.json(createUserResult, {status: 200});
    }
    catch (error) {
        let errorMessage;
        try {
            errorMessage = JSON.parse(error.message);
        }
        catch (parseError) {
            errorMessage = error.message;
        }
        return NextResponse.json({error: errorMessage}, {status: 500})
    }
}