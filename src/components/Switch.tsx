import React from "react";
import { Match, MatchProps } from "./Match";

export function Switch(props: { children: React.ReactNode }) {
  const children = React.Children.toArray(props.children);

  for (const child of children) {
    if (!React.isValidElement(child)) continue;
    if (child.type !== Match) continue;
    const matchProps = child.props as MatchProps;
    if (matchProps.when) {
      return <>{matchProps.children}</>;
    }
  }

  return null;
}
