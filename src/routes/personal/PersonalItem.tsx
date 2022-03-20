import React from "react";
import { useParams } from "react-router-dom";

export const PersonalItemPage = () => {
    const params = useParams();

    return (
        <h1>Personal item ({params.id}): TBD</h1>
    )
};
