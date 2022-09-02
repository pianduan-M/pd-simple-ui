基于 element-ui 封装

的 table、form、search-form 组件 vue2 版本

## Table

##### Table  Attributes

| 参数                | 说明                                                         | 类型   | 可选值 | 默认值 |
| ------------------- | ------------------------------------------------------------ | ------ | ------ | ------ |
| columns             | 表格列的配置项 详细配置看下下方                              | array  | —      | —      |
| commonColumnOptions | 表格列的公共配置，element-ui table-column 的 props 配置，该配置应用到每一列，会被 columns 中的配置覆盖 | object | —      | —      |
| nullValueDefault    | 如果列的值为空时 默认显示的 value                            | string | -      | -      |

其他所有 attrs 都会作为 el-table 的 props, 所有事件都会传递给 el-table

##### Table column Attributes

| 参数       | 说明                                                         | 类型                         | 可选值 | 默认值 |
| ---------- | ------------------------------------------------------------ | ---------------------------- | ------ | ------ |
| style      | el-table-column 的样式配置                                   | object                       | —      | —      |
| class      | el-table-column 的类名配置                                   | string object array          | —      | —      |
| on         | el-table-column 的事件监听，具体事件查看官网，所有函数的 this 指向的该组件的父级，也就是说 this 指向的是当前使用 table 的组件，方便数据的使用 | object                       | —      | —      |
| slot       | 可以是 function 和 string 类型，function 类型直接调用 传参 ( h, row, column ) 可以返回 html 字符串，vNode, 带有 name 属性的配置对象，name 可以是组件名称，或者 vue 组件，其余属性会当做 h 函数的第二个参数；string 类型匹配插槽 | function,object,array,string | —      | —      |
| children   | 嵌套 column 配置，用来设置多级表头                           | array                        | —      | —      |
| formatter  | 列数据的格式化函数，return 的值将作为该列显示的值            | function                     | —      | —      |
| unit       | 如果传入该值将跟该列数据拼接，                               | string                       | —      | —      |
| columnType | 枚举类型，传入该字段会匹配一个 使用 use 方法注册的插件方法生成列数据 传入 （h, row, column）改方法的 this 指向 table 组件 | string                       | —      | —      |
| enumList   | 枚举匹配数组，子项为 label,value 键值对，列项的值跟 value 匹配 | sting                        | —      | —      |

#####  Table methods

| 方法名 | 说明                                                         | 参数                  |
| ------ | ------------------------------------------------------------ | --------------------- |
| use    | 用于注册 columnType 枚举类型，第一个参数传入枚举类型名称，第二个注册函数需要返回一个 handler 方法，第三个为配置项 handler 可以访问，handler this 会被重新指向为 table， 传参 （h, row, column） 需要返回 vNode 类型 | name,install, options |



## Form

##### Form Attributes

| 参数              | 说明                                                         | 类型   | 可选值 | 默认值 |
| ----------------- | ------------------------------------------------------------ | ------ | ------ | ------ |
| v-model/value     | 双向绑定的表单数据, 同 el-form 的 model                      | object | —      | —      |
| initFormData      | 表单默认值，                                                 | object | —      | —      |
| formItems         | 表单 item 配置项，具体配置看下方 form-item attributes        | array  | —      | —      |
| colLayout         | el-form-item 的布局配置，具体配置查看 el-col                 | object | —      | —      |
| formItemAttrs     | el-form-item 的公共 props ，会被 formItems 中的配置覆盖      | object | —      | —      |
| rowAttrs          | el-row 的 props                                              | object | —      | —      |
| defaultInputAttrs | el-form-item 下的 所有input select 等表单元素的公共 props    | object | —      | —      |
| selectOptionMap   | el-select 的 options 配置 通过formItem 传入相应 key 取值，通常是当 select 的值是异步获取时使用， | object | —      | —      |

**其余 attrs 都会当作 props 传给 el-form**

##### Form methods

| 方法名     | 说明                    | 参数 |
| ---------- | ----------------------- | ---- |
| validate   | 同 el-form              | —    |
| getFormRef | 返回 el-form 组件的引用 | —    |

