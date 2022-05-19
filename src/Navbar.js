import React from 'react'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Link from './Link'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" elevation={0} sx={{ backgroundColor: 'transparent' }}>
            <Toolbar>
                <Typography variant="h5" color="black" fontWeight="bold" sx={{ flexGrow: 1 }}>
                    <Link href='/'>
                    Home
                    </Link>
                </Typography>
                <Typography variant="h5" color="gray" fontWeight="bold" sx={{ flexGrow: 2 }} className='unicorn-cursor'>
                    Merch
                </Typography>
                <WalletMultiButton />
            </Toolbar>
            <Divider />
        </AppBar>
    </Box>
  )
}

export default Navbar
