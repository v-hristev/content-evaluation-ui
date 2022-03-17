export interface IComponentProps {
    children: JSX.Element
}

export interface ActionPayload<T> {
    type: string;
    payload: T;
}
