import React from "react"
interface TableHeading {
    name: string,
    align: string,
}
type Props = {}
interface TableRow extends TableHeading {
    Action?: React.FunctionComponent<Props>
}


// export default TableHeading

export type { TableHeading, TableRow }