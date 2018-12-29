<template>
	<div class="student-type-box">学生类型<br>
		<button @click="num++">+++++</button>
		{{num}}

	</div>
</template>
<script>
	export default {
		name: 'studentType',
		data () {
			return {
				num: 0
			}
		}
	}
</script>