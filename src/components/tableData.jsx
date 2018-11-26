import React from 'react'

import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'

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


class BaselineTable extends React.Component {
    constructor(props) {
        super(props);
    }

    _columnName = (tableTitle) => {
        let _column;
        if(tableTitle === 'Overview of Population and Area'){
            _column = [
                {
                    headerName: 'Region', width: 100, field: 'region', filter: 'agTextColumnFilter'
                },
                {
                    headerName: 'Buildings', width: 100, field: 'building'
                },
                {
                    headerName: 'Settlements', width: 125, field: 'settlement'
                },
                {
                    headerName: 'Built-Up',
                    children: [
                        {headerName: 'Pop', width: 100, field: 'pop_bu'},
                        {headerName: 'Area (km2)', width: 125, field: 'area_bu'},
                    ]
                },
                {
                    headerName: 'Cultivated',
                    children: [
                        {headerName: 'Pop', width: 100, field: 'pop_c'},
                        {headerName: 'Area (km2)', width: 125, field: 'area_c'},
                    ]
                },
                {
                    headerName: 'Barren/Rangeland',
                    children: [
                        {headerName: 'Pop', width: 100, field: 'pop_br'},
                        {headerName: 'Area (km2)', width: 125, field: 'area_br'},
                    ]
                },
                {
                    headerName: 'Total',
                    children: [
                        {headerName: 'Pop', width: 100, field: 'pop_t'},
                        {headerName: 'Area (km2)', width: 125, field: 'area_t'},
                    ]
                }
            ]
        }
        return _column
    }

    _tableData = (tableData, tableTitle) => {
        let _data = [];
        let _data_ = [];
        if (tableTitle === 'Overview of Population and Area') {
            for (var i = 0; i < tableData.length; i++) {
                for (var j = 0; j < tableData[i].length; j++) {
                    _data[i] = {
                        "region": tableData[i][0],
                        "building": humanizeTableFormatter(tableData[i][1]),
                        "settlement": humanizeTableFormatter(tableData[i][2]),
                        "pop_bu": humanizeTableFormatter(tableData[i][3]),
                        "area_bu": humanizeTableFormatter(tableData[i][4]),
                        "pop_c": humanizeTableFormatter(tableData[i][5]),
                        "area_c": humanizeTableFormatter(tableData[i][6]),
                        "pop_br": humanizeTableFormatter(tableData[i][7]),
                        "area_br": humanizeTableFormatter(tableData[i][8]),
                        "pop_t": humanizeTableFormatter(tableData[i][9]),
                        "area_t": humanizeTableFormatter(tableData[i][10])
                    }
                }
            }
        }
        return _data
    }

    render() {
        const { tableData, tableTitle } = this.props;

        return (
            <div
                className="ag-theme-balham"
                style={{
                    height: '500px',
                    width: '100%'
                }}
            >
                <AgGridReact
                    columnDefs={this._columnName(tableTitle)}
                    rowData={this._tableData(tableData, tableTitle)}
                    enableSorting={true}
                    enableFilter={true}
                >
                </AgGridReact>
            </div>
        )
    }
}

export default BaselineTable