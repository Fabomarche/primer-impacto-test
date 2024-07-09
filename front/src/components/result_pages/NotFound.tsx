import { Result, Row } from 'antd';
import React, { useEffect } from 'react';
import { useLayoutContext } from '../../layout/layout-provider';
import { ResultPageProps } from './ResultPages.props';

const NotFound: React.FC<ResultPageProps> = (props) => {
    const { title, subtitle, extras } = props;
    const { layoutState, setLayoutState } = useLayoutContext();

    useEffect(() => {
        if (layoutState.displayMenu) {
            setLayoutState({
                ...layoutState,
                displayMenu: false,
            });
        } else if (!layoutState.displayMenu) {
            setLayoutState({
                ...layoutState,
                displayMenu: true,
            });
        }
    }, []);

    return (
        <Row justify="center" style={{ height: '100vh' }}>
            <Result status="404" title={title ?? '404'} subTitle={subtitle ?? 'No encontrado'} extra={extras} />
        </Row>
    );
};

export default NotFound;
