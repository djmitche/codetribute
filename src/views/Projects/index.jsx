import { hot } from 'react-hot-loader';
import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import GithubIcon from 'mdi-react/GithubIcon';
import projects from '../../data/loader';
import ProjectCard from '../../components/ProjectCard';
import Dashboard from '../../components/Dashboard';
import SearchBox from '../../components/SearchBox';
import sort from '../../utils/sort';

export default
@hot(module)
@withStyles((theme) => ({
  container: {
    minHeight: `calc(100vh - 180px - ${theme.spacing(3)}px)`,
    marginTop: `calc(180px + ${theme.spacing(1)}px)`,
    padding: 0,
  },
  header: {
    height: 180,
  },
  title: {
    color: 'white',
  },
  highlightedText: {
    backgroundColor: theme.palette.common.black,
    color: 'white',
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  grid: {
    width: '90vw',
    margin: '0 auto',
    [theme.breakpoints.up('md')]: {
      padding: ' 0px 12px',
      maxWidth: '100%',
    },
  },
  appBarButton: {
    position: 'absolute',
    right: 0,
    '& svg': {
      fill: theme.palette.common.white,
    },
  },
}))
class Projects extends Component {
  state = {
    searchTerm: '',
  };

  handleTextInputChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { searchTerm } = this.state;
    const filteredProjects = Object.keys(projects)
      .filter((fileName) =>
        projects[fileName].name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .reduce(
        (prev, key) => ({
          ...prev,
          [key]: projects[key],
        }),
        {}
      );
    const header = (
      <Fragment>
        <IconButton
          aria-label="Site Repository"
          className={classes.appBarButton}
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/mozilla-frontend-infra/codetribute"
          title="Site Repository">
          <GithubIcon />
        </IconButton>
        <Typography variant="h3" align="center" className={classes.title}>
          Codetribute
        </Typography>
        <div className={classes.flexContainer}>
          <Typography
            className={classes.highlightedText}
            variant="subtitle1"
            align="center">
            Find your first code contribution with Mozilla
          </Typography>
        </div>
        <SearchBox
          value={this.state.searchTerm}
          onChange={this.handleTextInputChange}
        />
      </Fragment>
    );

    return (
      <Dashboard
        classes={{
          container: classes.container,
          header: classes.header,
        }}
        withSidebar
        header={header}>
        <Grid container spacing={3} className={classes.grid}>
          {Object.values(filteredProjects)
            .sort((a, b) => {
              const firstElement = a.name;
              const secondElement = b.name;

              return sort(firstElement, secondElement);
            })
            .map((project) => (
              <Grid item key={project.fileName} xs={12} sm={12} md={4} lg={3}>
                <ProjectCard project={project} />
              </Grid>
            ))}
        </Grid>
      </Dashboard>
    );
  }
}
