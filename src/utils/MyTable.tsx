import "./table.css";

import { TableHeading, TableRow } from "../types/TableTypes";

type Props = {
  headings: TableHeading[];
  data: Array<TableRow[]>;
};
function MyTable({ headings, data }: Props) {
  if (!data) return null;

  return (
    <table className="table">
      <thead>
        <tr>
          {headings.map((h, i) => (
            <th style={{ textAlign: h.align as `center` }} key={i}>
              {h.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => (
          <tr key={index}>
            {item.map(({ Action, ...d }, i) => (
              <td style={{ textAlign: d.align as "center" }} key={i}>
                {Action ? <Action /> : d.name}
              </td>
            ))}
          </tr>
        ))}
        {data && data.length === 0 && (
          <tr>
            <td colSpan={headings.length} style={{ textAlign: "center" }}>
              No data available.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default MyTable;
