import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { Switch } from "../src/components/Switch";
import { Match } from "../src/components/Match";

describe("Switch", () => {
  test("returns nothing when no match is truthy", () => {
    const { container } = render(
      <Switch>
        <Match when={false}>no</Match>
        <Match when={0}>zero</Match>
        <Match when={null}>null</Match>
      </Switch>
    );

    expect(screen.queryByText("no")).toBeNull();
    expect(screen.queryByText("zero")).toBeNull();
    expect(screen.queryByText("null")).toBeNull();
    expect(container.firstChild).toBeNull();
  });

  test("renders the first truthy match", () => {
    render(
      <Switch>
        <Match when={false}>no</Match>
        <Match when={true}>yes</Match>
        <Match when={true}>later</Match>
      </Switch>
    );

    expect(screen.queryByText("no")).toBeNull();
    expect(screen.getByText("yes")).toBeTruthy();
    expect(screen.queryByText("later")).toBeNull();
  });

  test("ignores non-Match children", () => {
    render(
      <Switch>
        <div>outside</div>
        text node
        <Match when={false}>no</Match>
        <span>also outside</span>
        <Match when={"hello"}>matched</Match>
      </Switch>
    );

    expect(screen.queryByText("outside")).toBeNull();
    expect(screen.queryByText("also outside")).toBeNull();
    expect(screen.queryByText("no")).toBeNull();
    expect(screen.getByText("matched")).toBeTruthy();
  });

  test("renders complex JSX from the first truthy match", () => {
    render(
      <Switch>
        <Match when={false}>first</Match>
        <Match
          when={true}
          children={
            <div>
              <span>nested</span>
              <p>content</p>
            </div>
          }
        />
      </Switch>
    );

    expect(screen.queryByText("first")).toBeNull();
    expect(screen.getByText("nested")).toBeTruthy();
    expect(screen.getByText("content")).toBeTruthy();
  });
});
