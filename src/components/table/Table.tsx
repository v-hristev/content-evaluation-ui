import React from "react";
import {
  DetailsListLayoutMode,
  DetailsRow,
  IColumn,
  IDetailsRowCheckStyles,
  SelectionMode,
  ShimmeredDetailsList
} from '@fluentui/react';
import { IPaginationProps, Pagination } from './Pagination';

export interface ITableProps<T> {
    columns: IColumn[];
    items: T[];
    isCompactMode: boolean;
    loading: boolean;
    pagination: IPaginationProps;
}

const detailsRowCheckStyles: Partial<IDetailsRowCheckStyles> = {
    root: {
        display: 'flex',
        justifyContent: 'end',
        selectors: {
            ':hover': {
                background: 'inherit',
                color: 'inherit'
            },
        }
    },
};

export function Table<T>({
    columns,
    items,
    isCompactMode,
    loading,
    pagination: {
        page,
        rowsPerPage,
        totalItems,
        onPrevPageClick,
        onNextPageClick,
        onRowsPerPageClick,
    }
}: ITableProps<T>) {    
    return (
        <ShimmeredDetailsList
          items={items}
          compact={isCompactMode}
          columns={columns}
          selectionMode={SelectionMode.none}
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible={true}
          enableShimmer={loading}
          onRenderDetailsFooter={() => (
            <DetailsRow
              columns={[
                {
                  key: 'column1',
                  name: '',
                  minWidth: 100,
                  data: 'string',
                  isPadded: true,
                }
              ]}
              item={{}}
              itemIndex={-1}
              groupNestingDepth={0}
              selectionMode={SelectionMode.none}
              onRenderItemColumn={() => (
                <Pagination
                  page={page}
                  totalItems={totalItems}
                  rowsPerPage={rowsPerPage}
                  onPrevPageClick={onPrevPageClick}
                  onNextPageClick={onNextPageClick}
                  onRowsPerPageClick={onRowsPerPageClick}
                />
              )}
              styles={detailsRowCheckStyles}
            />
          )}
        />
    );
};
