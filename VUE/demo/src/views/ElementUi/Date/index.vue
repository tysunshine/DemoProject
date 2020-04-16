<template>
	<div class="date-wp">
		<el-date-picker
			v-model="value1"
			type="date"
			placeholder="选择日期">
		</el-date-picker>
	</div>
</template>
<script>
export default {
	name: 'date',
	data () {
		return {
			value1: ''
		}
	}
}	
</script>
<style lang="scss" scoped>
.date-wp {

}
</style>
