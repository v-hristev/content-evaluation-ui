import React, { useEffect, useState } from 'react';
import { IColumn, mergeStyleSets, TooltipHost } from '@fluentui/react';
import { ColumnHeader } from '../../components/table/ColumnHeader';
import { Table } from '../../components/table/Table';
import { DefaultPagination } from '../../config';
import { loadDocuments } from '../../services/items';
import { IFilteredField } from '../../types/requests';
import { IDocument } from '../../types/responses';

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

export interface ILoadParamsState {
    page: number;
    rowsPerPage: number;
    sortField: string;
    isSortedDescending: boolean;
    filters: IFilteredField[];
}

export const PersonalPage = () => {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState({
        items: [] as IDocument[],
        totalItems: 0 as number,
    });
    const [params, setParams] = useState<ILoadParamsState>({
        page: DefaultPagination.page,
        rowsPerPage: DefaultPagination.rowsPerPage,
        sortField: "name",
        isSortedDescending: false,
        filters: [] as IFilteredField[]
    })

    const loadItems = async (page: number, rowsPerPage: number, filters: IFilteredField[], sortColumn: string, isSortedDescending: boolean) => {
        try {
            setLoading(true);
            const skip = (page - 1) * rowsPerPage;
            const { documents, totalItems } = await loadDocuments(skip, rowsPerPage, filters, sortColumn, isSortedDescending);
            setResponse({
                items: documents,
                totalItems,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadItems(params.page, params.rowsPerPage, params.filters, params.sortField, params.isSortedDescending);
    }, [params]);

    const onColumnClick = (sortField: string) => {
        setParams({
            ...params,
            sortField: sortField,
            isSortedDescending: params.sortField === sortField 
                ? !params.isSortedDescending 
                : false,
        });
    };

    const onSearch = (fieldName: string) => (searchValue: string) => {
        const filterIndex = params.filters.findIndex(f => f.name === fieldName);
        if (!searchValue.trim()) {
            setParams({
                ...params,
                page: 1,
                filters: [
                    ...params.filters.slice(0, filterIndex),
                    ...params.filters.slice(filterIndex + 1)
                ],
            });
            return;
        }

        const filter: IFilteredField = filterIndex !== -1
            ? params.filters[filterIndex]
            : {
                name: fieldName,
                value: searchValue,
            };

        filter.value = searchValue;

        setParams({
            ...params,
            page: 1,
            filters: [
                ...params.filters.slice(0, filterIndex),
                filter,
                ...params.filters.slice(filterIndex + 1)
            ],
        });
    }

    const onRenderHeader = (fieldName: string, title: string, enableSort: boolean, enableSearch: boolean) => () => {
        const searchValue = params.filters.find(f => f.name === fieldName)?.value || "";
        return (
            <ColumnHeader 
                id={`${fieldName}-column`}
                title={title}
                isSorted={params.sortField === fieldName}
                isSortedDescending={params.isSortedDescending}
                searchValue={searchValue}
                onSearch={enableSearch ? onSearch(fieldName) : undefined}
                onSort={enableSort ? () => onColumnClick(fieldName) : undefined}
            />
        );
    }

    const columns: IColumn[] = [
        {
            key: 'column1',
            name: 'File Type',
            isIconOnly: false,
            fieldName: 'fileType',
            minWidth: 30,
            maxWidth: 60,
            onRender: (item: IDocument) => (
                <TooltipHost content={`${item.fileType} file`}>
                    <img src={item.iconName} className={classNames.fileIconImg} alt={`${item.fileType} file icon`} />
                </TooltipHost>
            ),
            onRenderHeader: onRenderHeader("fileType", "File Type", false, false),
        },
        {
            key: 'column2',
            name: 'Name',
            fieldName: 'name',
            minWidth: 100,
            maxWidth: 150,
            isResizable: true,
            data: 'string',
            onRenderHeader: onRenderHeader("name", "Наименование", true, true),
        },
        {
            key: 'column3',
            name: 'Date Modified',
            fieldName: 'dateModifiedValue',
            minWidth: 70,
            maxWidth: 190,
            isResizable: true,
            data: 'number',
            onRender: (item: IDocument) => (
                <span>{item.dateModified}</span>
            ),
            onRenderHeader: onRenderHeader("dateModifiedValue", "Основен предмет", true, false),
        },
        {
            key: 'column4',
            name: 'Modified By',
            fieldName: 'modifiedBy',
            minWidth: 70,
            maxWidth: 190,
            isResizable: true,
            isCollapsible: true,
            data: 'string',
            onRender: (item: IDocument) => (
                <span>{item.modifiedBy}</span>
            ),
            onRenderHeader: onRenderHeader("modifiedBy", "Свързан предмет", true, true),
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
            onRender: (item: IDocument) => (
                <span>{item.fileSize}</span>
            ),
            onRenderHeader: onRenderHeader("fileSizeRaw", "Клас", true, true),
        },
    ];

    return (
        <Table
            columns={columns}
            items={response.items}
            isCompactMode={false}
            loading={loading}
            pagination={{
                page: params.page,
                totalItems: response.totalItems,
                rowsPerPage: params.rowsPerPage,
                onPrevPageClick: async function (): Promise<void> {
                    if (params.page > 1) {
                        setParams({
                            ...params,
                            page: params.page - 1,
                        });
                    }
                },
                onNextPageClick: async function (): Promise<void> {
                    setParams({
                        ...params,
                        page: params.page + 1,
                    });
                },
                onRowsPerPageClick: async function (rows: number): Promise<void> {
                    setParams({
                        ...params,
                        page: 1,
                        rowsPerPage: rows,
                    });
                },
            }}
        />
    );
};
