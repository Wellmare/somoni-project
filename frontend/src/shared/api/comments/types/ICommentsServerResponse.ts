import { IPaginatedResponse } from 'shared/types/server';

import { ICommentServerResponse } from './index';

export type ICommentsServerResponse = IPaginatedResponse<ICommentServerResponse[]>;
