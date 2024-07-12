import { Table, TableProps, TableColumnsType  } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { Reference } from 'rc-table';

import React from 'react'
import { JSX } from 'react/jsx-runtime';

const CustomTable = (props: JSX.IntrinsicAttributes & TableProps<AnyObject> & TableColumnsType<AnyObject> & { children?: React.ReactNode | undefined; } & React.RefAttributes<Reference>) => {
    return (
        <>
            <Table {...props}/>
    
        </>
    )
}

export default CustomTable