export enum LoadingStatus {
    waiting,
    loading,
    completed,
    error
}

export interface UploadedFile {
    module_cvnpath: string;
    file: File;
    isbulk: string;
}
