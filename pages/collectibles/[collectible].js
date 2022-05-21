import React, { useState, useEffect } from 'react'
import Layout from '../../src/Layout'
import { useRouter } from 'next/router'
import { fetchAngomonData, fetchOrGetFromSessionStorage, fetchPlanetData } from '../../src/fetchNftData'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Button, Card, CircularProgress, Grid, Typography } from '@mui/material'
import { CloudDownload, FourK } from '@mui/icons-material'
import AttributesGrid from '../../src/AttributesGrid'

const Show = () => {
  const router = useRouter()
  const { collectible } = router.query

  const { publicKey } = useWallet()
  const { connection } = useConnection()
  const [userAngomons, setUserAngomons] = useState([])
  const [userPlanets, setUserPlanets] = useState([])
  const [thisCollectible, setThisCollectible] = useState(null)
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
      if (angomons.filter(c => c.mint === collectible).length > 0) { setThisCollectible(angomons.find(c => c.mint === collectible)) }
      if (planets.filter(c => c.mint === collectible).length > 0) { setThisCollectible(planets.find(c => c.mint === collectible)) }
    }
    fetchData()
  }, [publicKey])

  const renderDownloadButtons = () => (
    <div>
      <Grid item xs={12} marginBottom='10px'>
        <Card>
          <Button href={`https://fbxstorageaccount.blob.core.windows.net/stlfiles/${thisCollectible.data.name.substr(thisCollectible.data.name.length - 4)}.stl`} fullWidth><CloudDownload /> Download STL file</Button>
        </Card>
      </Grid>
      <Grid item xs={12} marginBottom='10px'>
        <Card>
          <Button href={`https://fbxstorageaccount.blob.core.windows.net/fbxfiles/${thisCollectible.data.name.substr(thisCollectible.data.name.length - 4)}.fbx`} fullWidth><CloudDownload /> Download FBX file</Button>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Button href={`/collectibles/${thisCollectible.mint}/4k`} fullWidth><FourK /> View in 4K</Button>
        </Card>
      </Grid>
    </div>
  )

  const renderDetails = () => {
    if (!thisCollectible) { return null } else {
      return (
        <div>
          <Typography variant='h3' component='h3' fontWeight='bold'>
            {thisCollectible.data.name}
          </Typography>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Card>
              <img src={thisCollectible.data.image} alt='NFT image' width='100%'/>
            </Card>
          </Grid>
        <Grid item xs={4}>
          <Grid item xs={12} marginBottom='10px'>
            <AttributesGrid attributes={thisCollectible.data.attributes} />
          </Grid>
          {thisCollectible.data.name.startsWith('Angomon') ? renderDownloadButtons() : ''}
        </Grid>
      </Grid>
        </div>
      )
    }
  }

  return (
    <Layout>
      <a href='/'><Typography variant='h6' color="white">{'< back'}</Typography></a>
      {thisCollectible ? renderDetails() : <CircularProgress />}
    </Layout>
  )
}

export default Show
