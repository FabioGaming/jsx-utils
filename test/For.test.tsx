import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, test, expect } from "vitest";
import { For } from "../src/components/For";

describe("For", () => {
  test("renders items", () => {
    render(
      <For each={["a", "b"]}>{(item) => <div key={item}>{item}</div>}</For>
    );

    expect(screen.getByText("a")).toBeInTheDocument();
    expect(screen.getByText("b")).toBeInTheDocument();
  });

  test("renders nothing with empty array", () => {
    const { container } = render(
      <For each={[]}>{(item) => <div key={item}>{item}</div>}</For>
    );

    expect(container.firstChild).toBeNull();
  });

  test("passes index to render function", () => {
    render(
      <For each={["x", "y", "z"]}>
        {(item, index) => (
          <div key={item}>
            {item}-{index}
          </div>
        )}
      </For>
    );

    expect(screen.getByText("x-0")).toBeInTheDocument();
    expect(screen.getByText("y-1")).toBeInTheDocument();
    expect(screen.getByText("z-2")).toBeInTheDocument();
  });

  test("renders single item", () => {
    render(
      <For each={["single"]}>{(item) => <span key={item}>{item}</span>}</For>
    );

    expect(screen.getByText("single")).toBeInTheDocument();
  });

  test("works with objects", () => {
    const items = [
      { id: 1, name: "Goober" },
      { id: 2, name: "Thing" },
    ];

    render(
      <For each={items}>{(item) => <div key={item.id}>{item.name}</div>}</For>
    );

    expect(screen.getByText("Goober")).toBeInTheDocument();
    expect(screen.getByText("Thing")).toBeInTheDocument();
  });

  test("works with numbers", () => {
    render(
      <For each={[1, 2, 3]}>{(num) => <div key={num}>Number: {num}</div>}</For>
    );

    expect(screen.getByText("Number: 1")).toBeInTheDocument();
    expect(screen.getByText("Number: 2")).toBeInTheDocument();
    expect(screen.getByText("Number: 3")).toBeInTheDocument();
  });

  test("updates when the items state changes", () => {
    function Harness() {
      const [items, setItems] = useState(["a", "b"]);

      return (
        <>
          <button type="button" onClick={() => setItems(["a", "b", "c"])}>
            add item
          </button>
          <For each={items}>{(item) => <div key={item}>{item}</div>}</For>
        </>
      );
    }

    render(<Harness />);

    expect(screen.getByText("a")).toBeInTheDocument();
    expect(screen.getByText("b")).toBeInTheDocument();
    expect(screen.queryByText("c")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "add item" }));

    expect(screen.getByText("a")).toBeInTheDocument();
    expect(screen.getByText("b")).toBeInTheDocument();
    expect(screen.getByText("c")).toBeInTheDocument();
  });
});
