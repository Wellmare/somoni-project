import { LinkType } from 'shared/types/server';

export interface IPaginatedResponse<ResultType> {
    count: number;
    next: LinkType;
    previous: LinkType;
    results: ResultType;
}
