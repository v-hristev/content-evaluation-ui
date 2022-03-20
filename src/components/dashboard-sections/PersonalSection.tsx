import React, { useEffect, useState } from "react";
import { loadPersonalContent } from "../../services/items";
import { DashboardSection } from "./DashboardSection";

export const PersonalSection = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        loadPersonalContent()
            .then((response) => {
                setItems(response.map((x: any) => ({
                    id: x.id,
                    text: x.text,
                    to: `/personal/${x.id}`,
                })));
                setLoading(false);
            });
    }, [setItems]);

    return (
        <DashboardSection title="Последни мои публикации" items={items} loading={loading} />
    )
}