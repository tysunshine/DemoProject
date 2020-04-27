<template>
	<div class="student-list-wp">
		<p>学生列表<button @click="$router.push('/home/studentdetail')">详情</button></p>
		<div>{{num}}</div>
		<button @click="addNum()">加</button>
	</div>
</template>
<script>
	
export default {
	name: 'studentList',
	data () {
		return {
			num: 0,
		}
	},
	methods: {
		addNum () {
			this.num++;
		}
	}
}	
</script>
