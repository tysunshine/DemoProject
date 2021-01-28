
import Bus from '@/utils/bus';
import {cookie} from "@/utils/tools.js";

//公用页面
export default {
	data: function() {
		return {
			page: {
				targetPage: 1, //当前页码
				pageSize: 10, //显示条数
				totalPage: 1, //总条数
			},
			req: null, // search时拷贝查询表单
			tableLoading: false,//控制接口禁用
			// userMsg: null, //登录信息 表头会调用Bus.$on('userMsg')设置
			userMsg: {areaCode: '500107000000', hospitalName: '张三'}
		}
	},
	methods: {
		//保存登陆信息
		infoMsg(){
			// var user = cookie.get('info');
			// this.userMsg = user?JSON.parse(user):'';
			// if(!this.userMsg){
			// 	return
			// }
			Bus.$emit('userMsg',this.userMsg);
		},

		changePage(val, state) {
			if(state) { //修改显示条数
				this.page.pageSize = val;
				this.page.targetPage = 1;
			} else { //页码改变
				this.page.targetPage = val;
			}
			this.getData();
		},
		//查询数据
		search(type) {
			if (this.form) {
				this.req = JSON.parse(JSON.stringify(this.form));
			}
			this.page.targetPage = 1;
			if(type == 1){//如果类型为1时分页设置默认值
				this.page.pageSize = 10;
			}
			this.getData();
		},
        // 复制数据解除双向绑定
        copy (data) {
        	return JSON.parse(JSON.stringify(data));
        }
	},
}