export interface IDataToGetPosts {
    page: number;
    tag?: string;
}
export interface IDataToEditPost {
    id: number;
    formData: FormData;
}
export interface IDataToDelete {
    id: number;
}
