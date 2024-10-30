"use client";

import { Response } from "@web/types";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button, buttonVariants } from "@repo/ui/components/button";
import { Separator } from "@repo/ui/components/separator";
import ErrorMessage from "../_components/ErrorMessage";
import InputWithLabel from "../_components/InputWithLabel";
import LogoBackHome from "../_components/LogoBackHome";
import SuccessMessage from "../_components/SuccessMessage";
import ChangePasswordView from "./_components/ChangePasswordView";
import RequestView from "./_components/RequestView";

function PasswordChangePage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  if (token && id) return <ChangePasswordView token={token} id={id}/>;

  return <RequestView />;
}
export default PasswordChangePage;
