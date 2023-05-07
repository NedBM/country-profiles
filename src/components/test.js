const data = [
	{
		name: "Tailwind CSS",
		color: "rgb(30, 160, 242)",
		textColor: "rgb(43, 229, 255)",
		satisfaction: [
			{ year: 2019, rank: 1, percentage: 81 },
			{ year: 2020, rank: 1, percentage: 87 },
			{ year: 2021, rank: 1, percentage: 78 }
		],
		interest: [
			{ year: 2019, rank: 1, percentage: 50 },
			{ year: 2020, rank: 1, percentage: 62 },
			{ year: 2021, rank: 1, percentage: 51 }
		],
		usage: [
			{ year: 2019, rank: 9, percentage: 6 },
			{ year: 2020, rank: 4, percentage: 26 },
			{ year: 2021, rank: 2, percentage: 39 }
		],
		awarness: [
			{ year: 2019, rank: 8, percentage: 34 },
			{ year: 2020, rank: 2, percentage: 80 },
			{ year: 2021, rank: 2, percentage: 94 }
		]
	},
	{
		name: "Bulma",
		color: "rgb(75, 199, 125)",
		textColor: "rgb(107, 255, 179)",
		satisfaction: [
			{ year: 2019, rank: 2, percentage: 74 },
			{ year: 2020, rank: 3, percentage: 61 },
			{ year: 2021, rank: 4, percentage: 54 }
		],
		interest: [
			{ year: 2019, rank: 4, percentage: 41 },
			{ year: 2020, rank: 5, percentage: 34 },
			{ year: 2021, rank: 6, percentage: 28 }
		],
		usage: [
			{ year: 2019, rank: 5, percentage: 14 },
			{ year: 2020, rank: 5, percentage: 19 },
			{ year: 2021, rank: 5, percentage: 19 }
		],
		awarness: [
			{ year: 2019, rank: 5, percentage: 50 },
			{ year: 2020, rank: 6, percentage: 63 },
			{ year: 2021, rank: 6, percentage: 66 }
		]
	},
	{
		name: "PureCSS",
		color: "rgb(120, 84, 195)",
		textColor: "rgb(171, 120, 255)",
		satisfaction: [
			{ year: 2019, rank: 3, percentage: 67 },
			{ year: 2020, rank: 2, percentage: 71 },
			{ year: 2021, rank: 2, percentage: 70 }
		],
		interest: [
			{ year: 2019, rank: 3, percentage: 44 },
			{ year: 2020, rank: 2, percentage: 41 },
			{ year: 2021, rank: 2, percentage: 39 }
		],
		usage: [
			{ year: 2019, rank: 6, percentage: 8 },
			{ year: 2020, rank: 8, percentage: 8 },
			{ year: 2021, rank: 8, percentage: 9 }
		],
		awarness: [
			{ year: 2019, rank: 7, percentage: 39 },
			{ year: 2020, rank: 9, percentage: 42 },
			{ year: 2021, rank: 9, percentage: 42 }
		]
	},
	{
		name: "Tachyons",
		color: "rgb(239, 141, 51)",
		textColor: "rgb(255, 201, 73)",
		satisfaction: [
			{ year: 2019, rank: 4, percentage: 66 },
			{ year: 2020, rank: 6, percentage: 52 },
			{ year: 2021, rank: 9, percentage: 42 }
		],
		interest: [
			{ year: 2019, rank: 6, percentage: 39 },
			{ year: 2020, rank: 8, percentage: 29 },
			{ year: 2021, rank: 9, percentage: 22 }
		],
		usage: [
			{ year: 2019, rank: 8, percentage: 6 },
			{ year: 2020, rank: 10, percentage: 6 },
			{ year: 2021, rank: 10, percentage: 5 }
		],
		awarness: [
			{ year: 2019, rank: 10, percentage: 33 },
			{ year: 2020, rank: 10, percentage: 36 },
			{ year: 2021, rank: 10, percentage: 37 }
		]
	},
	{
		name: "Semantic UI",
		color: "rgb(254, 106, 106)",
		textColor: "rgb(255, 151, 151)",
		satisfaction: [
			{ year: 2019, rank: 5, percentage: 61 },
			{ year: 2020, rank: 7, percentage: 51 },
			{ year: 2021, rank: 5, percentage: 47 }
		],
		interest: [
			{ year: 2019, rank: 2, percentage: 45 },
			{ year: 2020, rank: 3, percentage: 40 },
			{ year: 2021, rank: 3, percentage: 35 }
		],
		usage: [
			{ year: 2019, rank: 4, percentage: 15 },
			{ year: 2020, rank: 6, percentage: 17 },
			{ year: 2021, rank: 7, percentage: 16 }
		],
		awarness: [
			{ year: 2019, rank: 4, percentage: 63 },
			{ year: 2020, rank: 5, percentage: 68 },
			{ year: 2021, rank: 5, percentage: 67 }
		]
	},
	{
		name: "Ant Design",
		color: "rgb(239, 78, 136)",
		textColor: "rgb(255, 111, 194)",
		satisfaction: [
			{ year: 2019, rank: 6, percentage: 57 },
			{ year: 2020, rank: 4, percentage: 60 },
			{ year: 2021, rank: 3, percentage: 56 }
		],
		interest: [
			{ year: 2019, rank: 5, percentage: 39 },
			{ year: 2020, rank: 4, percentage: 36 },
			{ year: 2021, rank: 4, percentage: 29 }
		],
		usage: [
			{ year: 2019, rank: 7, percentage: 8 },
			{ year: 2020, rank: 7, percentage: 14 },
			{ year: 2021, rank: 6, percentage: 16 }
		],
		awarness: [
			{ year: 2019, rank: 9, percentage: 34 },
			{ year: 2020, rank: 7, percentage: 52 },
			{ year: 2021, rank: 7, percentage: 57 }
		]
	},
	{
		name: "Materialize CSS",
		color: "rgb(65, 199, 199)",
		textColor: "rgb(93, 255, 255)",
		satisfaction: [
			{ year: 2019, rank: 7, percentage: 57 },
			{ year: 2020, rank: 5, percentage: 53 },
			{ year: 2021, rank: 6, percentage: 46 }
		],
		interest: [
			{ year: 2019, rank: 7, percentage: 37 },
			{ year: 2020, rank: 7, percentage: 29 },
			{ year: 2021, rank: 7, percentage: 25 }
		],
		usage: [
			{ year: 2019, rank: 3, percentage: 30 },
			{ year: 2020, rank: 2, percentage: 33 },
			{ year: 2021, rank: 3, percentage: 32 }
		],
		awarness: [
			{ year: 2019, rank: 3, percentage: 72 },
			{ year: 2020, rank: 3, percentage: 76 },
			{ year: 2021, rank: 3, percentage: 75 }
		]
	},
	{
		name: "UIKit",
		color: "rgb(58, 187, 179)",
		textColor: "rgb(83, 255, 255)",
		satisfaction: [
			{ year: 2019, rank: 8, percentage: 55 },
			{ year: 2020, rank: 8, percentage: 49 },
			{ year: 2021, rank: 7, percentage: 45 }
		],
		interest: [
			{ year: 2019, rank: 8, percentage: 34 },
			{ year: 2020, rank: 6, percentage: 31 },
			{ year: 2021, rank: 5, percentage: 29 }
		],
		usage: [
			{ year: 2019, rank: 10, percentage: 6 },
			{ year: 2020, rank: 9, percentage: 7 },
			{ year: 2021, rank: 9, percentage: 6 }
		],
		awarness: [
			{ year: 2019, rank: 6, percentage: 40 },
			{ year: 2020, rank: 8, percentage: 43 },
			{ year: 2021, rank: 8, percentage: 44 }
		]
	},
	{
		name: "Bootstrap",
		color: "rgb(72, 97, 236)",
		textColor: "rgb(103, 139, 255)",
		satisfaction: [
			{ year: 2019, rank: 9, percentage: 52 },
			{ year: 2020, rank: 9, percentage: 48 },
			{ year: 2021, rank: 10, percentage: 41 }
		],
		interest: [
			{ year: 2019, rank: 11, percentage: 52 },
			{ year: 2020, rank: 11, percentage: 48 },
			{ year: 2021, rank: 11, percentage: 41 }
		],
		usage: [
			{ year: 2019, rank: 1, percentage: 87 },
			{ year: 2020, rank: 1, percentage: 86 },
			{ year: 2021, rank: 1, percentage: 85 }
		],
		awarness: [
			{ year: 2019, rank: 1, percentage: 100 },
			{ year: 2020, rank: 1, percentage: 100 },
			{ year: 2021, rank: 1, percentage: 100 }
		]
	},
	{
		name: "Foundation",
		color: "rgb(255, 229, 137)",
		textColor: "rgb(255, 255, 196)",
		satisfaction: [
			{ year: 2019, rank: 10, percentage: 45 },
			{ year: 2020, rank: 11, percentage: 31 },
			{ year: 2021, rank: 11, percentage: 28 }
		],
		interest: [
			{ year: 2019, rank: 9, percentage: 28 },
			{ year: 2020, rank: 10, percentage: 23 },
			{ year: 2021, rank: 10, percentage: 20 }
		],
		usage: [
			{ year: 2019, rank: 2, percentage: 32 },
			{ year: 2020, rank: 3, percentage: 28 },
			{ year: 2021, rank: 4, percentage: 27 }
		],
		awarness: [
			{ year: 2019, rank: 2, percentage: 79 },
			{ year: 2020, rank: 4, percentage: 74 },
			{ year: 2021, rank: 4, percentage: 72 }
		]
	},
	{
		name: "Primer",
		color: "rgb(89, 158, 56)",
		textColor: "rgb(127, 226, 80)",
		satisfaction: [
			{ year: 2019, rank: 11, percentage: 42 },
			{ year: 2020, rank: 10, percentage: 44 },
			{ year: 2021, rank: 8, percentage: 42 }
		],
		interest: [
			{ year: 2019, rank: 10, percentage: 42 },
			{ year: 2020, rank: 9, percentage: 44 },
			{ year: 2021, rank: 8, percentage: 42 }
		],
		usage: [
			{ year: 2019, rank: 11, percentage: 2 },
			{ year: 2020, rank: 11, percentage: 2 },
			{ year: 2021, rank: 11, percentage: 2 }
		],
		awarness: [
			{ year: 2019, rank: 11, percentage: 18 },
			{ year: 2020, rank: 11, percentage: 22 },
			{ year: 2021, rank: 11, percentage: 24 }
		]
	}
];

