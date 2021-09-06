import React from "react";
import { useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { Container, Grid, Typography } from "@material-ui/core";
import { CardActionArea, CardMedia } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { Input, Link } from "@material-ui/core";
import { CustomLink } from "../components/CustomLink";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const CommandsPage = () => {
  const history = useHistory();
  const [teams, setTeams] = useState();
  const query = useQuery();
  const { id } = useParams();

  const search = query.has("search") ? query.get("search").toString() : "";

  useEffect(() => {
    fetch(`https://api.football-data.org/v2/competitions/${id}/teams`, {
      method: "GET",
      headers: {
        "X-Auth-Token": process.env.REACT_APP_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTeams(data.teams);
      });
  }, [id]);

  const [searchTeam, setSearchTeam] = useState(search);

  const handleClick = (event) => {
    setSearchTeam(event.target.value);

    history.push({
      pathname: `/commands/${id}`,
      search: `?search=${event.target.value}`,
    });
  };
  return (
    <>
      <Container>
        <div style={{ textAlign: "center" }}>
          <form>
            <Input
              style={{ width: 300, marginBottom: 40 }}
              type="text"
              placeholder="Search..."
              value={searchTeam}
              onChange={(event) => handleClick(event)}
            />
          </form>
        </div>
        <Grid container spacing={4}>
          {teams ? (
            teams
              .filter((val) =>
                val.name.toLowerCase().includes(searchTeam.toLowerCase())
              )
              .map((el) => {
                return (
                  <Grid item xs={12} md={12}>
                    <CardActionArea component="a">
                      <Card item key={el.id}>
                        <div>
                          <CardContent>
                            <CardMedia>
                              <img
                                src={el.crestUrl}
                                alt="Logo Club"
                                width="100"
                                height="100"
                              ></img>
                            </CardMedia>
                            <Typography component="h2" variant="h5">
                              {el.name}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              color="textSecondary"
                            >
                              {el.shortName}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              color="textSecondary"
                            >
                              Venue: {el.venue}
                            </Typography>
                            <Typography>
                              <Link
                                to={`/calendarteams/${el.id}`}
                                component={CustomLink}
                                color="inherit"
                              >
                                Calendar
                              </Link>{" "}
                            </Typography>
                          </CardContent>
                        </div>
                      </Card>
                    </CardActionArea>
                  </Grid>
                );
              })
          ) : (
            <p>Нет данных</p>
          )}
        </Grid>
      </Container>
    </>
  );
};
