import { NextFunction, Request, Response } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";

export interface CustomRequest extends Request {
	userId: Jwt.JwtPayload | string | undefined;
}

export function verifyJWT(req: Request, res: Response, next: NextFunction) {
	const authHeader = res.header("Authorization");
	if (authHeader === undefined) return res.sendStatus(401); // No authorization header

	const jwtToken = req.header("Authorization")?.replace("Bearer ", "");
	if (jwtToken === undefined) return res.sendStatus(401); // No JWT in header

	const jwtSecret =
		process.env.JWT_SECRET || "62b2f109a901836debe44841443c7604";

	Jwt.verify(jwtToken, jwtSecret, (err, decoded) => {
		if (err) {
			return res.sendStatus(403);
		}
		(req as CustomRequest).userId = (decoded as JwtPayload).sub;
		next();
	});
}
