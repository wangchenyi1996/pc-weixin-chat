/*
 * @Description: 环境选择
 * @Version: 1.0
 * @Autor: 王强
 * @Date: 2020-07-08 13:24:34
 * @LastEditors: 王强
 * @LastEditTime: 2020-07-08 14:27:38
 */ 

let Config = {
	official: 3,
	domin: ''
}
/*
 *  1 表示正式环境 
 *  2 表示测试环境
 *  3 表示本地环境
 */

if (Config.official === 1) {
	Config.domain = "https://xxxxxxx"; 	//正式
} else if (Config.official === 2) {
	Config.domain = "http://xxxxxx"   //测试
} else if(Config.official === 3) {
	Config.domain = "http://localhost:8888/";	//本地
}

module.exports = Config