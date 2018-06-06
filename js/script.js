var testOptions = {
	lang: "ru",
	checkingTestMode: false,
	unitsPerPage: 3,
	currentSlide: 'themes-list-grammar'
};

var selectedThemes = [];

testOptions.showSlide = function(slideId) {
	var ctx = this;
	if(ctx.currentSlide != slideId) {
		ctx.currentSlide = slideId;
		$('.slide').fadeOut(200);
		setTimeout(function() {
			$('.slide[data-slide="' + slideId + '"]').fadeIn(200);
		}, 200);
		if($('.show-slide[data-slide="' + slideId + '"]').size()) {
			$('.show-slide').removeClass('active');
			$('.show-slide[data-slide="' + slideId + '"]').addClass('active');
		}
	}
};

//* gen grammar theme-list
testOptions.generateTestThemesList = function() {
	var ctx = this;
	var  totalTasksGrammar = 0;
	var themeTpl = _.template($("#theme-tpl").text());
	_.each(test, function(tst, slug) {
		$('.themes-list-grammar').append(themeTpl({
			theme: tst.titles ? tst.titles[ctx.lang] : tst.title,
			slug: slug,
			tasks: tst.units.length
		}));
		totalTasksGrammar += tst.units.length;
	});
	$('.themes-list-grammar .total-tasks').text(totalTasksGrammar);
};

//* gen words theme-list
testOptions.generateWordThemesList = function() {
	var totalTasksWords = 0;
	var themeTpl = _.template($("#theme-tpl").text());
	_.each(wordsTest, function(tst, slug) {
		$('.themes-list-words').append(themeTpl({
			theme: tst.titles ? tst.titles[ctx.lang] : tst.title,
			slug: slug,
			tasks: tst.units.length
		}));
		totalTasksWords += tst.units.length;
	});
	$('.themes-list-words .total-tasks').text(totalTasksWords);
};


$(document).ready(function() {
	var ctx = testOptions;

	ctx.generateTestThemesList();
	//ctx.generateWordThemesList();

	//* switch slide
	$('body').on('click', '.show-slide', function() {
		var slideId = $(this).attr('data-slide');
		ctx.showSlide(slideId);		
	});

	$('body').on('click', '.variant', function() {
		var unit = $(this).closest('.unit-item');
		var position = unit.find('.answer:not(.ready)').eq(0);
		if(!ctx.checkingTestMode) {
			if (position) {
				position.text($(this).text());
				position.addClass('ready');
			}
		}
	});

	$('body').on('click', '.answer', function() {
		if(!ctx.checkingTestMode) {
			$(this).html('&nbsp;').removeClass('ready');
		}
	});

	$('.check').click(function() {
		var units = 0;
		var correct = 0;
		var textResult = '';
		$('.tests .unit-item').each(function() {
			units++;
			var isCorrect = 1;
			$(this).find('.answer').each(function() {
				$(this).removeClass('wrong').removeClass('correct');
				/*if($(this).attr('data-answer') == ' ') {
					$(this).attr('data-answer', '&nbsp;');
				}*/
				if ($(this).text() == $(this).attr('data-answer')) {
					$(this).addClass('correct');
				} else {
					$(this).addClass('wrong');
					$(this).html('<s>' + $(this).text() + '</s> ' + $(this).attr('data-answer'));
					isCorrect = 0;
				}
			});
			$(this).removeClass('wrong-unit').removeClass('correct-unit');
			if (isCorrect) {
				$(this).addClass('correct-unit');
				correct++;
			} else {
				$(this).addClass('wrong-unit');
			}
		});
		textResult += correct + '/' + units;
		var percents = Math.floor(100 * correct/units);
		textResult += ', ' + percents + '% - ';
		if(percents == 100) {
			textResult += 'Вы просто гений!';//'You are genious!';
		} else if(percents > 90) {
			textResult += 'Превосходно!';//'Excellent!';
		} else if(percents > 80) {
			textResult += 'Неплохо.';//'Not bad.';
		} else if(percents > 60) {
			textResult += 'Хороший результат.';//'Quite good.';
		} else if(percents > 40) {
			textResult += 'Может, иногда стоит заглядывать в учебник?';//'Mmm, read the rules one more time.';
		} else {
			textResult += 'Плохие новости для вас...';//'Really bad news for you...';
		}
		$('.test-result').text(textResult);
		$(this).attr('disabled', 'disabled');
		$('.restart').removeAttr('disabled');
		ctx.checkingTestMode = true;
	});

	//* start test
	$('.startTest, .restart').click(function() {
		selectedThemes = [];
		$('.check').removeAttr('disabled');
		$('.restart').attr('disabled', 'disabled');
		$('.test-result').text('');
		$('.theme-checkbox').each(function() {
			if ($(this).is(':checked')) {
				selectedThemes.push($(this).attr('data-theme'));
			}
		});
		if (selectedThemes.length) {
			selectUnits();
			ctx.showSlide("tests-grammar");
			ctx.checkingTestMode = false;
		} else {
			alert('You need to check at least one theme before start!');
		}
	});


	function selectUnits() {
		//* gen units here
		var selectedUnits = [];
		_.each(selectedThemes, function(theme) {
			//alert(theme);
			_.each(test[theme].units, function(unt) {
				var u = _.clone(unt);
				if (u.vars) {
					u.vars = u.vars.concat(test[theme].vars);
				} else {
					u.vars = test[theme].vars;
				}
				//* upd "space" view
				_.each(u.vars, function(i, a) {
					if(i == ' ') {
						u.vars[a] = '&nbsp;';
					}
				});
				selectedUnits.push(u);
			});
		});
		//console.log(selectedUnits);
		var tstTpl = _.template($("#test-tpl").text());
		selectedUnits = _.shuffle(selectedUnits);
		$('.tests').html('');
		for (var i = 0; i < testOptions.unitsPerPage; i++) {
			if (selectedUnits[i]) {
				var content = selectedUnits[i].txt.replace(/{([\w\s\`]*)}/g, '<span class="answer" data-answer="$1">&nbsp;</span>');
				$('.tests').append(tstTpl({
					i: i+1,
					ru: selectedUnits[i].ru,
					content: content,
					vars: _.shuffle(selectedUnits[i].vars)
				}));
			}
		}
	}

	$('.selectAllThemes').click(function() {
		var mainCheckboxChecked = $(this).prop('checked');
		$(this).closest('.themes-list').find('.theme-item').each(function() {
			if(mainCheckboxChecked) {
				$(this).find('input').prop('checked', true);
			} else {
				$(this).find('input').prop('checked', false);
			}
		});
	});

	$('.themeSelection').click(function() {
		ctx.showSlide("themes-list-grammar");
	});

	$('.unitsInTest').change(function() {
		testOptions.unitsPerPage = $(this).val();
	});

	/*
	if(window.localStorage.name) {
		alert('Hello, ' + window.localStorage.name);
	} else {
		window.localStorage.name = prompt('What is your name?');
	}
	*/

});