import React from "react";
import { Callout, Text, FontWeights, mergeStyleSets, DirectionalHint } from "@fluentui/react";

const styles = mergeStyleSets({
    callout: {
        width: 320,
        padding: '20px 24px',
    },
    title: {
        marginBottom: 12,
        fontWeight: FontWeights.semilight,
    },
});

export interface IUserInformationCalloutProps {
    id: string;
    toggleCallout: () => void;
}

export const UserInformationCallout = ({
    id,
    toggleCallout,
}: IUserInformationCalloutProps) => {
    return (
        <Callout
            // ariaLabelledBy={labelId}
            // ariaDescribedBy={descriptionId}
            className={styles.callout}
            target={`#${id}`}
            onDismiss={toggleCallout}
            directionalHint={DirectionalHint.bottomRightEdge}
            setInitialFocus
        >
            <Text block variant="xLarge" className={styles.title}>
                User Information
            </Text>
            <Text block variant="small">
                Message body is optional. If help documentation is available, consider adding a link to learn more at the
                bottom.
            </Text>
        </Callout>
    )
}