const years = [2019, 2020, 2021];

const types = {
	satisfaction: "satisfaction",
	interest: "interest",
	usage: "usage",
	Awarness: "Awarness"
};

let selectedType = types.satisfaction;

// #region helpers

function throttled(callback, delay = 0) {
	let paused = false;

	return () => {
		if (paused) return;

		paused = true;
		setTimeout(() => {
			callback();
			paused = false;
		}, delay);
	};
}

// #endregion helpers

// #region colors

const documentStyles = getComputedStyle(document.body);
const colors = {
	bg: documentStyles.getPropertyValue("--color-bg"),
	text: documentStyles.getPropertyValue("--color-text"),
	axisLine: documentStyles.getPropertyValue("--color-axis-line"),
	circleShadow: documentStyles.getPropertyValue("--color-circle-shadow")
};

// #endregion colors

// #region size limits

let windowSize;
let chartSize;
let linesRectSize;

const chartMargin = {
	top: 50,
	bottom: 50,
	left: 140,
	right: 140,
	lineText: 20,
	yearAxisText: 7
};

function updateSize() {
	windowSize = {
		width: window.innerWidth,
		height: window.innerHeight
	};

	chartSize = {
		width: Math.max(windowSize.width * 0.8, 800),
		height: 640
	};

	linesRectSize = {
		width: chartSize.width - chartMargin.left - chartMargin.right,
		height: chartSize.height - chartMargin.top - chartMargin.bottom
	};
}

