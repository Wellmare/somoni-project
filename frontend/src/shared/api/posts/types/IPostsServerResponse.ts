import { IPostServerResponse } from 'shared/api/post/types';

import { IPaginatedResponse } from 'shared/types/server';

export type IPostsServerResponse = IPaginatedResponse<IPostServerResponse[]>;
