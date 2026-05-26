import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { For } from "../src/components/For";

describe("For", () => {
  test("renders items", () => {
    render(
      <For each={["a", "b"]}>{(item) => <div key={item}>{item}</div>}</For>
    );

    expect(screen.getByText("a")).toBeTruthy();
    expect(screen.getByText("b")).toBeTruthy();
  });
});
