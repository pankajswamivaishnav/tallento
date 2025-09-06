import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import userImage from '../static/images/user.jpg'
import logo from '../static/images/logo.png'

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{
      background: 'linear-gradient(90deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)'
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={logo} alt="logo" className='w-10 h-10 mr-2' />
          
          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', mr: 2 }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 800,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                lineHeight: 1,
              }}
            >
              Tallento.ai 
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: 'inherit',
                opacity: 0.8,
                fontSize: '0.7rem',
                fontStyle: 'italic',
                lineHeight: 1,
              }}
            >
              Where AI meets ambition
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              
               <MenuItem key='job_category' onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}><i class="fa-solid fa-briefcase"></i> Job Category</Typography>
                </MenuItem>
               <MenuItem key='job_category' onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}><i class="fa-solid fa-magnifying-glass"></i> Find Jobs</Typography>
                </MenuItem>
               <MenuItem key='job_category' onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}><i class="fa-solid fa-bell"></i>Notification</Typography>
                </MenuItem>

            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', flexGrow: 1, mr: 2 }}>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                lineHeight: 1,
              }}
            >
              Tallento.ai
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: 'inherit',
                opacity: 0.8,
                fontSize: '0.6rem',
                fontStyle: 'italic',
                lineHeight: 1,
              }}
            >
              Where AI meets ambition
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Button
                key='find_jobs'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
               <div className='flex flex-col items-center gap-2'>
               <i class="fa-solid fa-table-cells-large"></i> <small>Job Category</small>
               </div>
              </Button>
              <Button
                key='find_jobs'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
               <div className='flex flex-col items-center gap-2'>
               <i class="fa-solid fa-magnifying-glass"></i> <small>Find Jobs</small>
               </div>
              </Button>
              <Button
                key='notifications'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
               <div className='flex flex-col items-center gap-2'>
               <i class="fa-solid fa-bell"></i>
                <small>Notifications</small>
               </div>
              </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }} className='flex flex-col m-2' >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="user image" src={userImage} />
              </IconButton>
            </Tooltip>
            <Button variant="contained" color="primary bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" sx={{marginTop: '10px'}}>
                <i class="fa-solid fa-plus"></i> <small>Post a Job</small>
            </Button>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;

