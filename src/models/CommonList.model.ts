export interface Meta {
    total_count:  number;
    filter_count: number;
}


export interface CommonList<DataModel> {
    meta: Meta;
    data: DataModel[];
}