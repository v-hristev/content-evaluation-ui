import React from "react";
import { useParams } from "react-router-dom";

export const WaitingApprovalItemPage = () => {
    const params = useParams();

    return (
        <h1>Waiting approval item ({params.id}): TBD</h1>
    )
}