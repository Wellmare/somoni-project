export type Link = string | null;

export interface IPaginatedResponse<ResultType> {
    count: number;
    next: Link;
    previous: Link;
    results: ResultType;
}
