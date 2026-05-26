import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
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

  test("does not render children when false", () => {
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

  test("renders children with truthy values (non-boolean)", () => {
    render(
      <Show when="hello" fallback="fallback">
        children
      </Show>
    );

    expect(screen.queryByText("children")).toBeInTheDocument();
    expect(screen.queryByText("fallback")).not.toBeInTheDocument();
  });

  test("renders fallback with falsy values (0)", () => {
    render(
      <Show when={0} fallback="zero value">
        children
      </Show>
    );

    expect(screen.queryByText("children")).not.toBeInTheDocument();
    expect(screen.queryByText("zero value")).toBeInTheDocument();
  });

  test("renders fallback with empty string", () => {
    render(
      <Show when="" fallback="empty">
        children
      </Show>
    );

    expect(screen.queryByText("children")).not.toBeInTheDocument();
    expect(screen.queryByText("empty")).toBeInTheDocument();
  });

  test("renders fallback with null", () => {
    render(
      <Show when={null} fallback="is null">
        children
      </Show>
    );

    expect(screen.queryByText("children")).not.toBeInTheDocument();
    expect(screen.queryByText("is null")).toBeInTheDocument();
  });

  test("renders fallback with undefined", () => {
    render(
      <Show when={undefined} fallback="is undefined">
        children
      </Show>
    );

    expect(screen.queryByText("children")).not.toBeInTheDocument();
    expect(screen.queryByText("is undefined")).toBeInTheDocument();
  });

  test("renders complex JSX children", () => {
    render(
      <Show when={true}>
        <div>
          <span>nested</span>
          <p>content</p>
        </div>
      </Show>
    );

    expect(screen.getByText("nested")).toBeInTheDocument();
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  test("renders complex JSX fallback", () => {
    render(
      <Show
        when={false}
        fallback={
          <div>
            <span>fallback</span> <span>jsx</span>
          </div>
        }
      >
        children
      </Show>
    );

    expect(screen.getByText("fallback")).toBeInTheDocument();
    expect(screen.getByText("jsx")).toBeInTheDocument();
    expect(screen.queryByText("children")).not.toBeInTheDocument();
  });

  test("renders nothing when no fallback provided and condition is false", () => {
    const { container } = render(<Show when={false}>children</Show>);

    expect(screen.queryByText("children")).not.toBeInTheDocument();
    expect(container.firstChild).toBeNull();
  });

  test("updates when the condition state changes", () => {
    function Harness() {
      const [visible, setVisible] = useState(false);

      return (
        <>
          <button type="button" onClick={() => setVisible((value) => !value)}>
            toggle
          </button>
          <Show when={visible} fallback="hidden">
            shown
          </Show>
        </>
      );
    }

    render(<Harness />);

    expect(screen.queryByText("shown")).not.toBeInTheDocument();
    expect(screen.getByText("hidden")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "toggle" }));

    expect(screen.getByText("shown")).toBeInTheDocument();
    expect(screen.queryByText("hidden")).not.toBeInTheDocument();
  });
});
