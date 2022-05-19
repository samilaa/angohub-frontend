import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Copyright from './Copyright'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Image from 'next/image'
import { pink } from '@mui/material/colors'

const Gate = (props) => {
  return (
    <Container maxWidth='lg' className='angowave-bg'>
      <Box
  display="flex"
  justifyContent="center"
  alignItems="center"
  minHeight="100vh"
>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '50px',
          width: '100%'
        }}>
          <WalletMultiButton />
        </div>
      </Box>

    </Container>
  )
}

export default Gate