其余 el-form 方法都可以通过组件引用调取

##### Form Item Attributes

| 参数         | 说明                                                         | 类型            | 可选值                | 默认值 |
| ------------ | ------------------------------------------------------------ | --------------- | --------------------- | ------ |
| prop         | 同 el-form-item                                              | string          | —                     | —      |
| label        | 同 el-form-item                                              | string          | —                     | —      |
| type         | el-form-item 下的表单元素名                                  | string          | el-input el-select 等 | —      |
| options      | el-select 的 options 配置，当是 string 类型时，回到 selectOptionMap 中取值 | array string    | —                     | —      |
| renderLabel  | el-form-item 中 label 值，如果该值是 string 时，将作为插槽名 | function string | —                     | —      |
| isHidden     | 是否隐藏该项                                                 | boolean         | —                     | —      |
| layout       | 该项的 el-col props                                          | object          | —                     | —      |
| itemAttrs    | el-form-item 的 props                                        | object          | —                     | —      |
| rules        | 同 el-form-item                                              | object          | —                     | —      |
| style        | el-form-item 样式                                            | object          | —                     | —      |
| class        | el-form-item 类名                                            | object arrary   | —                     | —      |
| slotName     | el-form-item 下表单元素的插槽名                              | string          | —                     | —      |
| inputOptions | el-form-item 下表单元素的配置项                              | object          | —                     | —      |
| placeholder  | el-form-item 下表单元素的 placeholder                        | string          | —                     | —      |

##### Form Item inputOptions

| 参数  | 说明                               | 类型         | 可选值 | 默认值 |
| ----- | ---------------------------------- | ------------ | ------ | ------ |
| props | el-form-item 下表单元素的 props    | object       | —      | —      |
| on    | el-form-item 下表单元素的 监听事件 | object       | —      | —      |
| style | el-form-item 下表单元素的 样式     | object       | —      | —      |
| class | el-form-item 下表单元素的 类名     | object array | —      | —      |



## SearchForm

##### Search-form Attributes

| 参数            | 说明                                                         | 类型         | 可选值        | 默认值 |
| --------------- | ------------------------------------------------------------ | ------------ | ------------- | ------ |
| v-model/value   | 绑定的 表单数据                                              | object       | —             | —      |
| formItems       | 表单配置项                                                   | array        | —             | —      |
| gutter          | 表单项间隔                                                   | number       | —             | 0      |
| size            | 表单项下的组件尺寸                                           | string       | 同 element-ui | small  |
| inputClass      | 表单项下表单元素类名                                         | object array | —             | —      |
| labelSuffix     | 表单项 label 后缀                                            | string       | —             | —      |
| flexWrap        | 宽度超出是否换行                                             | boolean      | —             | false  |
| selectOptionMap | el-select 的 options 配置 通过formItem 传入相应 key 取值，通常是当 select 的值是异步获取时使用， | object       | —             | —      |



##### Search-form Item Attributes

| 参数          | 说明                                                         | 类型         | 可选值       | 默认值 |
| ------------- | ------------------------------------------------------------ | ------------ | ------------ | ------ |
| label         | 表单 label                                                   | string       | —            | —      |
| labelSlotName | 表单 label 插槽名                                            | string       | —            | —      |
| prop          | 表单域字段                                                   | string       | —            | —      |
| type          | 表单项下的表单元素类型,element-ui 元素                       | string       | input,select | —      |
| options       | el-select 的 options 配置，当是 string 类型时，回到 selectOptionMap 中取值 | array string | —            | —      |
| on            | 表单项下的表单元素事件监听                                   | object       | —            | —      |
| attrs         | 表单元素 props                                               | object       | —            | —      |
| class         | 表单元素类名                                                 | object array | —            | —      |
| slotName      | 表单元素插槽名                                               | string       | —            | —      |

##### Search-form slot 插槽

| name   | 说明           |
| ------ | -------------- |
| before | form-item 前置 |
| after  | form-item 后置 |

