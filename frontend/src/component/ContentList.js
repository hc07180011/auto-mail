import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Grid from "@material-ui/core/Grid";
import { useState } from "react";
import EmailList from './EmailList';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  button:{
    backgroundColor: "#4e8bcc",
    margin: theme.spacing(0.5, 1, 0.5),
  },
}));

const ContentList = ({
  emailList,
  currentEmail,
  contentList,
  currentContent,
  setCurrentContent,
  handleGetContent,
  handleDeleteContent,
}) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} direction="row" alignItems="center">
      <Grid item xs={11}>
        <Tabs
            value={currentContent}
            onChange={(event, currentContent) => setCurrentContent(currentContent)}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
        >
          {contentList.map((content, idx) => (
            <Tab
              key={`${content.id}_${content.subject}`}
              label={content.subject}
              icon={<AssignmentIcon />}
              onClick={() => handleGetContent(emailList[currentEmail].id, content.id)}
              {...a11yProps({ idx })}
            />
          ))}
        </Tabs> 
      </Grid>
      <Grid xs={1}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => setCurrentContent(-1)}
        >
          <CreateIcon/> 
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          disabled={currentContent === -1}
          onClick={handleDeleteContent}
        >
          <DeleteForeverIcon/>
        </Button>
      </Grid>
    </Grid>
  );
};

export default ContentList;