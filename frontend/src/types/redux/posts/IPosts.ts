import { IPost } from './IPost';

import { IPaginatedResponse } from '../IPaginatedResponse';

export type IPosts = IPaginatedResponse<IPost[]>;
