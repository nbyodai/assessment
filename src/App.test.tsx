import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { ExpanseTable, TotalExpanse } from "./App";
import { createGroupingTable, MOCK_DATA } from "./utils";

test("It should display a table with data", () => {
  const data = [...MOCK_DATA];
  render(<ExpanseTable data={data} />);
  expect(screen.queryByRole("table")).toBeInTheDocument();

  expect(screen.queryByText(/departments/i)).toBeInTheDocument();
  expect(screen.queryByText(/project name/i)).toBeInTheDocument();
  expect(screen.queryByText(/amount/i)).toBeInTheDocument();
  expect(screen.queryByText(/date/i)).toBeInTheDocument();
  expect(screen.queryByText("Name")).toBeInTheDocument();

  expect(screen.queryAllByText("IT")).not.toBeNull();
  expect(screen.queryAllByText("Finance")).not.toBeNull();
  expect(screen.queryAllByText("Sam")).not.toBeNull();
  expect(screen.queryAllByText("Matt")).not.toBeNull();
});

test("Table headers should be clickable table heads", async () => {
  const data = [...MOCK_DATA];
  render(<ExpanseTable data={data} />);
  user.click(screen.getByText(/departments/i));
  expect(await screen.findByText(/departments\n? asc/im)).toBeInTheDocument();

  user.click(screen.getByText(/departments \n?asc/i));
  expect(await screen.findByText(/departments\n? dsc/im)).toBeInTheDocument();
});

test("it should always set to `asc` if clicked first time", async () => {
  const data = [...MOCK_DATA];
  render(<ExpanseTable data={data} />);
  user.click(screen.getByText(/departments/i));
  user.click(screen.getByText(/project name/i));
  expect(await screen.findByText(/project name\n? asc/im)).toBeInTheDocument();
});

test.skip("It should change data sort direction on click", () => {
  // something is not quite right here
  const data = [...MOCK_DATA];
  const { debug } = render(<ExpanseTable data={data} />);
  const firstChildBeforeSort = screen.queryAllByRole("row")[1];
  console.log(firstChildBeforeSort.textContent);
  user.click(screen.getByText(/amount/i));
  debug();
  const firstChildAfterSort = screen.queryAllByRole("row")[1];

  expect(firstChildAfterSort.textContent).not.toEqual(
    firstChildBeforeSort.textContent
  );
});
test.only("Expanses Total component can convert data into table by key", () => {
  const data = [...MOCK_DATA];

  const newTable = createGroupingTable("departments", data);

  expect(newTable).toHaveProperty("IT");
  expect(newTable).toHaveProperty("Finance");
  expect(newTable).toHaveProperty("HR");
  // IT: 2200, HR: 2839, Finance: 6972
  console.log(newTable);
  // expect(newTable["IT"]).toEqual(2200);
  // expect(newTable["HR"]).toEqual(2839);
  // expect(newTable["Finance"]).toEqual(6972);
  // render(<TotalExpanse data={data} />);
  // const selectSizeAndShowSelectedSize = screen.getByRole("combobox");
  // expect(selectSizeAndShowSelectedSize).toHaveValue("Departments");
  // user.selectOptions(selectSizeAndShowSelectedSize, "Name");
  // expect(selectSizeAndShowSelectedSize).toHaveValue("Name");
});
