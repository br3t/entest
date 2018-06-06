var test = test || {};
test.prepositionforverbs = {
	titles: {
		ru: 'Предлоги с глаголами',
		en: 'Preposition near the Verbs'
	},
	vars: [' ', 'to', 'at', 'under', 'out of', 'for', 'up', 'down', 'off', 'into', 'from', 'on', 'out'],
	units: [{
			ru: 'Он посмотрел на неё.',
			txt: 'He looked {at} her.'
		}, {
			ru: 'Он ищет её.',
			txt: 'He is looking {for} her.'
		},
		{ txt: 'John listened {to} music.'},
		{ txt: 'She watched { } TV.'},
		{ 
			txt: 'They talked {about} love.',
			vars: ['about']
		},
		{ txt: 'The secretary talked {to} her boss'},
		{ txt: 'She told { } him about the phone call.'},
		{
			txt: 'He said {to} her that he knew {about} it.',
			vars: ['about']
		}
	]
};
