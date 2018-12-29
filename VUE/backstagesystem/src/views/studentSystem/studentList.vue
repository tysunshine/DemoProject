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