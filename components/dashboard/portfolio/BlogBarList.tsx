"use client"

import { BarList } from '@tremor/react';

export const BlogBarList = ({ data }: {
    data: {
        name: string,
        value: number
    }[]
}) => (
    <>
        <BarList
            color={['green-500']}
            data={data}
            className="mx-auto !fill-green-500"

            showAnimation={true}
        />
    </>
);