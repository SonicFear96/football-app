import React from "react";
import { useEffect, useState, useMemo } from "react";
import { Table } from "../components/Table";
import { useParams } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { DateRangeColumnFilter } from "../components/DateFilter";

export const CalendarLeagues = () => {
  const [data, setData] = useState();

  const { id } = useParams();

  const columns = useMemo(
    () => [
      {
        Header: "Match Calendar",
        columns: [
          {
            id: "1",
            Header: "Date",
            accessor: "utcDate",
            Filter: DateRangeColumnFilter,
            filter: "dateBetween",
          },
          {
            Header: "Home Team",
            accessor: "homeTeam.name",
          },
          {
            Header: "Score",
            accessor: (row) => {
              if (
                row.score.fullTime.awayTeam === null ||
                row.score.fullTime.homeTeam === null
              ) {
                return "- : -";
              } else {
                return (
                  `${row.score.fullTime.awayTeam}` +
                  " : " +
                  `${row.score.fullTime.homeTeam}`
                );
              }
            },
          },

          {
            Header: "Away Team",
            accessor: "awayTeam.name",
          },
          {
            Header: "Status",
            accessor: "status",
          },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    fetch(`https://api.football-data.org/v2/competitions/${id}/matches`, {
      method: "GET",
      headers: {
        "X-Auth-Token": process.env.REACT_APP_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.matches);
      });
  }, [id]);
  return (
    <>
      <CssBaseline />
      {data && <Table columns={columns} data={data} />}
    </>
  );
};
