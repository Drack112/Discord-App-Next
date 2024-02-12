import {
  ErrorHandler,
  InternalServerError,
  UnauthorizedHandler,
} from "@/lib/api-handler";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return UnauthorizedHandler();
    }

    if (!params.serverId) {
      return ErrorHandler("Server ID Missing", 400);
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    return InternalServerError("[SERVER_ID]", error);
  }
}
