import {
  ErrorHandler,
  InternalServerError,
  UnauthorizedHandler,
} from "@/lib/api-handler";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

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
      return ErrorHandler("Server ID missing", 400);
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: {
          not: profile.id,
        },
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id,
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    return InternalServerError("[SERVER_ID_LEAVE]", error);
  }
}
