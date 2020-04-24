<template>
	<div class="student-list-box">学生列表，我不缓存的！<br>
		<button @click="num++">+++++</button>
		{{num}}
	</div>
</template>
<script>
	export default {
		name: 'studentList',
		data () {
			return {
				num: 0
			}
		}
	}
</script>
<style lang="scss" scoped>
.student-list-box {
	width: 100%;
	height: 1000px;
	background: #eee;
}
</style>

