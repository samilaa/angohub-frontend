import React from 'react'
import { Grid, Card, CardContent, Typography } from '@mui/material'

const AttributesGrid = ({ attributes }) => {
  const renderAttributes = () => attributes.map((attribute, index) => (
        <Grid item xs={4} key={index}>
            <Card sx={{ height: '100%' }}>
                <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {attribute.trait_type}
                </Typography>
                <Typography variant="h6" component="div">
                    {attribute.value}
                </Typography>
                </CardContent>
            </Card>
        </Grid>
  ))

  return (
    <Grid container spacing={1}>
        {renderAttributes()}
    </Grid>
  )
}

export default AttributesGrid
