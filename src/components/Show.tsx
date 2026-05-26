import React from "react";

export type ShowProps<T = unknown> = {
  when: T;
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

/**
 * Conditionally renders children when `when` is truthy, otherwise renders `fallback`.
 *
 * @example
 * ```tsx
 * <Show when={user} fallback={<p>Loading...</p>}>
 *   <p>Welcome back!</p>
 * </Show>
 * ```
 */
export function Show(props: ShowProps) {
  return props.when ? <>{props.children}</> : <>{props.fallback}</>;
}
