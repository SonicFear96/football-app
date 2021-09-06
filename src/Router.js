import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CommandsPage } from "./pages/CommandsPage.js";
import LeaguesPage from "./pages/LeaguesPage";
import { CalendarLeagues } from "./pages/CalendarLeagues";
import { CalendarTeams } from "./pages/CalendarTeams";
import Header from "./components/Header";
import { CssBaseline, createTheme, ThemeProvider } from "@material-ui/core";

const darkTheme = createTheme({
  palette: {
    type: "dark",
  },
});

export const Router = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Header />
      <CssBaseline />
      <BrowserRouter basename="/football-app">
        <Switch>
          <Route path="/" exact component={LeaguesPage} />
          <Route path="/calendar/:id" exact component={CalendarLeagues} />
          <Route path="/calendarteams/:id" exact component={CalendarTeams} />
          <Route path="/commands/:id" exact component={CommandsPage} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};
