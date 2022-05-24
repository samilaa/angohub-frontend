import React, { useState, useEffect } from 'react'
import Layout from '../../src/Layout'
import { useRouter } from 'next/router'
import { fetchAngomonData, fetchOrGetFromSessionStorage, fetchPlanetData } from '../../src/fetchNftData'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Button, Card, CircularProgress, Grid, Link, Typography } from '@mui/material'
import { CloudDownload, FourK, Help } from '@mui/icons-material'
import AttributesGrid from '../../src/AttributesGrid'
import TutorialModal from '../../src/TutorialModal'

const Show = () => {
  const router = useRouter()
  const { collectible } = router.query

  const { publicKey } = useWallet()
  const { connection } = useConnection()
  const [userAngomons, setUserAngomons] = useState([])
  const [userPlanets, setUserPlanets] = useState([])
  const [thisCollectible, setThisCollectible] = useState(null)
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const handleModalOpen = () => setModalOpen(true)
  const handleModalClose = () => setModalOpen(false)

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
          <Button href={`https://fbxstorageaccount.blob.core.windows.net/stlfiles/${thisCollectible.data.name.substr(thisCollectible.data.name.indexOf('#') + 1)}.stl`} fullWidth><CloudDownload /> Download STL file</Button>
        </Card>
      </Grid>
      <Grid item xs={12} marginBottom='10px'>
        <Card>
          <Button href={`https://fbxstorageaccount.blob.core.windows.net/fbxfiles/${thisCollectible.data.name.substr(thisCollectible.data.name.indexOf('#') + 1)}.fbx`} fullWidth><CloudDownload /> Download FBX file</Button>
        </Card>
      </Grid>
      <Grid item xs={12} marginBottom='10px'>
        <Card>
          <Button href={'https://fbxstorageaccount.blob.core.windows.net/angostudio/Angomon_studio.zip'} fullWidth><CloudDownload /> Download Studio and Textures</Button>
        </Card>
      </Grid>
      <Grid item xs={12} marginBottom='10px'>
        <Card>
          <Button href={`/collectibles/${thisCollectible.mint}/4k`} fullWidth><FourK /> View in 4K</Button>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Button onClick={handleModalOpen} fullWidth><Help /> How to use</Button>
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
      <Typography variant='h6' color="white"><Link href='/'>{'< back'}</Link></Typography>
      <TutorialModal open={modalOpen} handleClose={handleModalClose} />
      {thisCollectible ? renderDetails() : <CircularProgress />}
    </Layout>
  )
}

export default Show
