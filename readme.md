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

| 参数      | 说明                                                         | 类型                         | 可选值 | 默认值 |
| --------- | ------------------------------------------------------------ | ---------------------------- | ------ | ------ |
| label     | 同 elment-ui 显示的标题                                      | string                       | —      | —      |
| prop      | 同 elment-ui 对应列内容的字段名，也可以使用 property 属性，支持多级key | string                       | —      | —      |
| width     | 同 elment-ui  列宽度，其他使用 props 传参                    | string                       | —      | —      |
| style     | el-table-column 的样式配置                                   | object                       | —      | —      |
| class     | el-table-column 的类名配置                                   | string object array          | —      | —      |
| props     | el-table-column 的配置项 具体配置看 element-ui 官网          | object                       | —      | —      |
| on        | el-table-column 的事件监听，具体事件查看官网，所有函数的 this 指向的该组件的父级，也就是说 this 指向的是当前使用 table 的组件，方便数据的使用 | object                       | —      | —      |
| type      | 同 elment-ui                                                 | string                       | —      | —      |
| slots     | 没列的 children 元素，根据配置 使用 h 函数创建元素，具体配置看下方 slots attributes，如果传入的值是一个函数，那么该函数接收 该列的行数据，返回的值将继续使用 h 函数创建元素 | function,object,array,string | —      | —      |
| slotName  | 该列插槽名，可以在 table 中使用插槽 该插槽将作为该列最终展示的数据  跟 slots 同时传值时，slots 优先 | string                       | —      | —      |
| formatter | 列数据的格式化函数，return 的值将作为该列显示的值            | function                     | —      | —      |
| unit      | 如果传入该值将跟该列数据拼接，                               | string                       | —      | —      |

##### Table column slots Attributes

| 参数     | 说明                                                         | 类型                  | 可选值 | 默认值 |
| -------- | ------------------------------------------------------------ | --------------------- | ------ | ------ |
| elName   | 需要创建的 dom 名，也可以是已经全局注册过的自定义组件        | string                | —      | —      |
| props    | 自定义组件的 props                                           | object                | —      | —      |
| style    | dom 或自定义组件样式                                         | object                | —      | —      |
| class    | dom 或自定义组件类名                                         | object，array         | —      | —      |
| on       | dom 或自定义组件的事件监听，具体事件查看官网，所有函数的 this 指向的该组件的父级，也就是说 this 指向的是当前使用 table 的组件，方便数据的使用 | object                | —      | —      |
| attrs    | dom 的 attributes                                            | object                | —      | —      |
| children | 该 dom 或组件的 子元素，配置同该元素一样                     | object function array | —      | —      |
| elType   | 指定特殊类型，根据特殊类型自动创建元素                       | string                | image  | —      |



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
| ishidden     | 是否隐藏该项                                                 | boolean         | —                     | —      |
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

