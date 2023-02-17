export interface IDataToGetPosts {
    page: number;
    tag?: string;
}
export interface IDataToEditPost {
    id: string;
    formData: FormData;
}
export interface IDataToDelete {
    id: string;
}
