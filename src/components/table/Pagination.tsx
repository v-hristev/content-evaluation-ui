import { Dropdown, IButtonStyles, IconButton, IDropdownOption, IDropdownStyles, IIconProps } from '@fluentui/react';
import React from 'react';
import { paginationRange } from '../../utils/helpers';

const dropdownControlledExampleOptions: IDropdownOption[] = [
    { key: 10, text: '10', selected: true },
    { key: 20, text: '20' },
    { key: 50, text: '50' },
];

const dropdownStyles: Partial<IDropdownStyles> = {
    root: {
        display: 'flex'
    },
    dropdown: {
        marginLeft: 10,
    }
};

const chevronLeftIcon: IIconProps = { iconName: 'ChevronLeft' };
const chevronRightIcon: IIconProps = { iconName: 'ChevronRight' };

const buttonStyles: IButtonStyles = {
    root: {
    backgroundColor: 'inherit'
    },
    rootDisabled: {
    backgroundColor: 'inherit'
    }
}

export interface IPaginationProps extends IPagingProps {
    onPrevPageClick: () => void;
    onNextPageClick: () => void;
    onRowsPerPageClick: (rows: number) => void;
}

export interface IPagingProps {
    page: number;
    totalItems: number;
    rowsPerPage: number;
}

export const Pagination = ({
    page,
    totalItems,
    rowsPerPage,
    onPrevPageClick,
    onNextPageClick,
    onRowsPerPageClick: onRowPerPageClick,
}: IPaginationProps) => {
    const onChange = (event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption): void => {
        onRowPerPageClick(item ? +item.key : 10);
    };

    const [from, to] = paginationRange(page, totalItems, rowsPerPage);

    console.log(from, to, page, totalItems, rowsPerPage);
    
    return (
    <div style={{display: 'flex'}}>
        <Dropdown
            label="Rows per page: "
            selectedKey={rowsPerPage}
            // eslint-disable-next-line react/jsx-no-bind
            onChange={onChange}
            placeholder="Select an option"
            options={dropdownControlledExampleOptions}
            dropdownWidth="auto"
            styles={dropdownStyles}
        />
        <p style={{
            lineHeight: "32px",
            fontSize: "14px",
            margin: "0 20px"
        }}>{from}-{to}</p>
        <IconButton iconProps={chevronLeftIcon} title="Left Icon" ariaLabel="LeftIcon" disabled={page <= 1} checked={false} styles={buttonStyles} onClick={onPrevPageClick} />
        <IconButton iconProps={chevronRightIcon} title="Right Icon" ariaLabel="RightIcon" disabled={to >= totalItems} checked={false} styles={buttonStyles} onClick={onNextPageClick} />
    </div>
    )
}