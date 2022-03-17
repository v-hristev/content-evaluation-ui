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

function _generateDocuments() {
    const items: IDocument[] = [];
    for (let i = 0; i < 500; i++) {
        const randomDate = _randomDate(new Date(2012, 0, 1), new Date());
        const randomFileSize = _randomFileSize();
        const randomFileType = _randomFileIcon();
        let fileName = _lorem(2);
        fileName = fileName.charAt(0).toUpperCase() + fileName.slice(1).concat(`.${randomFileType.docType}`);
        let userName = _lorem(2);
        userName = userName
            .split(' ')
            .map((name: string) => name.charAt(0).toUpperCase() + name.slice(1))
            .join(' ');
        items.push({
            key: i.toString(),
            name: fileName,
            value: fileName,
            iconName: randomFileType.url,
            fileType: randomFileType.docType,
            modifiedBy: userName,
            dateModified: randomDate.dateFormatted,
            dateModifiedValue: randomDate.value,
            fileSize: randomFileSize.value,
            fileSizeRaw: randomFileSize.rawSize,
        });
    }
    return items;
}

function _randomDate(start: Date, end: Date): { value: number; dateFormatted: string } {
    const date: Date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return {
        value: date.valueOf(),
        dateFormatted: date.toLocaleDateString(),
    };
}

const FILE_ICONS: { name: string }[] = [
    { name: 'accdb' },
    { name: 'audio' },
    { name: 'code' },
    { name: 'csv' },
    { name: 'docx' },
    { name: 'dotx' },
    { name: 'mpp' },
    { name: 'mpt' },
    { name: 'model' },
    { name: 'one' },
    { name: 'onetoc' },
    { name: 'potx' },
    { name: 'ppsx' },
    { name: 'pdf' },
    { name: 'photo' },
    { name: 'pptx' },
    { name: 'presentation' },
    { name: 'potx' },
    { name: 'pub' },
    { name: 'rtf' },
    { name: 'spreadsheet' },
    { name: 'txt' },
    { name: 'vector' },
    { name: 'vsdx' },
    { name: 'vssx' },
    { name: 'vstx' },
    { name: 'xlsx' },
    { name: 'xltx' },
    { name: 'xsn' },
];

function _randomFileIcon(): { docType: string; url: string } {
    const docType: string = FILE_ICONS[Math.floor(Math.random() * FILE_ICONS.length)].name;
    return {
        docType,
        url: `https://static2.sharepointonline.com/files/fabric/assets/item-types/16/${docType}.svg`,
    };
}

function _randomFileSize(): { value: string; rawSize: number } {
    const fileSize: number = Math.floor(Math.random() * 100) + 30;
    return {
        value: `${fileSize} KB`,
        rawSize: fileSize,
    };
}

const LOREM_IPSUM = (
    'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut ' +
    'labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut ' +
    'aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore ' +
    'eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt '
).split(' ');
let loremIndex = 0;
function _lorem(wordCount: number): string {
    const startIndex = loremIndex + wordCount > LOREM_IPSUM.length ? 0 : loremIndex;
    loremIndex = startIndex + wordCount;
    return LOREM_IPSUM.slice(startIndex, loremIndex).join(' ');
}

function sort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
    const key = columnKey as keyof T;
    return items.sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
}

const allDocuments = _generateDocuments();

export interface IGetDocumentsRequest {
    skip: number;
    take: number;
    columnKey: string;
    isSortedDescending?: boolean;
}

export interface IGetDocumentsResponse {
    totalItems: number;
    documents: IDocument[];
}

export const loadDocuments = (
    skip: number,
    take: number,
    columnKey: string,
    isSortedDescending?: boolean,
): Promise<IGetDocumentsResponse> => {
    return new Promise<IGetDocumentsResponse>((resolve, reject) => {        
        setTimeout(() => {
          resolve({
              totalItems: allDocuments.length,
              documents: sort(allDocuments.slice(skip, take), columnKey, isSortedDescending),
          });
        }, 500);
      });
}