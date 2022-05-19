import React from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { Box } from '@mui/material'
import Link from './Link'

const Gallery = ({ collectibles }) => {
  // const imageUrls = ['https://www.arweave.net/pAhnD9Nn0OcizG_S9qjIVI5kUCHLd_OrZwYqK9sV1wg?ext=png', 'https://www.arweave.net/pAhnD9Nn0OcizG_S9qjIVI5kUCHLd_OrZwYqK9sV1wg?ext=png', 'https://www.arweave.net/pAhnD9Nn0OcizG_S9qjIVI5kUCHLd_OrZwYqK9sV1wg?ext=png', 'https://www.arweave.net/pAhnD9Nn0OcizG_S9qjIVI5kUCHLd_OrZwYqK9sV1wg?ext=png', 'https://www.arweave.net/pAhnD9Nn0OcizG_S9qjIVI5kUCHLd_OrZwYqK9sV1wg?ext=png']
  const renderCards = () => {
    return (
      collectibles.map((collectible, index) => {
        return (
            <Grid item xs={3} key={index}>
              <Link href={`collectibles/${collectible.mint}`}>
                <Card sx={{
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                    opacity: [0.9, 0.8, 0.7],
                    cursor: 'pointer'
                  }
                }}>
                    <img src={collectible.data.image} alt={'NFT image'} width='100%' height='100%'/>
                </Card>
              </Link>
            </Grid>
        )
      })
    )
  }

  return (
    <Grid container spacing={2}>
      {collectibles ? renderCards() : ''}
    </Grid>
  )
}

export default Gallery
