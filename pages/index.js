import React, { useEffect, useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import Layout from '../src/Layout'
import Gallery from '../src/Gallery'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { fetchOrGetFromSessionStorage } from '../src/fetchNftData'
import { Box, CircularProgress } from '@mui/material'

export default function Index () {
  const { publicKey } = useWallet()
  const { connection } = useConnection()
  const [userAngomons, setUserAngomons] = useState([])
  const [userPlanets, setUserPlanets] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!publicKey) {
      setUserAngomons([])
      setUserPlanets([])
      return
    }
    async function fetchData () {
      setLoading(true)
      const [angomons, planets] = await fetchOrGetFromSessionStorage(publicKey, connection)
      setLoading(false)
      setUserAngomons(angomons)
      setUserPlanets(planets)
    }
    fetchData()
  }, [publicKey])

  const renderContent = () => (
    <div>
      <Typography variant="h4" component="h3" fontWeight="bold">
          Your Angomon
      </Typography>
      <Gallery collectibles={userAngomons}/>
      <Divider sx={{ marginTop: '10px' }} />
      <Typography variant="h4" component="h3" fontWeight="bold">
          Your Planets
      </Typography>
      <Gallery collectibles={userPlanets}/>
    </div>
  )

  const renderSpinner = () => (
    <Box sx={{ display: 'flex' }}>
      <Typography variant="h4" component="h3" fontWeight="medium">
        Fetching Angomon...
      </Typography>
      <br />
      <CircularProgress />
    </Box>
  )

  return (
    <Layout>
      {loading ? renderSpinner() : renderContent()}
    </Layout>
  )
}

/*
<Link href="/about" color="secondary">
        Go to the about page
      </Link>
*/
