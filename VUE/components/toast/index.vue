<template>
	<div class="toast" :class="[config.type, config.position, show ? 'show' : '']">
		<div class="_inner">{{config.msg}}</div>
	</div>
</template>
<script>
export default {
	name: "Toast",
	data () {
		return {
			show: false,
			config: {
				msg: '',
				type: 'info',
				position: 'center'
			},
		}
	},
	mounted() {
		setTimeout(() => {
			this.show = true;
		}, 30);

		setTimeout(() => {
			// 2s 后通过父级移除子元素的方式来移除该组件
			this.show = false;
			setTimeout(() => {
				this.$el.parentNode.removeChild(this.$el);
			}, 300);
		}, 2500);
	}
};
</script>
<style lang="scss" scoped>
.toast {
	position: fixed;
	z-index: 9999;
	transition: all 0.3s;
	opacity: 0;
	text-align: center;
	width: 100%;

	&.show {
		opacity: 1;
	}

	._inner {
		display: inline-block;
		max-width: 90%;
		box-sizing: border-box;
		padding: 0.06rem 0.11rem;
		font-size: 0.09rem;
		background: rgba(17, 17, 17, 0.7);
		border-radius: 4px;
		border: 1px solid transparent;
		color: #fff;
		line-height: 2;
	}

	&.info {
		._inner {
			background: rgba(17, 17, 17, 0.7);
		}
	}
	&.success {
		._inner {
			background: rgba(76,175,80, 0.7);
		}
		
	}
	&.error {
		._inner {
			background: #FEF0F0;
			color: #F56C6C;
			border-color: #FDE2E2;
		}
			
	}
	&.warning {
		._inner {
			background: #FDF6EC;
			color: #E6A23C;
			border-color: #E6A23C;
		}	
	}

	&.center {
		top: 50%;
		transform: translate(0, -50%);
	}
	&.top {
		top: 0.4rem;
		transform: translate(0, 0);
	}
}
</style>