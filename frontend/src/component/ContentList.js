import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { useState } from "react";

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
    flexGrow: 1,
    width: '100%',
    maxWidth: 925,
    backgroundColor: theme.palette.background.paper,
  },
  button:{
    backgroundColor: "#4e8bcc",
    margin: theme.spacing(1, 0, 1),
  },
}));

const ContentList = ({
  contentList,
  currentContent,
  setCurrentContent,
  handleGetContent,
  handleDeleteContent,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <AppBar position="static" color="default">
          <Box display="flex" justifyContent="" m={1} p={1} bgcolor="background.paper">
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
                    key={idx}
                    label={content.subject}
                    icon={<AssignmentIcon />}
                    {...a11yProps({ idx })}
                  />
                ))}
            </Tabs> 
            <Button
              width="50"
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => setCurrentContent(-1)}
            >
              <AddCircleIcon/>
            </Button>
            <Button
              width="50"
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleDeleteContent}
            >
              <RemoveCircleIcon/>
            </Button>
          </Box>
        </AppBar>     
    </div>
  );
};

export default ContentList;