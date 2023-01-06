import { Link } from './Link';

export interface IPaginatedResponse<ResultType> {
    count: number;
    next: Link;
    previous: Link;
    results: ResultType;
}
