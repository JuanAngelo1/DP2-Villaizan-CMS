export { auth as middleware } from "@web/auth";

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}