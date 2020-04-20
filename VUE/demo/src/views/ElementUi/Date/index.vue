<template>
	<div class="date-wp">
			

		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="活动时间">
				<el-date-picker
					v-model="value1"
					type="date"
					placeholder="选择日期">
				</el-date-picker>
			</el-form-item>

			<el-form-item label="活动时间">
				<com-start-end-date :value="time1" :clearable="true" @setTimeValue="setTimeValue"></com-start-end-date>
			</el-form-item>
				
		</el-form>
	</div>
</template>
<script>

import comStartEndDate from './components/com-start-end-date.vue';

export default {
	name: 'date',
	data () {
		return {
			value1: '',
			form: {},

			time1: ['2020-01-01', '2020-04-01']
		}
	},
	components: {
		comStartEndDate
	},
	methods: {
		setTimeValue (data) {
			this.time1 = data.value;
			console.log(data);
		}
	}
}	
</script>
<style lang="scss" scoped>
.date-wp {

}
</style>
