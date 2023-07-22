import React, { PureComponent, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Chart(props) {
    const [data, setData] = React.useState([]);
    const [lines, setLines] = React.useState([]);

    useEffect(() => {
        setData(props.data);
        setLines(props.lines);
    }, [props.data]);

    useEffect(() => {
        setLines(props.lines);
    }, [props.lines]);


    return (
        <div style={{ backgroundColor: 'white' }}>
            <h2>{props.header}</h2>
            <ResponsiveContainer width="95%" height={400}>
                <LineChart width={'100%'} height={'100%'} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />

                    {lines && lines.map((item, index) => {
                        return <Line key={index} type="monotone" dataKey={item} stroke="#8884d8" activeDot={{ r: 8 }} />
                    })}

                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Chart;
