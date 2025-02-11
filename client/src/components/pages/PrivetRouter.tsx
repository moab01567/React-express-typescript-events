import React from "react";
import { LoadingIndicator } from "../loading/LoadingIndicator";
interface Props {
  fallBack: any;
  access: any;
  status: boolean | null;
}

export function PrivetRouter({ fallBack, access, status }: Props) {
  if (status === null) return <LoadingIndicator />;

  if (status) return access;

  return fallBack;
}
