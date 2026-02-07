import { Request, Response, NextFunction } from "express";
import { Model } from "mongoose";

type TMiddleware = {
  req: Request;
  res: Response;
  next: NextFunction;
};

export type { TMiddleware };

export type DriverStatus = "INCOMPLETE" | "PROFILE_COMPLETED" | "ACTIVE";

export interface DriverDocument extends Document {
  email: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  status: DriverStatus;
  rating: number;
  isOnline: boolean;
  createdAt: Date;
  updatedAt: Date;
  isEmailVerified: boolean;
  otp?: string;
  otpExpiry?: Date;
}
export type DriverModel = Model<DriverDocument>;

export interface PublicDriver {
  id: string;
  firstName: string;
  lastName: string;
  status: DriverStatus;
  rating: number;
}

export interface RiderDocument extends Document {
  email: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
}
export type RideModel = Model<RiderDocument>;
