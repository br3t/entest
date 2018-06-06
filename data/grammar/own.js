var test = test || {};
test.own = {
	title: 'Own (<em>of</em> and <em>`s</em>)',
	titles: {
		ru: 'Принадлежность',
		en: 'Own'
	},
	vars: [' ', '`s', '`', 'of'],
	units: [{
		ru: 'Васина книга',
		txt: '{Basil}{`s} {book}',
		vars: ['Basil', 'book']
	}, {
		ru: 'Родители девочек',
		txt: 'Girls{`} parents'
	}, {
		ru: 'Сок апельсина',
		txt: 'Orange{ } juice',
		vars: ['juice']
	}]
};
