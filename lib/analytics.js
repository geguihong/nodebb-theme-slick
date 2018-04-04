define('admin/plugins/analytics', ['Chart'], function (Chart) {
	var Plugin = {};

	Plugin.init = function () {
        var reducer = function(sum, cur) {
            return sum + cur;
        }
        var $dom = $('#insta360-analytics');
        var canvas1 = document.getElementById('topicCanvas');
        var canvas2 = document.getElementById('postCanvas');

		var	dailyLabels = function(from, amount) {
            return utils.getDaysArray(from, amount).map(function (text, idx) {
                return idx % 3 ? '' : text;
            });
        }
        
        var chartConfig = {
            'topics:daily': {
                labels: [],
                datasets: [
                    {
                        label: '',
                        backgroundColor: 'rgba(171,70,66,0.2)',
                        borderColor: 'rgba(171,70,66,1)',
                        pointBackgroundColor: 'rgba(171,70,66,1)',
                        pointHoverBackgroundColor: '#fff',
                        pointBorderColor: '#fff',
                        pointHoverBorderColor: 'rgba(171,70,66,1)',
                        data: [],
                    },
                ],
            },
            'posts:daily': {
                labels: [],
                datasets: [
                    {
                        label: '',
                        backgroundColor: 'rgba(161,181,108,0.2)',
                        borderColor: 'rgba(161,181,108,1)',
                        pointBackgroundColor: 'rgba(161,181,108,1)',
                        pointHoverBackgroundColor: '#fff',
                        pointBorderColor: '#fff',
                        pointHoverBorderColor: 'rgba(161,181,108,1)',
                        data: [],
                    },
                ],
            },
        };

        var graphList = []
        function init() {
            graphList[0] = new Chart(canvas1.getContext('2d'), {
                type: 'line',
                data: chartConfig['topics:daily'],
                options: {
                    responsive: true,
                    animation: false,
                    legend: {
                        display: false,
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                            },
                        }],
                    },
                },
            });
    
            graphList[1] = new Chart(canvas2.getContext('2d'), {
                type: 'line',
                data: chartConfig['posts:daily'],
                options: {
                    responsive: true,
                    animation: false,
                    legend: {
                        display: false,
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                            },
                        }],
                    },
                },
            });
        }

        function update(data, opts) {
            $dom.find('#topicCount').text(data['topics:daily'].reduce(reducer));
            $dom.find('#postCount').text(data['posts:daily'].reduce(reducer));

            graphList[0].data.datasets[0].data = data['topics:daily'];
            graphList[0].data.labels = dailyLabels(opts.from, opts.amount);
            graphList[0].update();

            graphList[1].data.datasets[0].data = data['posts:daily'];
            graphList[1].data.labels = dailyLabels(opts.from, opts.amount);
            graphList[1].update();
        }

        function request(input) {
            socket.emit('plugins.insta360.getSummary', input, function(err, data) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(data);
                update(data, {
                    from: input.endTime,
                    amount: input.dayCount
                });
            })
        }

        function submit() {
            // NEED TO ADD VALIDATION HERE FOR YYYY-MM-DD
            var beginTime = $dom.find('#startRange').val();
            var endTime = $dom.find('#endRange').val();
            var cid = $dom.find('#category').val();

            if (beginTime && endTime) {
                endTime = new Date(endTime).getTime();
                beginTime = new Date(beginTime).getTime();
                if (beginTime > endTime) {
                    alert('开始日期不能晚于结束日期');
                    return;
                }
                var dayCount = Math.floor((endTime - beginTime) / (24*3600*1000)) + 1;
                
                request({
                    cid: cid,
                    dayCount: dayCount,
                    endTime: endTime,
                })
            }
        }

        $dom.find('[data-role="submit"]').click(function() {
            submit();
        })
        init();
	};

	return Plugin;
});
