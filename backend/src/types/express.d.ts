import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        driverId?: string;
        riderId?: string;
        role?: "DRIVER" | "RIDER";
      };
    }
  }
}
