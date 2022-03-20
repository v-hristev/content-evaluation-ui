import React from "react";
import { IShimmerStyles, Shimmer, ShimmerElementType } from "@fluentui/react";

const shimmerWithNewElementRow = [
    { type: ShimmerElementType.circle, height: 6 },
    { type: ShimmerElementType.gap, width: 8 },
    { type: ShimmerElementType.line },
];

const shimmerWithElementRow = [
    { type: ShimmerElementType.gap, width: 14 },
    { type: ShimmerElementType.line },
];

const shimmerStyles: Partial<IShimmerStyles> = {
    root: {
        margin: "5px 0"
    }
}

export const DashboardSectionLoading = () => {
    return (
        <div>
            <Shimmer shimmerElements={shimmerWithNewElementRow} styles={shimmerStyles} />
            <Shimmer shimmerElements={shimmerWithNewElementRow} styles={shimmerStyles} />
            <Shimmer shimmerElements={shimmerWithElementRow} width="75%" styles={shimmerStyles} />
            <Shimmer shimmerElements={shimmerWithNewElementRow} styles={shimmerStyles} />
            <Shimmer shimmerElements={shimmerWithElementRow} width="70%" styles={shimmerStyles} />
        </div>
    )
}
