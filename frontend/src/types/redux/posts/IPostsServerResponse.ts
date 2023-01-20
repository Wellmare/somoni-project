import { IPostServerResponse } from './IPostServerResponse';

import { IPaginatedResponse } from '../IPaginatedResponse';

export type IPostsServerResponse = IPaginatedResponse<IPostServerResponse[]>;
