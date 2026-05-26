import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { Show } from "../src/components/Show";

describe("Show", () => {
  test("renders children when true", () => {
    render(
      <Show when={true} fallback="no">
        test
      </Show>
    );

    expect(screen.queryByText("test")).toBeInTheDocument();
    expect(screen.queryByText("no")).not.toBeInTheDocument();
  });

  test("does not renders children when false", () => {
    render(<Show when={false}>test</Show>);

    expect(screen.queryByText("test")).not.toBeInTheDocument();
  });

  test("renders fallback when condition is falsy and fallback is provided", () => {
    render(
      <Show when={false} fallback={"fallbackText"}>
        test
      </Show>
    );

    expect(screen.queryByText("test")).not.toBeInTheDocument();
    expect(screen.queryByText("fallbackText")).toBeInTheDocument();
  });
});
// test commit
