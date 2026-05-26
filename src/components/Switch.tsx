import React from "react";
import { Match, MatchProps } from "./Match";

/**
 * Renders the children of the first `Match` child whose `when` prop is truthy.
 *
 * @example
 * ```tsx
 * <Switch>
 *   <Match when={status === "loading"}>Loading...</Match>
 *   <Match when={status === "success"}>Done!</Match>
 *   <Match when={status === "error"}>Something went wrong.</Match>
 * </Switch>
 * ```
 */
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
