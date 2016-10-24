$.get('/api/interval/history', {intervalCount: 7}, function(res) {
		var intervalArray = res.intervals;
		$.get('/api/chunk/history', function(chunkRes) {
			var chunks = chunkRes.chunks;

			//just for testing, delet later
			var challArr = [];
			var skillArr = [];
			var activityLabel = [];
			var caffeineArr = [];
			var snackArr = [];
			var floArr = [];
			var mealsArr = [];
			var sleepArr = [];
			var taskLength = [];

			function getchallArr (arr){
				for(var i in arr){
					challArr.push(arr[i].perceivedChallenge);
				}
			}
			getchallArr(intervalArray);

			function getskillArr (arr){
				for(var i in arr){
					skillArr.push(arr[i].percievedSkill);
				}
			}
			getskillArr(intervalArray);

			function getActivity (arr){
				for(var i in arr){
					activityLabel.push(arr[i].activity);
				}
			}
			getActivity(intervalArray);

			function getSnacks (arr){
				for(var i =0; i <arr.length; i++){
					snackArr.push(intervalArray[i].snack);
				}
			}
			getSnacks(intervalArray);

			function getCaffeine (arr){
				for(var i =0; i <arr.length; i++) {
					caffeineArr.push(intervalArray[i].caffeine);
				}
			}
			getCaffeine(intervalArray);

			function getMadFlo (arr){
				for(var i in arr){
					if (arr[i].flow){
						floArr.push(arr[i].flow);
					} else {
						floArr.push(null);
					}
				}  
				console.log("floarr" + floArr);
			}
			getMadFlo(intervalArray);

			function mealsEaten (arr){
				for(var i in arr){
					mealsArr.push(arr[i].mealsEaten);
				}
			}
			mealsEaten(chunks);

			function sleepSlept (arr){
				for(var i in arr){
					sleepArr.push(arr[i].hoursSlept);
				}
			}
			sleepSlept(chunks);
			
			console.log(caffeineArr);
			console.log(snackArr);
			console.log(mealsArr);
			console.log(sleepArr);

			//the high chart function
			$(function () {
				$('#container').highcharts({
					chart: {
						zoomType: 'xy'
					},
					title: {
						text: 'Find yo flo mo jo'
					},
					subtitle: {
						text: 'last seven intervals'
					},
					xAxis: [{
						categories: activityLabel,
						crosshair: true
					}],
					yAxis: [{ // Primary yAxis
						labels: {
							format: '{value}',
							style: {
								color: Highcharts.getOptions().colors[2]
							}
						},
						title: {
							text: 'floPoint® metric',
							style: {
								color: Highcharts.getOptions().colors[2]
							}
						},
						opposite: true

					}, { // Secondary yAxis
						gridLineWidth: 0,
						title: {
							text: 'Bar Values',
							style: {
								color: Highcharts.getOptions().colors[0]
							}
						},
						labels: {
							format: '{value}',
							style: {
								color: Highcharts.getOptions().colors[0]
							}
						}

					}, { // Tertiary yAxis
						gridLineWidth: 5,
						title: {
							text: 'Flo',
							style: {
								color: Highcharts.getOptions().colors[1]
							}
						},
						labels: {
							format: '{value}',
							style: {
								color: Highcharts.getOptions().colors[1]
							}
						},
						opposite: true
					}],
					tooltip: {
						shared: true
					},
					legend: {
						layout: 'vertical',
						align: 'left',
						x: 80,
						verticalAlign: 'top',
						y: 55,
						floating: true,
						backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#ffefd5'
					},
					series: [{
						name: 'Percieved Skill',
						type: 'column',
						yAxis: 1,
						data: skillArr,
						tooltip: {
							valueSuffix: ' self reported'
						}

					}, {
						name: 'Percieved Challenge',
						type: 'column',
						yAxis: 1,
						data: challArr,
						tooltip: {
							valueSuffix: ' self reported'
						}
					}, {
						name: 'Caffeine',
						type: 'column',
						yAxis: 1,
						data: caffeineArr,
						tooltip: {
							valueSuffix: ' self reported'
						}

					}, {
						name: 'Snacks',
						type: 'column',
						yAxis: 1,
						data: snackArr,
						tooltip: {
							valueSuffix: ' self reported'
						}
					}, {
						name: 'Hours Slept',
						type: 'column',
						yAxis: 1,
						data: sleepArr,
						tooltip: {
							valueSuffix: ' self reported'
						}

					}, {
						name: 'Meals Eaten',
						type: 'column',
						yAxis: 1,
						data: mealsArr,
						tooltip: {
							valueSuffix: ' self reported'
						}

					},  {
						name: 'Flo',
						type: 'spline',
						lineWidth: 10,
						data: floArr,
						tooltip: {
							valueSuffix: ' floPoint®'
						}
					}]
			});
		});
	});
});