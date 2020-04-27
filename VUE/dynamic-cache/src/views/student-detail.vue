<template>
	<div class="student-detail-wp">
		<button @click="$router.go(-1)">返回</button>
	</div>
</template>
<script>
	
export default {
	name: 'studentDetail',
	data () {
		return {
			num: 0,
		}
	},
	methods: {
	}
}	
</script>
