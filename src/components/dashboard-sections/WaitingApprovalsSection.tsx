import React, { useEffect, useState } from "react";
import { loadWaitingApprovalsContent } from "../../services/items";
import { DashboardSection } from "./DashboardSection";

export const WaitingApprovalsSection = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        loadWaitingApprovalsContent()
            .then((response) => {
                setItems(response.map((x: any) => ({
                    id: x.id,
                    text: x.text,
                    to: `/waiting-approvals/${x.id}`,
                })));
                setLoading(false)
            });
    }, [setItems]);

    return (
        <DashboardSection title="ДОС чакащи за оценка" items={items} loading={loading} />
    )
}