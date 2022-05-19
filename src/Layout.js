import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Navbar from './Navbar'
import Copyright from './Copyright'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import Gate from './Gate'
import { fetchOrGetFromSessionStorage } from './fetchNftData'
import { CircularProgress } from '@mui/material'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

const Layout = (props) => {
  const { publicKey } = useWallet()
  const { connection } = useConnection()
  const [userAngomons, setUserAngomons] = useState([])
  const [userPlanets, setUserPlanets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!publicKey) {
      setLoading(false)
      return
    }
    async function fetchData () {
      setLoading(true)
      const [angomons, planets] = await fetchOrGetFromSessionStorage(publicKey, connection)
      setUserAngomons(angomons)
      setUserPlanets(planets)
      setLoading(false)
    }
    fetchData()
  }, [publicKey])

  const renderLayout = () => {
    if (loading) {
      return (
        <Container maxWidth="lg">
            <Box display="flex"
            flexWrap='wrap'
              justifyContent="center"
              alignItems="center">
              <Typography variant='h4' textAlign='center' width='100%' marginTop='20vh' marginBottom='10px'>
            Authenticating...
            </Typography>
            <CircularProgress />
            <Typography variant='h7' textAlign='center' width='100%' marginTop='10px'>
            *this should only take a few seconds
            </Typography>
          </Box>
            <Copyright />
          </Container>
      )
    } else {
      if (userAngomons.length > 0) {
        return (
          <Container maxWidth="lg">
            <Typography variant="h1" component="h1" gutterBottom fontWeight="bold" marginBottom="0px">
              Angohub
            </Typography>
            <Navbar />
            <Box sx={{ my: 4 }}>
                {props.children}
            </Box>
            <Copyright />
          </Container>
        )
      } else {
        return (
            <Container maxWidth="lg">
            <Box display="flex"
            flexWrap='wrap'
              justifyContent="center"
              alignItems="center">
                <Typography variant='h4' textAlign='center' width='100%' marginTop='20vh' marginBottom='10px'>
                  You need an Angomon to access
                </Typography>
                <WalletMultiButton />
            </Box>
            <Copyright />
          </Container>
        )
      }
    }
  }
  return (
    publicKey ? renderLayout() : <Gate />
  )
}

export default Layout
