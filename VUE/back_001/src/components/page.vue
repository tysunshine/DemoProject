<template>
    <div class="text-right pg-box">
        <el-pagination 
            @size-change="handleSizeChange" 
            @current-change="handleCurrentChange" 
            :page-sizes="[10, 20, 50, 100]" 
            :page-size="pageObj.pageSize" 
            :current-page.sync="pageObj.targetPage"
            layout="total, sizes, prev, pager, next, jumper" 
            :total="pageObj.totalPage" 
            ref="box2" 
            class="page-box page-input">
        </el-pagination>
    </div>
</template>
<script>
	export default {
        name: 'pubPage',
        props:{
		    pageObj:{
		       type:Object,
		       default: () => ({})
		    },
		},
        data() {
            return {
            	
            }
        },
        created() {
        	this.$nextTick(()=>{
        		var dom = document.querySelector('.page-input input[type="number"]');
        		if(dom){
                    dom.addEventListener('keydown', function (event) {
                        var e = event || window.event || arguments.callee.caller.arguments[0];
                        if(e && (e.keyCode == 69 || e.keyCode == 110 || e.keyCode == 190)){
                            event.returnValue = false;
                        }
                    });
        		}
        	})
        },

        methods: {
        	//每页条数改变
        	handleSizeChange(val) {
                this.$emit('changePage',val,true);
            },
            //页码改变
            handleCurrentChange(val) {
            	this.$emit('changePage',val,false);
            },
        }
    }
</script>

<style lang="scss" scoped>
.pg-box {
    padding-top: 15px;
}
</style>