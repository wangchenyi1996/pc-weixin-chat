/*
 * @Description: 
 * @Version: 1.0
 * @Autor: 王强
 * @Date: 2020-07-06 11:22:09
 * @LastEditors: 王强
 * @LastEditTime: 2020-07-07 09:54:41
 */ 
import Vue from 'vue'

import { 
    Button,
    Upload,
    Message,
    Card,
    Divider
} from 'element-ui';

Vue.use(Button)
Vue.use(Upload)
Vue.use(Card)
Vue.use(Divider)


Vue.prototype.$message = Message;
