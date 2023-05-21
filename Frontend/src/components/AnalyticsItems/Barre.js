import React from 'react'
import { BarChart,CartesianGrid,XAxis,YAxis,Tooltip,Legend,Bar } from 'recharts'
const Barre = (props) => {
    
  return (
    <div className='col-lg-6 mt-4'>
        <BarChart width={500} height={300} data={props.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="annee" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Nbr_Etudiants" fill="#2EA1D9" />
        </BarChart>
    </div>
  )
}

export default Barre