import React from "react";
import { DefaultPalette, IStackItemStyles, IStackStyles, IStackTokens, PrimaryButton, Stack } from "@fluentui/react";
import { Calendar } from "../../components/calendar/Calendar";
import { useNavigate } from 'react-router-dom';

// Styles definition
const stackStyles: IStackStyles = {
    root: {
        borderLeftWidth: "1px",
        borderLeftStyle: "solid",
        borderLeftColor: DefaultPalette.themePrimary,
    },
};

const stackItemStyles: IStackItemStyles = {
    root: {
        padding: 5,
    },
};

const itemAlignmentsStackTokens: IStackTokens = {
    childrenGap: 15,
  };

export const PeriodSection = () => {
    const navigate = useNavigate();

    return (
        <section>
            <Stack styles={stackStyles} tokens={itemAlignmentsStackTokens}>
                <Stack.Item align="center" styles={stackItemStyles}>
                    <PrimaryButton text="Добави ново съдържание" onClick={() => navigate('/personal/new')} />
                </Stack.Item>
                <Stack.Item align="center" styles={stackItemStyles}>
                    <Calendar onChange={(start, end) => {
                        console.log('start ->', start?.toISOString());
                        console.log('end ->', end?.toISOString());
                    }} />
                </Stack.Item>
            </Stack>
        </section>
    )
}
