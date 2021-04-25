import styled from "styled-components";

const StyledTable = styled.table`
    width: 100%;
    thead {
        tr {
            th {
                border: solid 1px #ddd;
                padding: 5px 8px;
            }
        }
    }
    tbody {
        tr:nth-child(even) {
            background: #fff;
        }
        tr:nth-child(odd) {
            background: #f2f2f2;
        }
        tr:hover {
            background: #b8e9f4;
        }
        tr {
            th,td {
                border: solid 1px #ddd;
                padding: 5px 8px;
                text-align: center;
                .actions-col {
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
`;

export interface IColumn {
    title: string,
    key: string,
    render?: (row: any, column: IColumn) => React.ReactElement
}

type TableProps = {
    columns: IColumn[],
    dataSource: any[],
    rowKey: string
}

export function Table({
    columns,
    dataSource,
    rowKey
 }: TableProps) {
    return (
        <StyledTable>
            <thead>
                <tr>
                    {
                        columns.map(col => (
                            <th key={col.key}>{col.title}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    dataSource.map(row => (
                        <tr key={row[rowKey]}>
                            {
                                columns.map(col => (
                                    <td key={col.key}>{col.render ? col.render(row, col) : row[col.key]}</td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </StyledTable>
    )
}