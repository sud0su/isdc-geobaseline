import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'

import RefreshIndicator from 'material-ui/RefreshIndicator'
import Dialog from 'material-ui/Dialog'
import BarBaseline from './barBaseline'
import BaselineTable from './tableData'

import {Card} from 'material-ui/Card'
// import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import '../css/baseline.css'

const styles = {
	chip: {
		margin: 4,
		color: '#fff'
	},
	wrapper: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	container: {
		position: 'relative',
		height: '50px'
	},
	alignLeft: {
		textAlign: 'left'
	},
	alignRight: {
		textAlign: 'right'
	},
	tdValue: {
		textAlign: 'right',
		width: '25%'
	},
	drawerstyle: {
        backgroundColor: 'rgb(245, 245, 245)'
    },
    marginCard:{
        marginTop: 8
	},
	label:{
		textTransform: 'capitalize',
		color: 'rgba(0, 0, 0, 0.54)',
		fontSize: 13,
		padding: 0
	}
};

const dialogWidth = { 
	width: '80%',
	maxWidth: 'none',
};

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

let PolygonArea = '';
class IsdcBaseline extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dialogOpen: false,
			isLoading: false,
			error: null,
			results: []
		}
        window.drawBaseline = this;
	}

	componentDidMount() {
		this.handleOpen;
	}

	_getPolygonArea = (polygonArea) => {
		PolygonArea = polygonArea;		
	}

	handleOpen = () => {
		const catStatistic = document.querySelector('input[name=filter]:checked').value;
		const now = new Date();
		const year = now.getFullYear();
		const month = now.getMonth() + 1;
		const day = now.getDate();
		
		const fullDate = year+'-'+month+'-'+day;
		this.setState({ dialogOpen: true });
		this.setState({ isLoading: true });
		// console.log(this.props.urlBaseline);
		fetch(this.props.urlBaseline, {
			method: "POST",
			dataType: "JSON",
			headers: {
				'Accept': 'application/json',
				"Content-Type": "application/json; charset=utf-8",
			},
			body: JSON.stringify({
				spatialfilter: [PolygonArea],
				code: '',
				date: fullDate,
				flag: catStatistic,
				rf_type: 'GFMS + GLOFAS'
			})
		})
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('Something wrong ...');
				}
			})
			.then(data => this.setState({ results: [data.panels_list], isLoading: false }))
			// .then(function(data){console.log(data.panels);})
			.catch(error => this.setState({ error, isLoading: false }));
	}

	handleClose = () => {
		this.setState({ dialogOpen: false });
	};

	childTableData = (child, title) => {
		let tableChild;
		if(title === 'Overview of Population and Area') {
			tableChild = <BaselineTable tableData={child} tableTitle={title} />
		// } else if ( title === 'Health Facilities'){
		// 	tableChild = <BaselineTable tableData={child} tableTitle={title} />
		}
		// if (child !== undefined) {
		// 	tableChild = child.map((item) =>
		// 		<TableRow className={"tableRow"}>
		// 			<TableRowColumn className={"tableRowColumn"} style={styles.alignLeft}>{item.title}</TableRowColumn>
		// 			<TableRowColumn className={"tableRowColumn"} style={styles.tdValue}>{humanizeTableFormatter(item.value)}</TableRowColumn>
		// 		</TableRow>
		// 	)
		// }
		return tableChild
	}

	barChart = (title, child) => {
		let graphCart;
		if (title === 'Population') {
			graphCart = <div className={"box-4"}>
							<div className="boxchart">
								<BarBaseline chartData={child === undefined ? [] : child} chartTitle={title} />
							</div>
						</div>
		} else if (title === 'Buildings') {
			graphCart = <div className={"box-4"}>
							<div className="boxchart">
								<BarBaseline chartData={child === undefined ? [] : child} chartTitle={title} />
							</div>
						</div>
		} else if (title === 'Area (km2)') {
			graphCart = <div className={"box-4"}>
							<div className="boxchart">
								<BarBaseline chartData={child === undefined ? [] : child} chartTitle={title} />
							</div>
						</div>
		}
		return graphCart
	}
	
	render() {
		const {results, isLoading, error } = this.state;
		const loading = (
			<div style={styles.container}>
				<RefreshIndicator
					loadingColor="rgb(0, 188, 212)"
					size={40}
					left={-20}
					top={10}
					status={'loading'}
					style={{marginLeft: '50%'}}
				/>
			</div>
		);

		const baselineData = (
			<div>
				{results.map((panels) =>
					<div>
						<div className={"boxrow"}>
							{panels.chart.map((mapBaseline) => this.barChart(mapBaseline.title, mapBaseline.child))}
						</div>
						<div>
							{panels.tables.map((datatable) =>
								<div>
									<Card>
										<div className={"boxOption"}>
											{this.childTableData(datatable.child, datatable.title)}
											{/* <Table>
												<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
													<TableRow className={"tableRow"}>
														<TableHeaderColumn className={"tableRowColumnHeader"}>{mapBaseline.title}, <b>Total :</b> {humanizeTableFormatter(mapBaseline.total)}</TableHeaderColumn>
													</TableRow>
												</TableHeader>
												<TableBody displayRowCheckbox={false}>
													{this.childTableData(mapBaseline.child)}
												</TableBody>
											</Table> */}
										</div>
									</Card>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		);

		const tableBaseline = (
			<div className={"appdrawer"}>
				{/* <Card>
					<div className={"box"}>
						<div className={"left"}>
							<FontIcon className="material-icons" style={styles.iconBg}>view_quilt</FontIcon>
						</div>
						<div className={"right"}>
							<div className={"drawerBaseline"}>Baseline</div>
                        	<FontIcon onClick={this.handleClose} className={["material-icons","closeSubDrawer"].join(" ")}>close</FontIcon>
						</div>
					</div>

				</Card>
				<div style={styles.marginCard}></div> */}

				{baselineData}
			</div>
		);

		if (error) {
			return <p>{error.message}</p>;
		}

		const drawerBaseline = isLoading ? loading : tableBaseline;

		return (
			<div style={styles.wrapper}>
				<div className={"IconBox"}>
					<FlatButton
					label="Baseline"
					onClick={this.handleOpen}
					className={"IconClass"}
					labelStyle={styles.label}
					icon={<FontIcon 
						className={["material-icons","iconSize"].join(" ")}
						style={{'background-color': '#43A547'}}>view_quilt</FontIcon>}
					/>
				</div>

				{/* <div className={"IconBox"}>
					<FlatButton
					label="Baseline"
					onClick={this.handleOpen}
					className={"IconClass"}
					labelStyle={styles.label}
					icon={<FontIcon className={["material-icons","iconSize"].join(" ")}>view_quilt</FontIcon>}
					/>
				</div> */}

				<Dialog
					title="Baseline"
					titleClassName={"dialogTitle"}
					modal={false}
					open={this.state.dialogOpen}
					onRequestClose={this.handleClose}
					autoScrollBodyContent={true}
					contentStyle={dialogWidth}
				>
					{drawerBaseline}
				</Dialog>
				
				{/* <Drawer openSecondary={false} open={this.state.dialogOpen} containerStyle={styles.drawerstyle} width={drawerComp}>
					{drawerBaseline}
				</Drawer> */}
			</div>
		);
	}
}

export default IsdcBaseline