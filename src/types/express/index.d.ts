import { TokenPayload } from "../../utils/verifyToken";

declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload;
        }
    }
}

export { };