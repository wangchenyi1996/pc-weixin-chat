/*
 * @Description: 
 * @Version: 1.0
 * @Autor: 王强
 * @Date: 2020-07-06 11:22:09
 * @LastEditors: 王强
 * @LastEditTime: 2020-07-22 14:32:46
 */ 
import Vue from 'vue'

import { 
    Button,
    Upload,
    Message,
    Card,
    Divider,
    Input,
    Checkbox,
    Tabs,
    TabPane,
    Radio,
    RadioGroup,
    Form,
    FormItem,
    Dialog,
    Popconfirm,
    Popover
} from 'element-ui';

Vue.use(Button)
Vue.use(Upload)
Vue.use(Card)
Vue.use(Divider)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Dialog)
Vue.use(Popconfirm)
Vue.use(Popover)


Vue.prototype.$message = Message;
