import { NextFunction, Request, Response } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";

export interface CustomRequest extends Request {
	userId: Jwt.JwtPayload | string | undefined;
}

/**
 *
 * @param req {Object} incomming request
 * @param res {Object} api response
 * @param next {Object} next function in the chain
 * @returns Response<any, Record<string, any>>
 */
export function verifyJWT(req: Request, res: Response, next: NextFunction) {
	const authHeader = res.header("Authorization");
	if (authHeader === undefined) return res.sendStatus(401); // No authorization header

	if (!req.header("Authorization")?.includes("Bearer "))
		// No Bearer schema in header
		return res.sendStatus(401);

	const jwtToken = req.header("Authorization")?.replace("Bearer ", "");
	if (jwtToken === undefined) return res.sendStatus(401); // No JWT in header

	const jwtSecret = process.env.JWT_SECRET as string;

	Jwt.verify(jwtToken, jwtSecret, (err, decoded) => {
		if (err) {
			return res.sendStatus(403);
		}
		(req as CustomRequest).userId = (decoded as JwtPayload).sub;
		next();
	});
}