updateSize();

// #endregion size limits

// #region formatters

function formatPercentage(percent) {
	return `${percent}%`;
}

// #endregion formatters

// #region scales

const scaleX = d3
	.scaleBand()
	.domain(years)
	.range([0, linesRectSize.width])
	.round(true);
const scaleCenteredX = (value) => scaleX(value) + scaleX.bandwidth() / 2;

const scaleY = d3
	.scaleBand()
	.domain(d3.range(1, data.length + 1))
	.range([0, linesRectSize.height])
	.round(true);
const scaleCenteredY = (value) => scaleY(value) + scaleY.bandwidth() / 2;

// #endregion scales

const svg = d3
	.select("#chart-container")
	.append("svg")
	.attr("width", chartSize.width)
	.attr("height", chartSize.height);
const graphGroup = svg
	.append("g")
	.attr("id", "chart")
	.attr("transform", `translate(${chartMargin.left} ${chartMargin.top})`);

// #region year axis

function transformYearAxisGroups(year) {
	const x = scaleCenteredX(year);
	return `translate(${x} 0)`;
}

const yearAxisGroups = graphGroup
	.selectAll("g.year-axis")
	.data(years)
	.enter()
	.append("g")
	.classed("year-axis", true)
	.attr("transform", transformYearAxisGroups);

