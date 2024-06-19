import {NextResponse} from "next/server";
import {generateToken} from "@/utils/tokenUtils/getToken";
//import Buffer from "prisma";

export const GET = async (request) => {
    try {
        const auth = request.headers.get('Authorization');
        const base64EncodedHeader = JSON.stringify(auth, null, 2);
        const bas64Creds = base64EncodedHeader.split(' ')[1];
        const creditailsBuffer = Buffer.from(bas64Creds, 'base64');
        const decodeHeader = creditailsBuffer.toString('utf-8');
        const [email, password] = decodeHeader.split(':');

        const tokenResult = await generateToken(email, password);
        return NextResponse.json({"Token": tokenResult}, {status: 200});

    }
    catch (error) {
        return NextResponse.json({"error": error.message}, {status: 500})
    }
}