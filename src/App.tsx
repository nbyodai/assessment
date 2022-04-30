import { useState } from "react";
import "./styles.css";
import {
  createGroupingTable,
  Expanse,
  formatAmount,
  MOCK_DATA,
  SortId
} from "./utils";

interface ExpanseTableProps {
  data: Expanse[];
}

export function ExpanseTable(props: ExpanseTableProps) {
  const [sortKey, setSortKey] = useState("");
  const [sortId, setSortId] = useState("");
  const [tableData, setTableData] = useState(props.data);

  function sortTableData(id: SortId, sortKey: string) {
    setTableData(
      tableData.sort((a, b) => {
        let A = a;
        let B = b;
        if (sortKey === "dsc") {
          B = a;
          A = b;
        }
        const fieldAProp = id !== "date" ? A[id] : new Date(A.date);
        const fieldBProp = id !== "date" ? B[id] : new Date(B.date);

        if (fieldAProp < fieldBProp) {
          return -1;
        }
        if (fieldAProp > fieldBProp) {
          return 1;
        }
        return 0;
      })
    );
  }

  function handleHeaderClick(id: SortId) {
    let _sortKey = sortKey;
    if (id !== sortId) {
      _sortKey = "";
    }
    setSortId(id);
    if (_sortKey === "") {
      setSortKey("asc");
      return sortTableData(id, "asc");
    }
    if (_sortKey === "asc") {
      setSortKey("dsc");
      return sortTableData(id, "dsc");
    }
    if (_sortKey === "dsc") {
      setSortKey("asc");
      return sortTableData(id, "asc");
    }
  }

  function calulateAmountTotal() {
    return props.data.reduce((acc, expanse) => acc + expanse.amount, 0);
  }

  const heads: { id: SortId; display: string }[] = [
    { id: "departments", display: "Departments" },
    { id: "project_name", display: "Project Name" },
    { id: "amount", display: "Amount" },
    { id: "date", display: "Date" },
    { id: "member_name", display: "Name" }
  ];

  return (
    <table>
      <thead>
        <tr>
          {heads.map((head) => (
            <th key={head.id} onClick={() => handleHeaderClick(head.id)}>
              {head.display}
              {sortId === head.id ? ` ${sortKey}` : ""}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map(
          ({ departments, project_name, amount, date, member_name }, index) => (
            <tr key={index}>
              <td>{departments}</td>
              <td>{project_name}</td>
              <td>{formatAmount(amount)}</td>
              <td>{date}</td>
              <td>{member_name}</td>
            </tr>
          )
        )}
        <tr>
          <td></td>
          <td></td>
          <td className="Amount-Total">
            {formatAmount(calulateAmountTotal())}
          </td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
}

export function TotalExpanse(props: ExpanseTableProps) {
  const [selectedKey, setSelectedKey] = useState<SortId>("departments");
  const totalExpanseTable = createGroupingTable(selectedKey);

  const options = [
    { name: "Departments", key: "departments" },
    { name: "Project Name", key: "project_name" },
    { name: "Date", key: "date" },
    { name: "Name", key: "member_name" }
  ];

  function handleChange(val: any) {
    setSelectedKey(val);
  }
  return (
    <>
      <select className="Total-Select">
        {options.map((option) => (
          <option
            onChange={() => handleChange(option.key)}
            key={option.key}
            value={option.key}
          >
            {option.name}
          </option>
        ))}
      </select>
      <table>
        <thead>
          <tr>
            <td>Departments</td>
            <td>Amount</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>IT</td>
            <td>4000</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default function App() {
  const data: Expanse[] = [...MOCK_DATA];
  return (
    <div className="App">
      {/* <ExpanseTable data={data} /> */}
      <TotalExpanse data={data} />
    </div>
  );
}
