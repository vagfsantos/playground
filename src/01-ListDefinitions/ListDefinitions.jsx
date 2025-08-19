import styled from "styled-components";

const List = styled.dl`
  font-family: sans-serif;
  background-color: #ddd;
  padding: 12px;
  border-radius: 12px;
`;

const Term = styled.dt`
  font-weight: bold;
  text-transform: uppercase;
  display: inline-block;
`;

const Summary = styled.summary`
  padding: 6px 0;
  color: #2e2e96;
  cursor: pointer;
`;

const Data = styled.dd``;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-left: ${(props) => props.margin}px;
  border-bottom: 1px solid gray;
  padding: 8px 0;
`;

const listPerson = [
  {
    title: "Name",
    value: "Peter",
  },
  {
    title: "Age",
    value: "",
  },
  {
    title: "Marital Status",
    value: "Single",
  },
  {
    title: "Sex",
    value: null,
  },
  {
    title: "Educational Background",
    value: [
      { title: "Institution", value: "Senac" },
      { title: "Conclusion date", value: "05/2023" },
      { title: "History", value: "" },
      { title: "Address", value: null },
    ],
  },
  {
    title: "Job Info",
    value: [
      { title: "Company", value: "Coca-Cola" },
      {
        title: "Payment Info",
        value: [
          {
            title: "Bank Account",
            value: [
              { title: "Agencia", value: "0001" },
              { title: "Conta", value: "343534-2" },
              { title: "Bank", value: "" },
            ],
          },
          { title: "Salary", value: "R$ 2.340" },
        ],
      },
    ],
  },
];

const isArray = (value) => value && !(typeof value === "string");

const getValueEmpty = (value) => (!value ? "-" : value);

const renderItem = (item, margin) => {
  return (
    <Wrapper margin={margin}>
      <Term>{item.title}</Term>
      <Data>{getValueEmpty(item.value)}</Data>
    </Wrapper>
  );
};

function renderList(listItem) {
  if (!isArray(listItem.value)) {
    return renderItem(listItem);
  }

  return (
    <details>
      <Summary>
        <Term>{listItem.title}</Term>
      </Summary>
      <List>
        {listItem.value.map((item) => {
          if (isArray(item.value)) {
            return renderList(item);
          }

          return renderItem(item, 20);
        })}
      </List>
    </details>
  );
}

function renderEmptyList(list) {
  const emptyItems = [];

  const listMap = list.map((item) => {
    if (!item.value) {
      emptyItems.push(item);
      return;
    }

    if (isArray(item.value)) {
      return {
        ...item,
        value: renderEmptyList(item.value),
      };
    }

    return item;
  });

  const filterListMap = listMap.filter((item) => item);

  const emptySubList = {
    title: "Empty fields",
    value: emptyItems,
  };

  return [
    ...filterListMap,
    ...(emptySubList?.value.length > 0 ? [emptySubList] : []),
  ];
}

export const ListDefinitions = ({ list = listPerson }) => {
  return (
    <>
      <List>
        {renderEmptyList(list).map((item) => {
          return renderList(item);
        })}
      </List>
    </>
  );
};
