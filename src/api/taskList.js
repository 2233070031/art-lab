/**
 * 第二大栏
 */
import request from './request'

//查询解冻胚胎汇总的函数
export function getUnfreezeEmbryo(params) {
	return request({
		url: '/task/summary/embryo/revival',
		method: 'get',
		params
	})
}

//查询冷冻胚胎汇总的函数
export function getFreezeEmbryo(params) {
	return request({
		url: '/task/summary/embryo/frozen',
		method: 'get',
		params
	})
}

//查询精液汇总的函数
export function getSemenSummary(params) {
	return request({
		url: '/task/summary/semen',
		method: 'get',
		params
	})
}

//查询移植汇总的函数
export function getTransEmbryo(params) {
	return request({
		url: '/task/summary/embryo/trans',
		method: 'get',
		params
	})
}

//查询捡卵汇总的函数
export function getEmbryoCollect(params) {
	return request({
		url: '/task/summary/collection',
		method: 'get',
		params
	})
}

//查询任务清单的函数
export function getTaskList(params) {
	return request({
		url: '/task/summary/list',
		method: 'get',
		params
	})
}

/**
 * 批量保存捡卵汇总
 * @param {Object} data - 捡卵信息
*/
export function batchSave(data) {
	return request({
		url: '/task/summary/collection/batch-save',
		method: 'post',
		data
	})
}