import React, { PureComponent, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Chart(props) {
    const [data, setData] = React.useState([]);

    useEffect(() => {
        setData(props.data);
    }, [props.data]);

    return (
        <div style={{ backgroundColor: 'white' }}>
            <h2>ANS charge</h2>
            <ResponsiveContainer width="95%" height={400}>
                <LineChart width={'100%'} height={'100%'} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="ans_charge" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="ans_charge_status" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Chart;
