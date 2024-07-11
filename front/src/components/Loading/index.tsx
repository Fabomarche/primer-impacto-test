import { Spin, SpinProps } from 'antd';
import { JSX } from 'react/jsx-runtime';

const Loading = (props: JSX.IntrinsicAttributes & SpinProps) => {
    return (
        <>
            <Spin tip="Loading" {...props}> </Spin>
        </>
    )
}

export default Loading