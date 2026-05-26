import React from "react";

export type ForProps<T> = {
  each: readonly T[];
  children: (item: T, index: number) => React.ReactNode;
};

/**
 * Renders a list by mapping each item to JSX with a render function.
 *
 * @example
 * ```tsx
 * <For each={users}>
 *   {(user, index) => (
 *     <li key={user.id}>
 *       {index + 1}. {user.name}
 *     </li>
 *   )}
 * </For>
 * ```
 */
export function For<T>(props: ForProps<T>) {
  return <>{props.each.map((item, i) => props.children(item, i))}</>;
}
