import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import NotFound from "./Components/NotFound";
import ProductBody from "./Components/Product/ProductBody";
import TaskBody from "./Components/Task/TaskBody";
import SubtaskBody from "./Components/Subtask/SubtaskBody";
import CreatePage from "./Components/Project/CreatePage";
import ShowProject from "./Components/Project/ShowProject";
import Project from "./Components/Project/Project";
import UserPage from "./Components/User/Userpage";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#66bb6a"
        },
        secondary: {
            main: "#fcb316"
        },
        ternary: {
            main: "#ef3836"
        },
        writing: {
            main: "#757575"
        },
        solid: {
            main: "#e0e0e0"
        }
    },
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: "'Gentium Basic', serif !important",
        useNextVariants: true
    }
})
const Main = () => (
    <main>
        <Switch>
            <Route exact path="/" component={Layout} />
            <Route exact path="/user" component={UserPage} />
            <Route path="/product" component={ProductBody} />
            <Route path="/step" component={TaskBody} />
            <Route path="/specification" component={SubtaskBody} />
            <Route path="/createproject" component={CreatePage} />
            <Route path="/project/:project_status" component={ShowProject} />
            <Route path="/projectshow/:id" component={Project} />
            <Route path="*" component={NotFound} />
        </Switch>
    </main>
);

export default Main;
