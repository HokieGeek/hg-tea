import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js';

import { Tea } from '../tea';
import { TeaDbService } from '../teadb.service';

@Component({
    selector: 'hg-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.css'],
    providers: [ TeaDbService ]
})
export class StatsComponent implements OnInit {
    private _teas: Tea[] = [];
    private _errorMsg: any = null;

    @ViewChild('drinkingFrequency') drinkingFrequency: ElementRef;

    constructor(private teaDbService: TeaDbService) {}

    set teas(t: Tea[]) {
        this._teas = t;
    }

    get teas(): Tea[] {
        return this._teas;
    }

    get errorMsg(): any {
        return this._errorMsg;
    }

    set errorMsg(msg: any) {
        console.error('errorMsg: ', msg);
        this._errorMsg = msg;
    }

    ngOnInit() {
        this.teaDbService.teasWithEntries.subscribe(
            teas => this.teas = teas,
            err => this.errorMsg = err
        );
    }

    get totalSpent(): number {
        return this.teas.map(t => t.purchaseprice).reduce((acc, cur) => acc + cur, 0);
    }

    get totalSpentStocked(): number {
        return this.teas.filter(t => t.stocked).map(t => t.purchaseprice).reduce((acc, cur) => acc + cur, 0);
    }

    get totalSpentPerCup(): number {
        return this.totalSpent / this.teas.map(t => t.entries.length).reduce((acc, cur) => acc + cur, 0);
    }

    get teasByPricePerCup(): Tea[] {
        return this.teas.filter(t => t.pricePerCup !== -1 && !t.sample).sort((a, b) => a.pricePerCup - b.pricePerCup);
    }

    get topTenBestValues(): Tea[] {
        return this.teasByPricePerCup.slice(0, 10);
    }

    get topTenWorstValues(): Tea[] {
        return this.teasByPricePerCup.reverse().slice(0, 10);
    }

    private drawDrinkingFrequency() {
        const ctx = this.drinkingFrequency.nativeElement.getContext('2d');

        /*
        var data = {
            labels: [
                "Value A",
                "Value B"
            ],
            datasets: [
                {
                    "data": [101342, 55342],   // Example data
                    "backgroundColor": [
                        "#1fc8f8",
                        "#76a346"
                    ]
                }]
        };

        var chart = new Chart(
            ctx,
            {
                "type": 'line',
                "data": data,
                "options": {
                    "cutoutPercentage": 50,
                    "animation": {
                        "animateScale": true,
                        "animateRotate": false
                    }
                }
            }
        );
    }
        */

        /*
		function randomNumber(min, max) {
			return Math.random() * (max - min) + min;
		}

		function randomBar(date, lastClose) {
			var open = randomNumber(lastClose * 0.95, lastClose * 1.05);
			var close = randomNumber(open * 0.95, open * 1.05);
			return {
				t: date.valueOf(),
				y: close
			};
		}

		var dateFormat = 'MMMM DD YYYY';
		var date = moment('April 01 2017', dateFormat);
		var data = [randomBar(date, 30)];
		var labels = [date];
		while (data.length < 60) {
			date = date.clone().add(1, 'd');
			if (date.isoWeekday() <= 5) {
				data.push(randomBar(date, data[data.length - 1].y));
				labels.push(date);
			}
		}

		var ctx = document.getElementById('chart1').getContext('2d');
		ctx.canvas.width = 1000;
		ctx.canvas.height = 300;
		var cfg = {
			type: 'bar',
			data: {
				labels: labels,
				datasets: [{
					label: 'CHRT - Chart.js Corporation',
					data: data,
					type: 'line',
					pointRadius: 0,
					fill: false,
					lineTension: 0,
					borderWidth: 2
				}]
			},
			options: {
				scales: {
					xAxes: [{
						type: 'time',
						distribution: 'series',
						ticks: {
							source: 'labels'
						}
					}],
					yAxes: [{
						scaleLabel: {
							display: true,
							labelString: 'Closing price ($)'
						}
					}]
				}
			}
		};
		var chart = new Chart(ctx, cfg);

		document.getElementById('update').addEventListener('click', function() {
			var type = document.getElementById('type').value;
			chart.config.data.datasets[0].type = type;
			chart.update();
		});

    */
    }
}
