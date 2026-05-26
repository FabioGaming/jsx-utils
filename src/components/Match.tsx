import React from "react";

export type MatchProps = {
  when: unknown;
  children: React.ReactNode;
};

/**
 * Renders children only when `when` is truthy.
 *
 * @remarks
 * `Match` should only be used inside `Switch`.
 * For standalone conditional rendering, use `Show`.
 *
 * @example
 * ```tsx
 * <Match when={isAdmin}>
 *   <p>Admin panel</p>
 * </Match>
 * ```
 */
export function Match(props: MatchProps) {
  return <>{props.when ? props.children : null}</>;
}
