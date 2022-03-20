import React from "react";
import { useParams } from "react-router-dom";

export const ApprovedItemPage = () => {
    const params = useParams();

    return (
        <h1>Approved item ({params.id}): TBD</h1>
    )
}