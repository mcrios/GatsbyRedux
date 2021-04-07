import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  Link,
  makeStyles
} from '@material-ui/core'
import {
  BarChartIcon,
  LogOut,
  SettingsIcon,
  User,
} from 'react-feather'
import NavItem from './NavItem'

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith'
};

const items = [
  {
    href: '/home',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  // {
  //   href: '/app/customers',
  //   icon: UsersIcon,
  //   title: 'Customers'
  // },
  // {
  //   href: '/app/products',
  //   icon: ShoppingBagIcon,
  //   title: 'Products'
  // },
  // {
  //   href: '/app/account',
  //   icon: UserIcon,
  //   title: 'Account'
  // },
  {
    href: '/admin',
    icon: SettingsIcon,
    title: 'Admin. Server'
  },
  // {
  //   href: '/',
  //   icon: LockIcon,
  //   title: 'Login'
  // },
  {
    href: '/usuario',
    icon: User,
    title: 'Admin. Usuarios'
  },
  {
    href: '/',
    icon: LogOut,
    title: 'Salir'
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64,
    color: 'black'
  }
}));

const NavBar = ({ onMobileClose, openMobile, accesos }) => {
  const classes = useStyles()

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={Link}
          src={user.avatar}
          to="/app/account"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="body1"
        >
          Server Monitor
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >

        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {typeof accesos !== 'undefined' && accesos.length > 0 ? accesos.map((item) => (
            <NavItem
              href={item.url}
              key={item.titulo}
              title={item.titulo}
              icon={item.icono}
            />
          )) :
            <NavItem
              onClick={() => {
                localStorage.removeItem('token')
              }}
              href="/"
              key="Salir"
              title="Salir"
              icon="sign-out-alt"
            />}
             <NavItem
              onClick={() => {
                localStorage.removeItem('token')
              }}
              href="/"
              key="Salir"
              title="Salir"
              icon="sign-out-alt"
            />
        </List>
      </Box>

    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default NavBar;
