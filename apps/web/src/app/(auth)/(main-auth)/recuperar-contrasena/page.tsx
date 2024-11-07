"use client";

import { useSearchParams } from "next/navigation";
import ChangePasswordView from "./_components/ChangePasswordView";
import RequestView from "./_components/RequestView";

function PasswordChangePage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  if (token && id) return <ChangePasswordView token={token} id={id} />;

  return <RequestView />;
}
export default PasswordChangePage;
