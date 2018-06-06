var test = test || {};
test.degreesOfComparison = {
  titles: {
    ru: 'Степени сравнения прилагательных',
    en: 'Degrees of Comparison'
  },
  vars: [' ', 'the most', 'more', 'the least', 'less', '-er', '-est', 'the', 'as', 'so'],
  units: [
  	{
    	ru: 'Василий умнее Петра.',
    	txt: 'Basil is { } smart{-er} than Peter.'
    },
    {
    	ru: 'Александр самый умный из всех.',
    	txt: 'Alex is {the} smart{-est} of all.'
    },
    {
    	ru: 'Петр глупее Василия.',
    	txt: 'Peter is {more} stupid{ } than Basil.'
    },
    {
    	ru: 'Петр самый глупый из всех.',
    	txt: 'Peter is {the most} stupid{ } of all.'
    }
  ]
};