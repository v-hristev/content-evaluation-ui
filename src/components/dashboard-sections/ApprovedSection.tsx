import React, { useEffect, useState } from "react";
import { loadApprovedContent } from "../../services/items";
import { DashboardSection } from "./DashboardSection";

export const ApprovedSection = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        loadApprovedContent()
            .then((response) => {
                setItems(response.map((x: any) => ({
                    id: x.id,
                    text: x.text,
                    to: `/approved/${x.id}`,
                })));
                setLoading(false);
            });
    }, [setItems]);

    return (
        <DashboardSection title="Одобрени ДОС" items={items} loading={loading} />
    )
}