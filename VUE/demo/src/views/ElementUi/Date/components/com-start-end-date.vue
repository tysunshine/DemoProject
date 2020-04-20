<!-- 开始-结束时间 -->
<template>
	<div class="com-start-end-date">
		<div class="box">
			<div v-if="type" class="type-box">
				<el-radio class="type-item" v-model="dateType" label="year">年</el-radio>
				<el-radio class="type-item" v-model="dateType" label="month">月</el-radio>
				<el-radio class="type-item" v-model="dateType" label="date">日</el-radio>
			</div>
			<el-date-picker
				v-model="startTime.value"
				placeholder="选择日期"
				popper-class="time-popper"
				:style="{width: width + 'px'}"
				:size="size"
				:type="dateType"
				:clearable="clearable"
				:picker-options="startTime.picker"
				@change="startChange">
			</el-date-picker>
			<template v-if="!onlyStart">
				<span class="space">~</span>
				<el-date-picker
					v-model="endTime.value"
					placeholder="选择日期"
					popper-class="time-popper"
					:style="{width: width + 'px'}"
					:size="size"
					:type="dateType"
					:clearable="clearable"
					:picker-options="endTime.picker"
					@change="endChange">
				</el-date-picker>
			</template>
		</div>
	</div>
</template>
<script>

// 判断时间1 是否大于 时间2
function judgeTime (one, two) {
	one = new Date(one).getTime();
	two = new Date(two).getTime();
	return one > two;
}

/**
 *格式化时间
 *@param {String} time [可以new Date()的时间]
 *@param {String} format [时间格式化类型
		yyyy			年
		M				月		不用补0
		MM				月		需要补0
		W 				周		不用补0
		WW				周		需要补0
		d 				日		不用补0
		dd				日		需要补0
		H 				24小时	不用补0
		HH 				24小时	需要补0
		h 				12小时	不用补0
		hh 				12小时	需要补0
		m 				分		不用补0
		mm 				分		需要补0
		s 				秒		不用补0
		ss 				秒		需要补0
		timestamp 		时间戳
		
		例子：yyyy年MM月dd日 HH:mm:ss
 	]
 */
 function switchTime (time, format) {
 	time = time || '';
	format = format ? format : 'yyyy年MM月dd日 HH:mm:ss';

	var res = format;

	var date = new Date(time);
	var timestamp = date.getTime(),
		year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate(),
		hours = date.getHours(),
		minutes = date.getMinutes(),
		seconds = date.getSeconds(),
		week = date.getDay(); // 0是星期日

	// 判断传入是否可以转换为时间
	if (!year) {
		return time;
	}

	// 替换时间戳
	res = res.replace(/timestamp/g, timestamp);

	// 替换年
	res = res.replace(/yyyy/g, year);

	// 替换月
	res = res.replace(/MM/g, makeUpNum(month));
	res = res.replace(/M/g, month);

	// 替换日
	res = res.replace(/dd/g, makeUpNum(day));
	res = res.replace(/d/g, day);

	// 替换时
	res = res.replace(/HH/g, makeUpNum(hours));
	res = res.replace(/H/g, hours);

	// 替换分
	res = res.replace(/mm/g, makeUpNum(minutes));
	res = res.replace(/m/g, minutes);

	// 替换秒
	res = res.replace(/ss/g, makeUpNum(seconds));
	res = res.replace(/s/g, seconds);

	// 替换周
	res = res.replace(/WW/g, makeUpNum(week));
	res = res.replace(/W/g, week);

	function makeUpNum (num) {
		return num < 10 ? '0' + num : num;
	}

	return res;
}


var _this = '';

export default {
	name: 'comStartEndDate',
	data () {
		return {
			dateType: 'date', // 时间类型-year/month/date/dates/ week/datetime/datetimerange/ daterange/monthrange

			startTime: {
				value: '',
				picker: {
					disabledDate (time) {
						var res = false;

						// 不显示未来时间
						if (!_this.hasFuture && judgeTime(time, new Date())) {
							res = true;
						}

						return res;
					}
				},

			},

			endTime: {
				value: '',
				picker: {
					disabledDate (time) {
						var res = false;

						// 不显示未来时间
						if (!_this.hasFuture && judgeTime(time, new Date())) {
							res = true;
						}

						// 不小于开始时间
						if (_this.startTime.value && judgeTime(_this.startTime.value, time)) {
							res = true;
						}

						return res;
					}
				},
			},
		}
	},
	props: {
		// 值 数组 如 ['2020-04-01', '2020-04-10']
		value: {
			default: ''
		},
		// 宽度
		width: {
			default: 130
		},
		// 大小 medium/small/mini
		size: {
			default: 'mini'
		},
		// 为空，显示类型选择单选框组
		type: {
			default: ''
		},
		// 是否显示清除按钮
		clearable: {
			default: false
		},
		// 是否显示未来时间
		hasFuture: {
			default: false
		},
		// 是否只有一个时间
		onlyStart: {
			default: false
		},
		// 显示时时间格式
		format: {
			default: 'yyyy-MM-dd'
		},
	},
	beforeCreate () {
		_this = this;
	},
	mounted () {
		// 时间类型
		if (this.type) {
			this.dateType = this.type; // 设置时间类型
		}

		// 设置时间
		if (this.value && this.value instanceof Array) {
			if (this.value[0]) {
				this.startTime.value = this.value[0];
			}
			if (this.value[1]) {
				this.endTime.value = this.value[1];
			}
		}
	},
	methods: {
		// 开始时间改变
		startChange () {
			if (this.startTime.value && judgeTime(this.startTime.value, this.endTime.value)) {
				this.endTime.value = '';
			}

			this.setTime();
		},

		// 结束时间改变
		endChange () {
			if (this.endTime.value && judgeTime(this.startTime.value, this.endTime.value)) {
				this.startTime.value = '';
			}

			this.setTime();
		},

		// 设置调用改组件的值
		setTime () {
			var value = [switchTime(this.startTime.value, this.format)];
			if (!this.onlyStart) {
				value.push(switchTime(this.endTime.value, this.format));
			}

			this.$emit('setTimeValue', {
				type: this.dateType,
				value: value
			})
		}
	}
}	
</script>
<style lang="scss" scoped>
.com-start-end-date {
	display: inline-block;
	.box {
		display: flex;
		align-items: center;

		.type-box {
			&:after {
				content: '';
				display: block;
				clear: both;
			}
			.type-item {
				float: left;
				margin-right: 10px;
			}
		}

		& > .space {
			width: 20px;
			text-align: center;
		}
	}
}
</style>
<style>
.com-start-end-date .time-popper{
	position: absolute !important;
}
</style>
