import { render, screen } from "@testing-library/react";
import { ListDefinitions } from "./ListDefinitions";

const list = [
  {
    title: "Name",
    value: "Peter",
  },
  {
    title: "Age",
    value: "18",
  },
];

describe("ListDefinitions", () => {
  it("renders list items", () => {
    render(<ListDefinitions list={list} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Peter")).toBeInTheDocument();

    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("18")).toBeInTheDocument();
  });

  it("renders empty dash when list item is empty string", () => {
    render(<ListDefinitions list={[{ title: "Name", value: "" }]} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
  });

  it("renders empty dash when list item is empty null", () => {
    render(<ListDefinitions list={[{ title: "Name", value: null }]} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
  });

  it("renders empty dash when list item is empty undefined", () => {
    render(<ListDefinitions list={[{ title: "Name", value: undefined }]} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
  });

  it("renders sub list-item", () => {
    render(
      <ListDefinitions
        list={[
          {
            title: "Info",
            value: [{ title: "Name", value: "Matheus" }],
          },
        ]}
      />
    );

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Matheus")).toBeInTheDocument();
  });

  it("renders many sub list-item", () => {
    render(
      <ListDefinitions
        list={[
          {
            title: "Info",
            value: [
              { title: "Name", value: "Matheus" },
              { title: "Age", value: "24" },
              { title: "Sex", value: "Man" },
            ],
          },
        ]}
      />
    );

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Matheus")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("24")).toBeInTheDocument();
    expect(screen.getByText("Sex")).toBeInTheDocument();
    expect(screen.getByText("Man")).toBeInTheDocument();
  });

  it("renders empty item on sub list when value is null", () => {
    render(
      <ListDefinitions
        list={[
          {
            title: "Info",
            value: [{ title: "Name", value: null }],
          },
        ]}
      />
    );

    expect(screen.getByText("Info")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
  });

  it("renders empty item on sub list when value is undefined", () => {
    render(
      <ListDefinitions
        list={[
          {
            title: "Info",
            value: [{ title: "Name", value: undefined }],
          },
        ]}
      />
    );

    expect(screen.getByText("Info")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
  });

  it("renders empty item on sub list when value is empty string", () => {
    render(
      <ListDefinitions
        list={[
          {
            title: "Info",
            value: [{ title: "Name", value: "" }],
          },
        ]}
      />
    );

    expect(screen.getByText("Info")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
  });

  it("renders multiple sub lists", () => {
    render(
      <ListDefinitions
        list={[
          {
            title: "Job Info",
            value: [
              { title: "Company", value: "Coca-Cola" },
              {
                title: "Payment Info",
                value: [
                  { title: "Bank Account", value: "Itau" },
                  { title: "Salary", value: "R$ 2.340" },
                ],
              },
            ],
          },
        ]}
      />
    );

    expect(screen.getByText("Payment Info")).toBeInTheDocument();
    expect(screen.getByText("Bank Account")).toBeInTheDocument();
    expect(screen.getByText("Itau")).toBeInTheDocument();
    expect(screen.getByText("Salary")).toBeInTheDocument();
    expect(screen.getByText("R$ 2.340")).toBeInTheDocument();
  });

  it("renders empty fields", () => {
    render(
      <ListDefinitions
        list={[
          {
            title: "Job Info",
            value: [
              { title: "Company", value: "Coca-Cola" },
              {
                title: "Payment Info",
                value: "",
              },
            ],
          },
        ]}
      />
    );

    expect(screen.getByText("Empty fields")).toBeInTheDocument();
  });
});
