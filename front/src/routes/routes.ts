import { Route } from './router';
import { RoutesDefinition } from './routes-definition';

const routes: Route[] = [
    {
        path: RoutesDefinition.HOME,
        loader: () => import('../components/home/home'),
        exact: true,
    },
    {
        path: RoutesDefinition.ADD,
        loader: () => import('../components/AddGameScreen'),
        exact: true,
    },
];

export default routes;
