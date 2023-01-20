import { ICommentServerResponse } from './ICommentServerResponse';

import { IPaginatedResponse } from '../IPaginatedResponse';

export type ICommentsServerResponse = IPaginatedResponse<ICommentServerResponse[]>;
