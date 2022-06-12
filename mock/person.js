const Mock = require("mockjs");

let { personList } = Mock.mock({
  "personList|1-20": [
    {
      "id|+1": 1,
      createTime: "@date('yyyy-MM-dd')",
      name: "@name",
      age: "@integer(10,100)",
      weight: "@integer(40,100)",
      height: "@integer(150,200)",
      avatar: "@image('200x200')",
      "gender|1": ["man", "woman"],
    },
  ],
});

module.exports = [
  // get user info
  {
    url: "/api/person/list",
    type: "get",
    response: () => {
      // const { token } = config.query

      const info = {
        roleId: 1,
        name: "总部",
      };

      // mock error
      if (!info) {
        return {
          code: 500,
          message: "Login failed, unable to get user details.",
        };
      }

      return {
        code: 200,
        data: personList,
        total: personList.length,
      };
    },
  },
];
