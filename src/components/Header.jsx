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
        <Toolbar disableGutters sx={{ minHeight: { xs: '56px', md: '64px' } }}>
          <img src={logo} alt="logo" className='w-8 h-8 md:w-10 md:h-10 mr-2' />
          
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
                fontSize: { md: '1.25rem' }
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
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', flexGrow: 1, mr: 2 }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
                lineHeight: 1,
                fontSize: { xs: '1rem', sm: '1.1rem' }
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
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Button
                key='job_category'
                onClick={handleCloseNavMenu}
                sx={{ 
                  my: 2, 
                  color: 'white', 
                  display: 'block',
                  minWidth: 'auto',
                  px: 2
                }}
              >
               <div className='flex flex-col items-center gap-1'>
               <i class="fa-solid fa-table-cells-large text-sm"></i> 
               <small className='text-xs'>Job Category</small>
               </div>
              </Button>
              <Button
                key='find_jobs'
                onClick={handleCloseNavMenu}
                sx={{ 
                  my: 2, 
                  color: 'white', 
                  display: 'block',
                  minWidth: 'auto',
                  px: 2
                }}
              >
               <div className='flex flex-col items-center gap-1'>
               <i class="fa-solid fa-magnifying-glass text-sm"></i> 
               <small className='text-xs'>Find Jobs</small>
               </div>
              </Button>
              <Button
                key='notifications'
                onClick={handleCloseNavMenu}
                sx={{ 
                  my: 2, 
                  color: 'white', 
                  display: 'block',
                  minWidth: 'auto',
                  px: 2
                }}
              >
               <div className='flex flex-col items-center gap-1'>
               <i class="fa-solid fa-bell text-sm"></i>
                <small className='text-xs'>Notifications</small>
               </div>
              </Button>
          </Box>
          <Box sx={{ 
            flexGrow: 0, 
            display: 'flex', 
            alignItems: 'center',
            gap: { xs: 1, md: 2 },
            m: { xs: 1, md: 2 }
          }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="user image" src={userImage} sx={{ width: { xs: 32, md: 40 }, height: { xs: 32, md: 40 } }} />
              </IconButton>
            </Tooltip>
            <Button 
              variant="contained" 
              sx={{
                background: 'linear-gradient(45deg, #3b82f6 30%, #8b5cf6 90%)',
                fontSize: { xs: '0.75rem', md: '0.875rem' },
                px: { xs: 1.5, md: 2 },
                py: { xs: 0.5, md: 1 },
                minWidth: 'auto',
                display: { xs: 'none', sm: 'flex' }
              }}
            >
                <i class="fa-solid fa-plus mr-1"></i> 
                <span className='hidden md:inline'>Post a Job</span>
                <span className='md:hidden'>Post</span>
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

