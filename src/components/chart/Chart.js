import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from 'react-redux';
import { selectOrderHistory } from '../../redux/slice/orderSlice';
import Card from '../card/Card';
import styles from './Chart.module.scss'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: false,
            text: "Chart.js Bar Chart",
        },
    },
};

const Chart = () => {
    const orders = useSelector(selectOrderHistory);

    // Create a new array of order status
    const array = [];
    orders.map((item) => {
        const { orderStatus } = item;
        return array.push(orderStatus);
    });

    const getOrderCount = (arr, value) => {
        return arr.filter((n) => n === value).length;
    };

    const [q1, q2, q3, q4] = [
        "Plasată",
        "În procesare",
        "Preluată",
        "Livrată",
    ];

    const placed = getOrderCount(array, q1);
    const processing = getOrderCount(array, q2);
    const shipped = getOrderCount(array, q3);
    const delivered = getOrderCount(array, q4);

    const data = {
        labels: ["Plasată", "În procesare", "Preluată", "Livrată"],
        datasets: [
            {
                label: "Număr de comenzi",
                data: [placed, processing, shipped, delivered],
                backgroundColor: "rgba(117, 90, 137, 0.5)",
            },
        ],
    };

    return (
        <div className={styles.charts}>
            <Card cardClass={styles.card}>
                <h3>Situația curentă a tuturor comenzilor</h3>
                <Bar options={options} data={data} />
            </Card>
        </div>
    );
};

export default Chart;