yearAxisGroups
	.append("text")
	.attr("font-size", "12")
	.attr("text-anchor", "middle")
	.attr("dominant-baseline", "text-after-edge")
	.attr("fill", colors.text)
	.text((year) => year)
	.attr("transform", `translate(0 ${-chartMargin.yearAxisText})`);

yearAxisGroups
	.append("text")
	.attr("font-size", "12")
	.attr("text-anchor", "middle")
	.attr("dominant-baseline", "text-before-edge")
	.attr("fill", colors.text)
	.text((year) => year)
	.attr(
		"transform",
		`translate(0 ${linesRectSize.height + chartMargin.yearAxisText})`
	);

yearAxisGroups
	.append("path")
	.attr("stroke", colors.axisLine)
	.attr("stroke-opacity", "0.4")
	.attr("stroke-width", "1")
	.attr("stroke-dasharray", "1 3")
	.attr("d", `M 0, 0 v ${linesRectSize.height}`);

// #endregion year axis

// #region data groups

const dataGroups = graphGroup
	.selectAll("g.row")
	.data(data)
	.enter()
	.append("g")
	.attr("data-row", (item) => item.name)
	.style("color", (item) => item.color)
	.classed("row", true);

// #endregion data groups

// #region lines

const drawLine = d3
	.line()
	.defined((item) => Boolean(item.rank))
	.x((item) => scaleCenteredX(item.year))
	.y((item) => scaleCenteredY(item.rank))
	.curve(d3.curveBumpX);

const lineGroups = dataGroups
	.append("g")
	.datum((item) => item[selectedType])
	.attr("fill", "none")
	.attr("stroke", "currentColor")
	.attr("stroke-linecap", "round")
	.attr("stroke-width", "5")
	.classed("lines", true);

lineGroups.append("path").attr("d", drawLine).classed("line", true);

function drawLineStart(typeData) {
	const firstTypeItem = typeData[0];
	const x = scaleCenteredX(firstTypeItem.year);
	const y = scaleCenteredY(firstTypeItem.rank);
	return `M ${x}, ${y} h -${scaleX.bandwidth() / 2}`;
}

lineGroups.append("path").classed("line-start", true).attr("d", drawLineStart);

function drawLineEnd(typeData) {
	const lastTypeItem = typeData[typeData.length - 1];
	const x = scaleCenteredX(lastTypeItem.year);
	const y = scaleCenteredY(lastTypeItem.rank);
	return `M ${x}, ${y} h ${scaleX.bandwidth() / 2}`;
}
lineGroups.append("path").classed("line-end", true).attr("d", drawLineEnd);

// #endregion lines

// #region circles

function transformCircleGroups(typeItem) {
	const x = scaleCenteredX(typeItem.year);
	const y = scaleCenteredY(typeItem.rank);
	return `translate(${x} ${y})`;
}

const circleGroups = dataGroups
	.selectAll("g.circle-group")
	.data((item) => item[selectedType])
	.enter()
	.append("g")
	.classed("circle-group", true)
	.attr("transform", transformCircleGroups);

