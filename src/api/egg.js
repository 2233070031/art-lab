import request from './request'
/**
 * 第一大栏
 */

//查询取卵通知单的函数
export function getEggNotice(params) {
	return request({
		url: '/notify/opu',
		method: 'get',
		params
	})
}

//查询取精通知单的函数
export function getSperm(params) {
	return request({
		url: '/notify/sperm',
		method: 'get',
		params
	})
}

//查询人授通知单的函数
export function getIui(params) {
	return request({
		url: '/notify/iui',
		method: 'get',
		params
	})
}

//查询FET通知单的函数
export function getFet(params) {
	return request({
		url: '/notify/fet',
		method: 'get',
		params
	})
}


