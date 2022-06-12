const genders = {
  man: "男",
  woman: "女",
};

export const tableColumns = [
  {
    type: "selection",
    on: {
      select() {
        console.log(this, "select");
      },
    },
  },
  { label: "时间", prop: "createTime" },
  { label: "名字", prop: "name" },
  { label: "年龄", prop: "age" },
  {
    label: "性别",
    prop: "gender",
    formatter(value) {
      return genders[value] || "";
    },
  },
  { label: "身高", prop: "height", unit: "m" },
  { label: "体重", prop: "weight", unit: "kg" },
  {
    label: "头像",
    slots: {
      elType: "image",
      key: "avatar",
      style: { width: "200px", height: "80px" },
    },
  },
  {
    label: "操作",
    slotName: "operate",
    props: { align: "center" },
  },
];
