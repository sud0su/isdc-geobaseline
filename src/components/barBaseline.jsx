import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

function humanizeTableFormatter(value){
	var v= value;
	if(v>=1000 && v<1000000){
		return (parseFloat((v/1000).toPrecision(3)))+' K'
	}
	else if (v>=1000000 && v<1000000000) {
		return (parseFloat((v/1000000).toPrecision(3)))+' M'
	}else{
		if (v==null || isNaN(parseFloat(v))) {
			v=0;
		}
		return (parseFloat((v*1).toPrecision(3)))
	}
}

class BarBaseline extends React.Component {
    constructor(props) {
        super(props);
    }

    _titlebar = (chartData) => {
        let _title;
        _title = chartData.map((charttitle)=>
                charttitle.title
            )
        return _title
    }

    _valuebar = (chartData) => {
        let _value;
        _value = chartData.map((chartvalue)=>
                chartvalue.value
            )
        return _value
    }

    render() {
        const { chartData,chartTitle } = this.props;
        // console.log(chartTitle);
        // console.log(this._titlebar(chartData));
        // console.log(this._valuebar(chartData));
        const options = {
            title: {
                text: chartTitle+' Graph'
            },
            xAxis: {
                categories: this._titlebar(chartData),
                title: {
                    text: null
                }
            },
            yAxis: {
                type: 'logarithmic',
                title: {
                    text: null
                }
            },
            chart: {
                type: 'bar'
            },
            series: [{
                name: chartTitle,
                data: this._valuebar(chartData)
            }],
            tooltip: {
                formatter: function() {
                    return '<b>'+ this.x +'</b>: '+ humanizeTableFormatter(this.y);
                }
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return humanizeTableFormatter(this.y);
                        }
                    }
                }
            },
            colors: ['#CF000F'],
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            }
        }

        return (
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        )
    }
}

export default BarBaseline