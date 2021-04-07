import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import NavBar from './NavBar'
import TopBar from './TopBar'
import { cargarAccesosUsuario } from '../../redux/usuarioReducer';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const DashboardLayout = () => {
  const classes = useStyles()
  const [isMobileNavOpen, setMobileNavOpen] = useState(false)
  const dispatch = useDispatch()
  const accesos = useSelector((store) => store.usuario.accesosUsuario)

  useEffect(()=>{
    dispatch(cargarAccesosUsuario())
  }, [])

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
        accesos={accesos}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
