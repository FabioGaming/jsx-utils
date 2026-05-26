import React from "react";

export type MatchProps = {
  when: unknown;
  children: React.ReactNode;
};

export function Match(props: MatchProps) {
  return <>{props.when ? props.children : null}</>;
}
