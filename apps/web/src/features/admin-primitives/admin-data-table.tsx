import type { ReactNode } from "react";

export interface AdminDataTableColumn<Row> {
  key: string;
  header: string;
  render: (row: Row) => ReactNode;
  align?: "start" | "end";
}

export interface AdminDataTableProps<Row> {
  caption: string;
  captionVisibility?: "visible" | "screen-reader";
  rows: readonly Row[];
  columns: readonly AdminDataTableColumn<Row>[];
  getRowKey: (row: Row) => string;
}

export function AdminRecordList<Row>({
  caption,
  rows,
  columns,
  getRowKey
}: Omit<AdminDataTableProps<Row>, "captionVisibility">) {
  return (
    <ol className="admin-record-list" data-admin-record-list aria-label={`${caption} — mobile records`}>
      {rows.map((row) => (
        <li key={getRowKey(row)}>
          <dl>
            {columns.map((column) => (
              <div key={column.key} className={`admin-record-list__field admin-record-list__field--${column.align ?? "start"}`}>
                <dt>{column.header}</dt>
                <dd>{column.render(row)}</dd>
              </div>
            ))}
          </dl>
        </li>
      ))}
    </ol>
  );
}

export function AdminDataTable<Row>({
  caption,
  captionVisibility = "visible",
  rows,
  columns,
  getRowKey
}: AdminDataTableProps<Row>) {
  return (
    <div className="admin-data-table">
      <div className="admin-data-table__desktop">
        <table>
          <caption className={captionVisibility === "screen-reader" ? "visually-hidden" : undefined}>{caption}</caption>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} scope="col" className={`admin-data-table__cell--${column.align ?? "start"}`}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={getRowKey(row)}>
                {columns.map((column) => (
                  <td key={column.key} className={`admin-data-table__cell--${column.align ?? "start"}`}>
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AdminRecordList caption={caption} rows={rows} columns={columns} getRowKey={getRowKey} />
    </div>
  );
}
