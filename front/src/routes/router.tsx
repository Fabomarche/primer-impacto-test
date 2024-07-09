import { Spin } from 'antd';
import React, { Suspense } from 'react';
import { Route as RouterRoute, Routes } from 'react-router-dom';
import NotFound from '../components/result_pages/NotFound';
import { RoutesDefinition } from './routes-definition';

const LoadingRoute = () => (
    <div
        style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <Spin />
    </div>
);

const Route404 = NotFound;

export type Route = {
    path: string | RoutesDefinition;
    loader: () => any;
    exact?: boolean;
};

type Props = {
    routes: Route[];
};

export default function Router(props: Props) {
    const routes = normalizeRoutes(props.routes);

    return (
        <>
            <Routes>
                {routes
                    .sort(({ exact: a }) => (a ? 0 : 1))
                    .map((route) => {
                        const RouteComponent = React.lazy(route.loader);

                        return (
                            <RouterRoute key={route.path}>
                                <RouterRoute
                                    path={route.path}
                                    element={
                                        <Suspense fallback={<LoadingRoute />}>
                                            <RouteComponent />
                                        </Suspense>
                                    }
                                />
                            </RouterRoute>
                        );
                    })}
                <RouterRoute path="*" element={<Route404 />} />
            </Routes>
        </>
    );
}

const normalizeRoutes = (routes: Route[]) => routes;
