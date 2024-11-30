import mongoose from "mongoose";
import { NextResponse } from "next/server";
import slugify from "slugify";

import Account from "@/database/account.model";
import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/https-errors";
import dbConnect from "@/lib/mongoose";
import { SignInWithOAuthSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/types/global";

async function saveUser(
  session: mongoose.ClientSession,
  user: any,
  slugifiedUsername: string
) {
  const { name, email, image } = user;

  let existingUser = await User.findOne({ email }).session(session);

  if (!existingUser) {
    [existingUser] = await User.create(
      [{ name, username: slugifiedUsername, email, image }],
      { session }
    );
  } else {
    const updatedData: Partial<{ name: string; image: string }> = {};

    if (existingUser.name !== name) updatedData.name = name;
    if (existingUser.image !== image) updatedData.image = image;

    if (Object.keys(updatedData).length > 0) {
      await User.updateOne(
        { _id: existingUser._id },
        { $set: updatedData }
      ).session(session);
    }
  }

  return existingUser;
}

export async function POST(request: Request) {
  const { provider, providerAccountId, user } = await request.json();

  await dbConnect();

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const validateData = SignInWithOAuthSchema.safeParse({
      provider,
      providerAccountId,
      user,
    });

    if (!validateData.success) {
      throw new ValidationError(validateData.error.flatten().fieldErrors);
    }

    const { name, username, email, image } = user;

    const slugifiedUsername = slugify(username, {
      lower: true,
      strict: true,
      trim: true,
    });

    const existingUser = await saveUser(session, user, slugifiedUsername);

    const existingAccount = await Account.findOne({
      userId: existingUser._id,
      provider,
      providerAccountId,
    }).session(session);

    if (!existingAccount) {
      await Account.create(
        [
          {
            userId: existingUser._id,
            name,
            image,
            provider,
            providerAccountId,
          },
        ],
        { session }
      );
    }
    await session.commitTransaction();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    await session.abortTransaction();
    return handleError(error, "api") as APIErrorResponse;
  } finally {
    session.endSession();
  }
}
