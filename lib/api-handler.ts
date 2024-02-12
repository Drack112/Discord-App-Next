import { NextResponse } from "next/server";

export const InternalServerError = (
  string_path: string,
  error: unknown
): NextResponse<any> => {
  console.log(string_path, error);
  return new NextResponse("Internal Error", { status: 500 });
};

export const UnauthorizedHandler = () => {
  return new NextResponse("Unauthorized", { status: 401 });
};

export const ErrorHandler = (string_error: any, status: number) => {
  return new NextResponse(string_error, { status: status });
};
