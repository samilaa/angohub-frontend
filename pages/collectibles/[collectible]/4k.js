import { CircularProgress, Link, Typography } from '@mui/material'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { fetchOrGetFromSessionStorage } from '../../../src/fetchNftData'
import Layout from '../../../src/Layout'

const Show = () => {
  const router = useRouter()
  const { collectible } = router.query
  const { publicKey } = useWallet()
  const { connection } = useConnection()
  const [angoNumber, setAngoNumber] = useState(null)
  const [mint, setMint] = useState('')

  useEffect(() => {
    if (!publicKey) {
      return
    }
    async function fetchData () {
      try {
        const [angomons] = await fetchOrGetFromSessionStorage(publicKey, connection)
        const angomon = angomons.find(c => c.mint === collectible)
        const number = angomon.data.name.substring(angomon.data.name.indexOf('#') + 1)
        setAngoNumber(number)
        setMint(angomon.mint)
      } catch (err) {
        setAngoNumber(null)
      }
    }
    fetchData()
  }, [publicKey])

  const renderImage = () => {
    if (Number(angoNumber) > 3500 || Number(angoNumber) < 1) {
      return (
        <Typography variant='h4'>
          {'Cannot find Angomon'}
        </Typography>
      )
    }
    return (
      <img src={`https://fbxstorageaccount.blob.core.windows.net/4kfiles/${angoNumber}_4K.png`} alt='NFT image' width='100%'/>
    )
  }

  return (
    <Layout>
      <Link href={mint ? `/collectibles/${mint}` : '/'}><Typography variant='h6'>{'< back'}</Typography></Link>
      {angoNumber ? renderImage() : <CircularProgress />}
    </Layout>
  )
}

export default Show
