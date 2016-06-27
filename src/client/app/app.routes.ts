import {provideRouter, RouterConfig} from '@angular/router';

import {AboutRoutes} from './+about/index';
import {HomeRoutes} from './+home/index';
import {MemberRoutes} from './+member/index';
import {MemberListRoutes} from './+memberList/index';

const routes:RouterConfig = [
    ...HomeRoutes,
    ...AboutRoutes,
    ...MemberRoutes,
    ...MemberListRoutes
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
];
