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
  { label: "时间", prop: "createTime", fixed: 'left' },
  { label: "名字", prop: "name" },
  { label: "年龄", prop: "age", sortable: 'custom' },
  {
    label: "性别",
    prop: "gender",
    formatter(row) {
      return genders[row.gender] || '';
    },
  },
  {
    label: "地址",
    align: "center",
    children: [
      {
        label: "省份",
        prop: "province",
        slot: {
          default: "province",
          header: "provinceHeader"
        }
      },
      {
        label: "城市",
        prop: "city"
      },
    ]
  },
  { label: "身高", prop: "height", unit: "m" },
  { label: "体重", prop: "weight", unit: "kg" },
  {
    label: "头像",
    minWidth: 200,
    slot(row) {
      return `<img src="${row.avatar}"/>`;
    }
  },
  {
    label: "全身照",
    slot(row) {
      return {
        name: "ElPopover",
        props: {
          trigger: 'hover',

        },
        scopedSlots(h) {
          return {
            reference() {
              return h('img', { attrs: { src: row.avatar, style: "width:100px;height:100px" } })
            },
            default() {
              return h('img', { attrs: { src: row.avatar, style: "width:500px;height:500px" } })
            }
          }
        },

      }
    }
  },
  {
    label: "操作",
    slot: "operate",
    align: "center",
    fixed: 'right'
  },
];
