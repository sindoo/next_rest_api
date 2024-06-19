import {getUserByEmail} from "@/utils/dbUtils/user";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prismaClient";

export const generateToken = async (email, password) => {
    try {
        const user = await getUserByEmail(email);

        if(!user || !(await bycrypt.compare(password, user.password))){
            throw new Error('Invalid credentials');
        }

        // ANOTHER WAY
        /*const token = jwt.sign({
            userId: user.id,
            iat: issueTime,
            exp: expirationTime
        });*/

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: '1hr'});

        await prisma.authToken.create({
            data: {
                token,
                userId: user.id,
            }
        });

        return token;
    }
    catch (error) {
        throw new Error(error.message);
    }
}