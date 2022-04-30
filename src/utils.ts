export interface Expanse {
  departments: string;
  project_name: string;
  amount: number;
  date: string;
  member_name: string;
}

export type SortId =
  | "departments"
  | "project_name"
  | "amount"
  | "date"
  | "member_name";

export const MOCK_DATA: Expanse[] = [
  {
    departments: "IT",
    project_name: "Mars-NS1",
    amount: 1400, // "1,400.00€",
    date: "2/4/2021",
    member_name: "Sam"
  },
  {
    departments: "HR",
    project_name: "AlphaDeo",
    amount: 2839, //"2,839.00€",
    date: "5/23/2021",
    member_name: "Matt"
  },
  {
    departments: "Finance",
    project_name: "Alph-23",
    amount: 2627, //"2,627.00€",
    date: "7/31/2021",
    member_name: "Sam"
  },
  {
    departments: "Finance",
    project_name: "Alph-23",
    amount: 4345, //"4,345.00€",
    date: "11/20/2021",
    member_name: "Matt"
  },
  {
    departments: "IT",
    project_name: "Asterin",
    amount: 800, //"800.00€",
    date: "3/8/2021",
    member_name: "George"
  }
];

export const formatAmount = (amount: number) => {
  const _amount = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR"
  }).format(amount);
  return _amount;
};

export const createGroupingTable = (key: SortId, data: Array<Expanse>) => {
  const store = {};
  data.forEach((datum) => {
    if (store[key]) {
      store[key] = store[key] + datum[key];
    } else {
      store[key] = datum[key];
    }
  });
  return store;
};