circleGroups
	.append("circle")
	.attr("fill", colors.circleShadow)
	.attr("fill-opacity", "0.2")
	.attr("r", "19")
	.attr("cy", "7")
	.classed("circle-shadow", true);

circleGroups
	.append("circle")
	.attr("fill", colors.bg)
	.attr("stroke", "currentColor")
	.attr("stroke-width", "3")
	.attr("r", "18")
	.classed("circle", true);

circleGroups
	.append("text")
	.attr("text-anchor", "middle")
	.attr("font-size", "11")
	.attr("dominant-baseline", "central")
	.attr("fill", colors.text)
	.attr("opacity", "1")
	.classed("circle-text", true)
	.style("cursor", "default")
	.text((typeItem) => formatPercentage(typeItem.percentage));

// #endregion circles

// #region text

function transformTextStartGroups(item) {
	const firstRank = item[selectedType][0].rank;
	const x = -chartMargin.lineText;
	const y = scaleCenteredY(firstRank);
	return `translate(${x} ${y})`;
}

const textStartGroups = dataGroups
	.append("text")
	.attr("font-size", "12")
	.attr("text-anchor", "end")
	.attr("dominant-baseline", "middle")
	.attr("fill", (item) => item.textColor)
	.attr("opacity", "1")
	.attr("class", "text start-text")
	.text((item) => item.name)
	.attr("transform", transformTextStartGroups);

function transformTextEndGroups(item) {
	const itemData = item[selectedType];
	const lastRank = itemData[itemData.length - 1].rank;
	const x = linesRectSize.width + chartMargin.lineText;
	const y = scaleCenteredY(lastRank);
	return `translate(${x} ${y})`;
}

const textEndGroups = dataGroups
	.append("text")
	.attr("font-size", "12")
	.attr("text-anchor", "start")
	.attr("dominant-baseline", "middle")
	.attr("fill", (item) => item.textColor)
	.attr("opacity", "1")
	.attr("class", "text end-text")
	.text((item) => item.name)
	.attr("transform", transformTextEndGroups);

// #endregion text

// #region interaction

const interactionGroup = dataGroups.append("g").classed("interaction", true);

const interactionLineGroups = interactionGroup
	.append("g")
	.datum((item) => item[selectedType])
	.attr("fill", "none")
	.attr("stroke", "green")
	.attr("stroke-width", "50")
	.attr("opacity", "0")
	.classed("interaction-line", true);

interactionLineGroups.append("path").classed("line", true).attr("d", drawLine);
interactionLineGroups
	.append("path")
	.classed("line-start", true)
	.attr("d", drawLineStart);
interactionLineGroups
	.append("path")
	.classed("line-end", true)
	.attr("d", drawLineEnd);

// #endregion interaction

// #region hover animation

const getTransition = () => d3.transition().duration(750).ease(d3.easeCubicOut);
interactionGroup
	.on("mouseenter", function (_event, rowItemData) {
		const { name } = rowItemData;

		const selectedRow = dataGroups.filter((itemData) => itemData.name === name);
		selectedRow.transition(getTransition()).attr("opacity", "1");
		selectedRow
			.selectAll("g.lines")
			.transition(getTransition())
			.attr("stroke-width", "8");
		selectedRow
			.selectAll(".circle")
			.transition(getTransition())
			.attr("stroke-width", "4")
			.attr("r", "21");
		selectedRow
			.selectAll(".circle-shadow")
			.transition(getTransition())
			.attr("r", "23");

		const otherRows = dataGroups.filter((itemData) => itemData.name !== name);
		otherRows.transition(getTransition()).attr("opacity", "0.4");
		otherRows
			.selectAll("g.lines")
			.transition(getTransition())
			.attr("stroke-width", "5");
		otherRows
			.selectAll(".circle")
			.transition(getTransition())
			.attr("stroke-width", "0")
			.attr("r", "0");
		otherRows
			.selectAll(".circle-shadow")
			.transition(getTransition())
			.attr("r", "0");
		otherRows.selectAll(".circle-text").attr("opacity", "0");
	})
	.on("mouseleave", function (_event, rowItemData) {
		const { name } = rowItemData;

		const selectedRow = dataGroups.filter((itemData) => itemData.name === name);
		selectedRow
			.selectAll("g.lines")
			.transition(getTransition())
			.attr("stroke-width", "5");
		selectedRow
			.selectAll(".circle")
			.transition(getTransition())
			.attr("stroke-width", "3")
			.attr("r", "18");
		selectedRow
			.selectAll(".circle-shadow")
			.transition(getTransition())
			.attr("r", "19");

		const otherRows = dataGroups.filter((itemData) => itemData.name !== name);
		otherRows.transition(getTransition()).attr("opacity", "1");
		otherRows
			.selectAll(".circle")
			.transition(getTransition())
			.attr("stroke-width", "3")
			.attr("r", "18");
		otherRows
			.selectAll(".circle-shadow")
			.transition(getTransition())
			.attr("r", "19");
		otherRows.selectAll(".circle-text").attr("opacity", "1");
	});

