
import TableImage from '../../components/TableImage.vue'

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
  { label: "名字", prop: "name", fixed: 'left' },
  { label: "年龄", prop: "age", sortable: 'custom', fixed: 'left' },
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
    prop: 'avatar',
    slot(row) {
      return {
        name: TableImage,
      }
    }
  },
  {
    label: "籍贯",
    columnType: "homeTownEnum",
    prop: "homeTown",
    enumList: [
      {
        label: "江西",
        value: 1
      },
      {
        label: "广东",
        value: 2
      }
    ]

  },
  {
    label: "操作",
    slot: "operate",
    align: "center",
    fixed: 'right'
  },
];
