"use client";

import { BarChart } from '@tremor/react';
function PorfolioBarChart({ data }: {
    data: {
        date: string;
        views: number;
    }[];
}) {


    const dataFormatter = (number: number) =>
        Intl.NumberFormat('us').format(number).toString();


    return (
        <BarChart
            className="basis-4/6 mx-auto border rounded-xl !fill-green-500"
            data={data}
            index="date"
            categories={['views']}
            colors={['green']}
            yAxisWidth={48}
            showXAxis={true}
            showYAxis={true}
            valueFormatter={dataFormatter}
            showAnimation={true}
            showTooltip={true}
            showLegend={true}
        />
    )
}

export default PorfolioBarChart