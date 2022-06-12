export const formItems = [
  {
    prop: "name",
    label: "姓名",
    type: "el-input",
  },
  {
    prop: "age",
    label: "年龄",
    renderLabel: "ageLabel",
    type: "el-input",
  },
  {
    prop: "gender",
    label: "性别",
    renderLabel: () => "性别性别性别性别性别性别性别",
    type: "el-select",
    options: [
      {
        label: "男",
        value: "man",
      },
      {
        label: "女",
        value: "woman",
      },
    ],
  },
  {
    prop: "height",
    label: "身高",
    type: "el-input",
    inputOptions: {
      props: {
        type: "number",
      },
      on: {
        input(value) {
          console.log("身高：" + value);
        },
      },
    },
  },
  {
    label: "体重",
    slotName: "weight",
  },
];

export const searchFormItems = [
  {
    label: "姓名",
    prop: "name",
    type: "input",
  },
  {
    label: "年龄",
    prop: "age",
    type: "input",
  },
  {
    label: "性别",
    type: "select",
    prop: "gender",
    // options: [
    //   {
    //     label: "男",
    //     value: "man",
    //   },
    //   {
    //     label: "女",
    //     value: "woman",
    //   },
    // ],
    options: "gender",
  },
];
