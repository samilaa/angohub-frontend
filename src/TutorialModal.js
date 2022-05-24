import { Modal, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import YouTube from 'react-youtube'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 720,
  height: 480,
  bgcolor: 'rgba(25, 25, 25, 0.87)',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

const onReady = event => {
  event.target.pauseVideo()
}

const TutorialModal = ({ open, handleClose }) => {
  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  }
  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        How to use 3D files
      </Typography>
      <YouTube videoId='uKzLmNfW0P8' opts={opts} />
    </Box>
  </Modal>
  )
}

export default TutorialModal
