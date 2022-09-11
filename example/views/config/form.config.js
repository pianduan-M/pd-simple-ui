import ProfessionSelect from "../../components/ProfessionSelect.vue";



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
    contentDesc: "年龄",
    inputOptions: { style: { width: '100px' } }
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
    prop: "weight",
  },
];

export const searchFormItems = [
  {
    label: "日期", prop: "date", type: "year", placeholder: "请选择时间",
  },
  {
    label: "姓名",
    prop: "name",
    type: "input",
    placeholder: "请选择时间",
  },
  {
    label: "年龄",
    prop: "age",
    type: "input",
    placeholder: "请输入年龄",
  },
  {
    label: "职业",
    prop: "profession",
    type: ProfessionSelect,
    placeholder: "请选择职业",
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
