<template>
	<div class="course-list-wp">
		<p>课程列表</p>
		<div>{{num}}</div>
		<button @click="addNum()">加</button>
	</div>
</template>
<script>
	
export default {
	name: 'courseList',
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
