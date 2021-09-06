import MaUTable from "@material-ui/core/Table";
import { useMemo } from "react";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useTable, useFilters } from "react-table";

function dateBetweenFilterFn(rows, id, filterValues) {
  let sd = new Date(filterValues[0]);
  let ed = new Date(filterValues[1]);
  console.log(rows, id, filterValues);
  return rows.filter((r) => {
    var time = new Date(r.values[id]);
    console.log(time, ed, sd);
    if (filterValues.length === 0) return rows;
    return time >= sd && time <= ed;
  });
}
dateBetweenFilterFn.autoRemove = (val) => !val;

export function Table({ columns, data }) {
  const filterTypes = useMemo(
    () => ({
      dateBetween: dateBetweenFilterFn /*<- LIKE THIS*/,
    }),
    []
  );

  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      filterTypes,
    },
    useFilters
  );

  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableCell {...column.getHeaderProps()}>
                {column.render("Header")}
                <div>{column.Filter && column.render("Filter")}</div>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </MaUTable>
  );
}
