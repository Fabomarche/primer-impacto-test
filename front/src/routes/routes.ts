import { Route } from './router';
import { RoutesDefinition } from './routes-definition';

const routes: Route[] = [
    {
        path: RoutesDefinition.HOME,
        loader: () => import('../Screens/home/home'),
        exact: true,
    },
    {
        path: RoutesDefinition.ADD,
        loader: () => import('../Screens/AddGameScreen'),
        exact: true,
    },
    {
        path: RoutesDefinition.UPDATE,
        loader: () => import('../Screens/UpdateGameScreen'),
        exact: true,
    },
];

export default routes;
