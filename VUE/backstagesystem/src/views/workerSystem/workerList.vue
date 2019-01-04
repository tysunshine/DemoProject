<template>
	<div class="worker-list-box">
		<table rules="all">
			<caption>职工列表</caption>
			<thead>
				<td>#</td>
				<td>姓名</td>
				<td>年龄</td>
				<td>类别</td>
			</thead>
			<tbody>
				<tr>
					<td>1</td>
					<td>斯考特</td>
					<td>33</td>
					<td>校长</td>
				</tr>
				<tr>
					<td>2</td>
					<td>皮尔斯</td>
					<td>33</td>
					<td>教师</td>
				</tr>
				<tr>
					<td>3</td>
					<td>大卫</td>
					<td>33</td>
					<td>厨师</td>
				</tr>
				<tr>
					<td>4</td>
					<td>小沈</td>
					<td>33</td>
					<td>工人</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<style lang="scss" scoped>
	.worker-list-box {
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