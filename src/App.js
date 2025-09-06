import React from 'react'
import Header from './components/Header'
import Slot from './components/Slot'
import { Box } from '@mui/material'

const App = () => {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      overflowX: 'hidden'
    }}>
      <Header/>
      <Box sx={{ 
        pt: { xs: 2, md: 4 },
        pb: { xs: 4, md: 6 },
        px: { xs: 1, sm: 2, md: 0 }
      }}>
        <Slot />
      </Box>
    </Box>
  )
}

export default App
