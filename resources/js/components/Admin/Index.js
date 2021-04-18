import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
//import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
//import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
// Importing Components
import NewUser from './User/NewUser';
import EditUser from './User/Edit_User';
import UserList from './User/ShowUsers';
import UploadLogo from './User/UploadLogo';


import Axios from 'axios';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  Dividers: {
    backgroundColor: '#C2F0FC',
    height: '1px'
  },
  Expanders: {
    color: '#FFFFFF',
    //107595
  },
  ListItemstyles: {

    color: '#FFFFFF',
    fontSize: '14px',
    // fontWeight: 'bold',
    fontFamily: 'Poppins-Regular'
  },

  sidebarheads: {

    fontFamily: 'Poppins-Regular',
    fontWeight: 'bolder',



  },
  sidebarchilds: {

    fontFamily: 'Poppins-Regular',
    // fontWeight: 'bold',
    color: '#81f5ff',
    fontSize: '13px',
    marginLeft: '15px !important',
    marginBottom: '0px !important'

  },
  icon_img:{
    width:'20',
    height:'20px'
  }
  ,

  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% )`,
      marginLeft: drawerWidth,
      backgroundColor: '#fff',
      height: '50px',
      borderBottom: '1px solid #3282b8'
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    marginTop: '50px',
    //  backgroundImage:"url('http://localhost:8000/images/bgsidebar15.jpg')",
    backgroundColor: '#34495e',
    border: '1px solid #34495e'
    // C2F0FC
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
function Sidebar(props) {
  const [display, setdisplay] = React.useState(false);
  const [permissions, setdPermissions] = React.useState([]);
  const [user, setuser] = React.useState([]);
  const [check, setcheck] = React.useState(true);
  const logout = () =>{
    window.localStorage.setItem('sa','');
    window.location.reload();
  }
  const senderdata = {
    token: window.localStorage.getItem('sa')
  }
  if (check) {
    setcheck(false);
    Axios.post('/api/admin_check_auth', senderdata).then(res => {
      console.log(res);
      if (res.data.status == 200) {
        setuser(res.data.user);
        setdisplay(true);
      } else {
        props.history.push('/admin_login');
      }
    })
  }
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [show, setShow] = React.useState(0);


  const sidebarchildhandler = (par) => {
      if(show == par){
        setShow(0);
      }else{
        setShow(par)
      }
  }
  const drawer = (
    <div>



      <List className={classes.sidebarheads}>

            <>
              <ListItem button component={Link} to="/adminpanel/Dashboard">

                <ListItemText >
                  <h6 className={classes.ListItemstyles}><img className={classes.icon_img} src="/images/dashboard.png"></img>  Dashboard</h6>
                </ListItemText>
              </ListItem>
              <Divider className={classes.Dividers} />
            </>






            <>
              <ListItem button onClick={() => sidebarchildhandler(3)}  >

                <ListItemText>
                  <h6 className={classes.ListItemstyles}>
                  <img className={classes.icon_img} src="/images/user.png"></img>  Manage Users</h6></ListItemText>
                {show == 3 ?
                  <ExpandLess className={classes.Expanders} /> :
                  <ExpandMore className={classes.Expanders} />
                }


              </ListItem>
              {show == 3?
                <div className={classes.sidebarchilds}>


                  {/* <ListItem button component={Link} to="/adminpanel/NewUser" >
            <ListItemText ><h6 className={classes.sidebarchilds}>New Custpmer</h6></ListItemText>
            </ListItem> */}

                  <ListItem button component={Link} to="/adminpanel/add-user">
                    <ListItemText ><h6 className={classes.sidebarchilds}>Add User</h6></ListItemText>
                  </ListItem>
                  <ListItem button component={Link} to="/adminpanel/users-list">
                    <ListItemText ><h6 className={classes.sidebarchilds}>Users List</h6></ListItemText>
                  </ListItem>

                </div> :
                ''
              }



              <Divider className={classes.Dividers} />
            </>













          <Divider className={classes.Dividers} />
        <ListItem button onClick={() => logout(5)}  >

      <ListItemText >
        <h6 className={classes.ListItemstyles}> <i className="fas fa-sign-out-alt"></i> Log Out </h6></ListItemText>
      </ListItem>

      </List>
    </div>
  );

  return (
    <div style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', backgroundColor: 'white' }}>
      {
        display ?
          <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton >
                <Typography variant="h6" noWrap>

                  <h2 className="site_header" style={{  fontWeight: 'normal', fontSize: '25px', marginLeft: '10px' }} >
                    <span>
                      {/* <img style={{ marginRight: '0px', marginBottom: '0px' }} src="/images/icons/logo-01.png">
                      </img> */}
                        MGL
                      </span> <span></span> </h2>
                </Typography>
              </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
              {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
              <Hidden smUp implementation="css">
                <Drawer
                  container={container}
                  variant="temporary"
                  anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                  ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                  }}
                >
                  {drawer}
                </Drawer>
              </Hidden>
              <Hidden xsDown implementation="css">
                <Drawer
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                  variant="permanent"
                  open
                >
                  {drawer}
                </Drawer>
              </Hidden>
            </nav>
            <main id="adminpanel" className={classes.content}>
              <div className={classes.toolbar} />
              <Route exect path="/adminpanel/Dashboard" ></Route>

              <Route exect path="/adminpanel/add-user"  component={NewUser}></Route>
              <Route exect path="/adminpanel/edit-user/:id"  component={EditUser}></Route>
              <Route exect path="/adminpanel/users-list"  component={UserList}></Route>
              <Route exect path="/adminpanel/upload-user-logo/:id"  component={UploadLogo}></Route>

            </main>
          </div>
          :
          <div id="displayspinner" style={{ display: 'block', marginLeft: '48%', marginTop: '20%' }}>
            <div className="spinner-border  ml-2 spinner_format"  role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>

      }

    </div>
  );
}


export default Sidebar;
