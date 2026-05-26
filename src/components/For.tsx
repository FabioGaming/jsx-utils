import React from "react";

export type ForProps<T> = {
  each: readonly T[];
  children: (item: T, index: number) => React.ReactNode;
};

export function For<T>(props: ForProps<T>) {
  return <>{props.each.map((item, i) => props.children(item, i))}</>;
}
