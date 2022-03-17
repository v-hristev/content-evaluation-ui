import { IColumn, mergeStyleSets, Spinner, SpinnerSize, TooltipHost } from '@fluentui/react';
import React, { createContext, useEffect, useReducer, useState } from 'react';
import { Table } from '../../components/table/Table';
import { DefaultPagination } from '../../config';
import { personalContentReducer } from '../../reducers/personal-content-reducer';
import { loadDocuments } from '../../services/items';
import { IDocument, IGetDocumentsResponse } from '../../types/responses';

const classNames = mergeStyleSets({
    fileIconHeaderIcon: {
        padding: 0,
        fontSize: '16px',
    },
    fileIconCell: {
        textAlign: 'center',
        selectors: {
            '&:before': {
                content: '.',
                display: 'inline-block',
                verticalAlign: 'middle',
                height: '100%',
                width: '0px',
                visibility: 'hidden',
            },
        },
    },
    fileIconImg: {
        verticalAlign: 'middle',
        maxHeight: '16px',
        maxWidth: '16px',
    },
    controlWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    exampleToggle: {
        display: 'inline-block',
        marginBottom: '10px',
        marginRight: '30px',
    },
    selectionDetails: {
        marginBottom: '20px',
    },
});

export interface IPersonalPageProps {
    loading: boolean;
    items: IDocument[];
    page: number;
    rowsPerPage: number;
    totalItems: number;
}

export const PersonalPage = (props: IPersonalPageProps) => {
    const [page, setPage] = useState(props.page);
    const [rowsPerPage, setRowsPerPage] = useState(props.rowsPerPage);
    const [loading, setLoading] = useState(props.loading);
    const [items, setItems] = useState<any[]>(props.items);
    const [sort, setSort] = useState({
        columnKey: "name",
        isSortedDescending: false,
    });

    const loadItems = async (page: number, rowsPerPage: number, columnKey: string, isSortedDescending?: boolean) => {
        try {
            setLoading(true);
            const skip = (page - 1) * rowsPerPage;
            const { documents } = await loadDocuments(skip, rowsPerPage, columnKey, isSortedDescending);
            setItems(documents);
        } finally {
            setLoading(false);
        }
    };

    const onColumnClick = async (ev: React.MouseEvent<HTMLElement>, column: IColumn): Promise<void> => {
        const newColumns: IColumn[] = columns.slice();
        const currColumn: IColumn = newColumns.filter(currCol => column.key === currCol.key)[0];
        newColumns.forEach((newCol: IColumn) => {
            if (newCol === currColumn) {
                currColumn.isSortedDescending = !currColumn.isSortedDescending;
                currColumn.isSorted = true;
            } else {
                newCol.isSorted = false;
                newCol.isSortedDescending = true;
            }
        });
        await loadItems(page, rowsPerPage, currColumn.fieldName!, currColumn.isSortedDescending || false);
        setColumns(newColumns);
        setSort({
            columnKey: currColumn.fieldName!,
            isSortedDescending: currColumn.isSortedDescending || false,
        });
    };

    const [columns, setColumns] = useState<IColumn[]>([
        {
            key: 'column1',
            name: 'File Type',
            className: classNames.fileIconCell,
            iconClassName: classNames.fileIconHeaderIcon,
            ariaLabel: 'Column operations for File type, Press to sort on File type',
            iconName: 'Page',
            isIconOnly: true,
            fieldName: 'name',
            minWidth: 16,
            maxWidth: 16,
            onColumnClick: onColumnClick,
            onRender: (item: IDocument) => (
                <TooltipHost content={`${item.fileType} file`}>
                    <img src={item.iconName} className={classNames.fileIconImg} alt={`${item.fileType} file icon`} />
                </TooltipHost>
            ),
        },
        {
            key: 'column2',
            name: 'Name',
            fieldName: 'name',
            minWidth: 210,
            maxWidth: 350,
            isRowHeader: true,
            isResizable: true,
            isSorted: true,
            isSortedDescending: false,
            sortAscendingAriaLabel: 'Sorted A to Z',
            sortDescendingAriaLabel: 'Sorted Z to A',
            onColumnClick: onColumnClick,
            data: 'string',
            isPadded: true,
        },
        {
            key: 'column3',
            name: 'Date Modified',
            fieldName: 'dateModifiedValue',
            minWidth: 70,
            maxWidth: 90,
            isResizable: true,
            onColumnClick: onColumnClick,
            data: 'number',
            onRender: (item: IDocument) => {
                return <span>{item.dateModified}</span>;
            },
            isPadded: true,
        },
        {
            key: 'column4',
            name: 'Modified By',
            fieldName: 'modifiedBy',
            minWidth: 70,
            maxWidth: 90,
            isResizable: true,
            isCollapsible: true,
            data: 'string',
            onColumnClick: onColumnClick,
            onRender: (item: IDocument) => {
                return <span>{item.modifiedBy}</span>;
            },
            isPadded: true,
        },
        {
            key: 'column5',
            name: 'File Size',
            fieldName: 'fileSizeRaw',
            minWidth: 70,
            maxWidth: 90,
            isResizable: true,
            isCollapsible: true,
            data: 'number',
            onColumnClick: onColumnClick,
            onRender: (item: IDocument) => {
                return <span>{item.fileSize}</span>;
            },
        },
    ]);

    return (
        <>
            {loading && <Spinner size={SpinnerSize.large} />}
            {!loading && <Table
                columns={columns}
                items={items}
                isCompactMode={false}
                pagination={{
                    page: page,
                    totalItems: props.totalItems,
                    rowsPerPage: rowsPerPage,
                    onPrevPageClick: async function (): Promise<void> {
                        if (page > 1) {
                            await loadItems(page - 1, rowsPerPage, sort.columnKey, sort.isSortedDescending);
                            setPage(page - 1);
                        }
                    },
                    onNextPageClick: async function (): Promise<void> {
                        await loadItems(page + 1, rowsPerPage, sort.columnKey, sort.isSortedDescending);
                        setPage(page + 1);
                    },
                    onRowsPerPageClick: async function (rows: number): Promise<void> {
                        await loadItems(page, rows, sort.columnKey, sort.isSortedDescending);
                        setRowsPerPage(rows);
                    },
                }}
            />}
        </>
    );
};

const PersonalPageContainer = () => {
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState<IGetDocumentsResponse>();

    useEffect(() => {
        loadDocuments(0, DefaultPagination.rowsPerPage, "name", false)
            .then((resp: IGetDocumentsResponse) => {
                setResponse(resp);
                setLoading(false);
            });
    }, [setResponse])

    return (
        <>
            {loading && <Spinner size={SpinnerSize.large} />}
            {
                !loading && 
                <PersonalPage 
                    loading={loading}
                    items={response?.documents || []}
                    totalItems={response?.totalItems || 0}
                    page={response?.page || DefaultPagination.page}
                    rowsPerPage={response?.rowsPerPage || DefaultPagination.rowsPerPage}
                />
            }
        </>
    )
};

export const PersonalContentContext = createContext<any>({});


export const PersonalContentContextProvider = (): JSX.Element => {
    const [state, dispatch] = useReducer(personalContentReducer, {});
    const value = { state, dispatch };

    return (
        <PersonalContentContext.Provider value={value}>
            <PersonalPageContainer />
        </PersonalContentContext.Provider>
    )
}

export default PersonalPageContainer;