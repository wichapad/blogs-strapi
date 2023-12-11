import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  try {
    const token = request.cookies.get("token");
    let res = await fetch(`${process.env.STRAPI_BASE_URL}/api/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });
    if (!res.ok) {
      throw new Error("Login fail");
    }
    const responseJSON = await res.json();
    const requstHeaders = new Headers(request.headers);
    requstHeaders.set("users", JSON.stringify({ email: responseJSON.email }));
    console.log("response", responseJSON);
    return NextResponse.next({
      request: {
        headers: requstHeaders,
      },
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/special-blog/:path*",
};
