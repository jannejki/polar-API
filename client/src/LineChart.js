import React, { PureComponent, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Chart(props) {
    const [data, setData] = React.useState([]);

    useEffect(() => {
        console.log('props.data: ', props.data.recharges);
        setData(props.data.recharges);
    }, [props.data]);

    return (
        <ResponsiveContainer width="95%" height={400}>
            <LineChart width={'100%'} height={'100%'} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="heart_rate_avg" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="ans_charge" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="ans_charge_status" stroke="#82ca9d" />
                <Line type="monotone" dataKey="heart_rate_variability_avg" stroke="#000000"/>
            </LineChart>
        </ResponsiveContainer>
    );
}

export default Chart;