// #endregion hover animation

// #region resize

function onResize() {
	updateSize();

	scaleX.range([0, linesRectSize.width]);

	svg.transition(getTransition()).attr("width", chartSize.width);

	yearAxisGroups
		.transition(getTransition())
		.attr("transform", transformYearAxisGroups);

	lineGroups
		.selectAll("path.line")
		.transition(getTransition())
		.attr("d", drawLine);
	lineGroups
		.selectAll("path.line-start")
		.transition(getTransition())
		.attr("d", drawLineStart);
	lineGroups
		.selectAll("path.line-end")
		.transition(getTransition())
		.attr("d", drawLineEnd);

	interactionLineGroups
		.selectAll("path.line")
		.transition(getTransition())
		.attr("d", drawLine);
	interactionLineGroups
		.selectAll("path.line-start")
		.transition(getTransition())
		.attr("d", drawLineStart);
	interactionLineGroups
		.selectAll("path.line-end")
		.transition(getTransition())
		.attr("d", drawLineEnd);

	circleGroups
		.transition(getTransition())
		.attr("transform", transformCircleGroups);

	textEndGroups
		.transition(getTransition())
		.attr("transform", transformTextEndGroups);
}

d3.select(window).on("resize", throttled(onResize, 1000));

// #endregion resize

// #region controls

function updateDataType(type) {
	selectedType = type;
	const lineGroupsToUpdate = dataGroups
		.select("g.lines")
		.datum((item) => item[selectedType]);
	lineGroupsToUpdate
		.select("path.line")
		.transition(getTransition())
		.attr("d", drawLine);
	lineGroupsToUpdate
		.select("path.line-start")
		.transition(getTransition())
		.attr("d", drawLineStart);
	lineGroupsToUpdate
		.select("path.line-end")
		.transition(getTransition())
		.attr("d", drawLineEnd);

	const circleGroupsToUpdate = dataGroups
		.selectAll("g.circle-group")
		.data((item) => item[selectedType]);
	circleGroupsToUpdate
		.transition(getTransition())
		.attr("transform", transformCircleGroups);

	textStartGroups
		.transition(getTransition())
		.attr("transform", transformTextStartGroups);
	textEndGroups
		.transition(getTransition())
		.attr("transform", transformTextEndGroups);

	const interactionLineGroupsToUpdate = dataGroups
		.select("g.interaction-line")
		.datum((item) => item[selectedType]);
	interactionLineGroupsToUpdate
		.select("path.line")
		.transition(getTransition())
		.attr("d", drawLine);
	interactionLineGroupsToUpdate
		.select("path.line-start")
		.transition(getTransition())
		.attr("d", drawLineStart);
	interactionLineGroupsToUpdate
		.select("path.line-end")
		.transition(getTransition())
		.attr("d", drawLineEnd);
}

const buttons = d3.selectAll(".controls .button");

buttons.on("click", ({ target }) => {
	const selectedType = target.dataset.type;
	buttons.each(function () {
		const button = this;
		button.dataset.type === selectedType
			? button.classList.add("active")
			: button.classList.remove("active");
	});

	updateDataType(selectedType);
});

// #endregion controls