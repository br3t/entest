var test = test || {};
test.questionBuilding = {
	titles: {
		ru: 'Построение вопросов',
		en: 'Question building'
	},
	vars: [' ', 'What', 'How', 'Who', 'kind', 'like', 'is', 'are'],
	units: [{
		ru: 'Как дела?',
		txt: '{How} {are} {you}?',
		vars: ['you']
	},{
		ru: 'Кто этот мужик?',
		txt: '{Who} {is} {this} {man}?',
		vars: ['this', 'man']
	}]
};
