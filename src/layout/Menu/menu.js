// 自定义左侧导航栏内容
export function setMenu() {
	const menuList = [
		{ 
			id: 1, authName: '通知单', path: 'egg', order: 1,
			children: [
				{ id: 10, authName: '取卵通知单', path: 'egg' },
				{ id: 11, authName: '取精通知单', path: 'sperm' },
				{ id: 12, authName: '人授通知单', path: 'iui' },
				{ id: 13, authName: '解冻移植通知单', path: 'fet' }
			] 
		},
		{ 
			id: 2, authName: '当日任务汇总', path: 'rights', order: 2,
			children: [
					{ id: 20, authName: '任务清单', path: 'taskList' },
					{ id: 21, authName: '当日捡卵汇总', path: 'pickEgg' },
					{ id: 22, authName: '当日移植汇总', path: 'pickFET' },
					{ id: 23, authName: '精液汇总', path: 'semen' },
					{ id: 24, authName: '冷冻汇总', path: 'frozen' },
					{ id: 25, authName: '解冻汇总', path: 'unfreeze' }
				]  
		},
		{ 
			id: 3, authName: '信息处理', path: 'goods', order: 3,
			children: [
				{ id: 30, authName: '捡卵记录', path: 'eggRecords' },
				{ id: 31, authName: '精液处理', path: 'semenTreatment' },
				{ id: 32, authName: '胚胎观察', path: 'embryoObservation' },
				{ id: 33, authName: '鲜胚处理', path: 'freshEmbryo' },
				{ id: 34, authName: '解冻处理', path: 'thawed' },
			]   
		},
		{ 
			id: 4, authName: '耗材及备液管理', path: 'orders', order: 4,
			children: [
				{ id: 40, authName: '耗材及备液', path: 'consumables' }
			]  
		},
		{ 
			id: 5, authName: '其他', path: 'reports', order: 5,
			children: [
				{ id: 50, authName: '供精管理', path: 'spermSupply' },
				{ id: 51, authName: '液氮罐管理', path: 'tank' },
				{ id: 52, authName: '统计', path: 'statistics' }
			]
		},
	]

	return menuList
}
