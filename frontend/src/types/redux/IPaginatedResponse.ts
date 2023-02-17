import { LinkType } from './LinkType';

export interface IPaginatedResponse<ResultType> {
    count: number;
    next: LinkType;
    previous: LinkType;
    results: ResultType;
}
