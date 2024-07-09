import { HomeOutlined } from '@ant-design/icons';
import { Col, Layout, Menu, Row, message } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import { Link } from 'react-router-dom';
import { RoutesDefinition } from '../routes/routes-definition';
import styles from './AppLayout.module.scss';
import { useLayoutContext } from './layout-provider';

type Props = {
    children: JSX.Element;
};

const AppLayout = ({ children }: Props) => {
    const { layoutState } = useLayoutContext();
    const [_, messageContext] = message.useMessage();

    return (
        <Layout>
            {messageContext}
            {layoutState.displayMenu && (
                <Sider collapsible breakpoint="lg">
                    <Menu mode="vertical" className={styles.menu}>
                        <Menu.Item key="/" icon={<HomeOutlined />}>
                            <Link to={RoutesDefinition.HOME}>Inicio</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
            )}
            <Layout className={styles['inner-layout']}>
                <Content style={{ overflowY: 'auto', paddingRight: '0.5em' }}>
                    <Row style={{ padding: '0.5em 0.15em 0.5em 0.5em' }}>
                        <Col span={24}>{children}</Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout;
