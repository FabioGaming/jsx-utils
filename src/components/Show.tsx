import React from "react";

export type ShowProps<T = unknown> = {
  when: T;
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

export function Show(props: ShowProps) {
  return props.when ? <>{props.children}</> : <>{props.fallback}</>;
}
