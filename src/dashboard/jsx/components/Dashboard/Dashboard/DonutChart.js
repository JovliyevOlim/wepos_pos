import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables, ArcElement } from "chart.js";
Chart.register(...registerables);
Chart.register(ArcElement);
class DonutChart extends Component {
    render() {
        const data = {
            weight: 0,
            defaultFontFamily: "Poppins",
            datasets: [
                {
                    data: [this.props.value, 100 - this.props.value],
                    borderWidth: 0,
                    backgroundColor: [
                        this.props.backgroundColor,
                        this.props.backgroundColor2,
                    ],
                },
            ],
        };

        const options = {
            width: 100,
            cutoutPercentage: 73,
            cutout: '75%',
            responsive: false,
            maintainAspectRatio: true,
            tooltips: { enabled: false },
            hover: { mode: null },
        };
        return (
            <div className="donught-chart" style={{ marginTop: "10px" }}>
                <Doughnut data={data} options={options} height={95} width={90} />
            </div>
        );
    }
}

export default DonutChart;
