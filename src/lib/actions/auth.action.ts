"use server";

import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import { signIn } from "@/auth";
import Account from "@/database/account.model";
import User from "@/database/user.model";
import { AuthCredentials } from "@/types/action";
import { ActionResponse, ErrorResponse } from "@/types/global";

import action from "../handlers/action";
import handleError from "../handlers/error";
import { SignUpSchema } from "../validation";

export async function SignUpWithCredentials(
  params: AuthCredentials
): Promise<ActionResponse> {
  const validationResult = await action({ params, schema: SignUpSchema });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { name, username, email, password } = validationResult.params!;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await checkUserExists(email, session, username);
    const hashedPassword = await bcrypt.hash(password, 12);
    const [newUser] = await User.create([{ username, name, email }], {
      session,
    });

    await Account.create(
      [
        {
          userId: newUser._id,
          name,
          provider: "credentials",
          providerAccountId: email,
          password: hashedPassword,
        },
      ],
      { session }
    );

    session.commitTransaction();

    await signIn("credentials", { email, password, redirect: false });

    return { success: true };
  } catch (error) {
    session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    session.endSession();
  }
}
async function checkUserExists(
  email: any,
  session: mongoose.mongo.ClientSession,
  username: any
) {
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  }).session(session);

  if (existingUser) {
    throw new Error(
      existingUser.email === email
        ? "User already exists"
        : "Username already exists"
    );
  }
}