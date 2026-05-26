import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, test } from "vitest";
import { Match } from "../src/components/Match";

describe("Match", () => {
  test("renders children when when is truthy", () => {
    render(<Match when={true}>matched</Match>);

    expect(screen.getByText("matched")).toBeInTheDocument();
  });

  test("renders nothing when when is falsy", () => {
    const { container } = render(<Match when={false}>matched</Match>);

    expect(screen.queryByText("matched")).not.toBeInTheDocument();
    expect(container.firstChild).toBeNull();
  });

  test("updates when the condition state changes", () => {
    function Harness() {
      const [active, setActive] = useState(false);

      return (
        <>
          <button type="button" onClick={() => setActive((value) => !value)}>
            toggle
          </button>
          <Match when={active}>visible</Match>
        </>
      );
    }

    render(<Harness />);

    expect(screen.queryByText("visible")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "toggle" }));

    expect(screen.getByText("visible")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "toggle" }));

    expect(screen.queryByText("visible")).not.toBeInTheDocument();
  });
});
