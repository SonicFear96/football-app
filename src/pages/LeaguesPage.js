import { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { Card, Link } from "@material-ui/core/";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { CustomLink } from "../components/CustomLink";

function LeaguesPage() {
  const [competitions, setCompetitions] = useState();

  useEffect(() => {
    fetch(
      "https://api.football-data.org/v2/competitions?areas=2077&plan=TIER_ONE",
      {
        method: "GET",
        headers: {
          "X-Auth-Token": process.env.REACT_APP_TOKEN,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCompetitions(data.competitions);
      });
  }, []);

  return (
    <>
      <Container>
        <Grid container spacing={4}>
          {competitions ? (
            competitions.map((el) => {
              return (
                <Grid item xs={12} md={6}>
                  <CardActionArea component="a">
                    <Card item key={el.id}>
                      <div>
                        <CardContent>
                          <CardMedia>
                            <img
                              src={el.area.ensignUrl}
                              alt={el.area.countryCode}
                              width="30%"
                              height="30%"
                            ></img>
                          </CardMedia>

                          <Typography component="h2" variant="h5">
                            {el.area.name}
                          </Typography>
                          <Typography>
                            <Link
                              to={`/commands/${el.id}`}
                              component={CustomLink}
                              color="inherit"
                            >
                              {el.name}
                            </Link>
                          </Typography>

                          <Typography variant="subtitle1">
                            <Link
                              to={`/calendar/${el.id}`}
                              component={CustomLink}
                              color="inherit"
                            >
                              Calendar
                            </Link>
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
}

export default LeaguesPage;
