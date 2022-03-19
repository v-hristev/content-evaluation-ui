
import React from 'react';
import {
    Text,
    FontWeights,
    IIconProps,
    mergeStyleSets,
    SearchBox,
    IconButton,
    Icon,
    IIconStyles,
    DefaultPalette,
    Link,
    ILinkStyles,
    Callout,
    ITextStyles
} from '@fluentui/react';
import { useBoolean, useId } from '@fluentui/react-hooks';

const filterIcon: IIconProps = { iconName: "Filter" };

const styles = mergeStyleSets({
    callout: {
        width: 320,
        padding: '20px 24px',
    },
});

const sortIconStyles: Partial<IIconStyles> = {
    root: {
        color: DefaultPalette.neutralSecondary,
        position: "relative",
        top: "1px",
    }
};

const titleLinkStyles: Partial<ILinkStyles> = {
    root: {
        color: DefaultPalette.black,
        fontWeight: FontWeights.semibold,
        cursor: "pointer",
        selectors: {
            ":hover": {
                color: DefaultPalette.black,
                textDecoration: "none",
            }
        }
    }
}

const titleStyles: Partial<ITextStyles> = {
    root: {
        color: DefaultPalette.black,
        fontWeight: FontWeights.semibold,
    }
}

export interface IColumnHeaderProps {
    id: string;
    title: string;
    isSorted: boolean;
    isSortedDescending: boolean;
    searchValue?: string;
    onSearch?: (searchValue: string) => void;
    onSort?: (ev: React.MouseEvent<HTMLElement>) => void;
}

export interface IColumnSearchProps {
    id: string;
    searchValue?: string;
    onSearch: (searchValue: string) => void;
}

export const ColumnSearch = ({
    id,
    searchValue,
    onSearch,    
}: IColumnSearchProps) => {
    const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
    const buttonId = useId(id);

    return (
        <>
            <IconButton 
                id={buttonId}
                title="Филтър"
                ariaLabel="Filter"
                styles={sortIconStyles}
                iconProps={filterIcon}
                onClick={toggleIsCalloutVisible} />
            {
                isCalloutVisible &&
                    <Callout
                        role="alertdialog"
                        className={styles.callout}
                        gapSpace={0}
                        target={`#${buttonId}`}
                        onDismiss={toggleIsCalloutVisible}
                        setInitialFocus
                    >
                        <SearchBox 
                            iconProps={filterIcon}
                            defaultValue={searchValue}
                            onSearch={(newValue?: string) => {
                                toggleIsCalloutVisible();
                                onSearch(newValue || "");
                            }} />
                    </Callout>
            }
        </>
    )
}

export interface ColumnSortProps {
    title: string;
    isSorted: boolean;
    isSortedDescending: boolean;
    onSort: (ev: React.MouseEvent<HTMLElement>) => void;
}

export const ColumnSort = ({
    title,
    isSorted,
    isSortedDescending,
    onSort,
}: ColumnSortProps) => {
    const sortIconName = isSortedDescending ? "SortUp" : "SortDown";

    return (
        <Link onClick={onSort} styles={titleLinkStyles}>
            {title}
            {isSorted && <Icon iconName={sortIconName} title="Сортиране" ariaLabel={sortIconName} styles={sortIconStyles} />}
        </Link>
    );
}

export const ColumnHeader = ({
    id,
    title,
    isSorted,
    isSortedDescending,
    searchValue,
    onSearch,
    onSort,
}: IColumnHeaderProps) => {

    return (
        <div>
            {!onSort && <Text styles={titleStyles}>{title}</Text>}
            {onSort && <ColumnSort title={title} isSorted={isSorted} isSortedDescending={isSortedDescending} onSort={onSort} />}            
            {onSearch && <ColumnSearch id={id} searchValue={searchValue} onSearch={onSearch} />}
        </div>
    )
}