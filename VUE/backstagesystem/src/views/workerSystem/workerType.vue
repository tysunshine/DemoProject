<template>
	<div class="worker-type-box">
		<table rules="all">
			<caption>职工类别</caption>
			<thead>
				<td>#</td>
				<td>类别</td>
				<td>职能描述</td>
			</thead>
			<tbody>
				<tr>
					<td>1</td>
					<td>校长</td>
					<td>统筹学校事务</td>
				</tr>
				<tr>
					<td>2</td>
					<td>教师</td>
					<td>教授学生知识</td>
				</tr>
				<tr>
					<td>3</td>
					<td>厨师</td>
					<td>做出美味饭菜</td>
				</tr>
				<tr>
					<td>4</td>
					<td>工人</td>
					<td>清洁、园艺、打饭等</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<style lang="scss" scoped>
	.worker-type-box {
		padding: 20px;
		table {
			width: 600px;
			caption {
				padding: 9px 15px;
				font-size: 20px;
				line-height: 30px;
			}
			td {
				padding: 9px 15px;
			}
			td:nth-child(1) {
				width: 40px;
			}
		}
	}
</style>