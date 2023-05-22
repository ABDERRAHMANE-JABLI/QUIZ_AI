import React from 'react'
import { LineChart,CartesianGrid,XAxis,YAxis,Tooltip,Legend,Line } from 'recharts'

const Linechart = (props) => {
  return (
    <div className='col-lg-6 mt-4'>
        <LineChart width={500} height={300} data={props.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" strokeWidth={3} stroke="#8884d8" />
            <Line type="monotone" dataKey="uv" strokeWidth={3} stroke="#db4122" />
        </LineChart>
    </div>
  )
}

export default Linechart