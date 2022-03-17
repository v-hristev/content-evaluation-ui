export interface IDocument {
    key: string;
    name: string;
    value: string;
    iconName: string;
    fileType: string;
    modifiedBy: string;
    dateModified: string;
    dateModifiedValue: number;
    fileSize: string;
    fileSizeRaw: number;
}

export interface IGetDocumentsResponse {
    page: number;
    rowsPerPage: number;
    totalItems: number;
    documents: IDocument[];
}
