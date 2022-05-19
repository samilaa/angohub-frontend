import {
  getParsedNftAccountsByOwner
} from '@nfteyez/sol-rayz'
import axios from 'axios'

const ANGOMON_UPDATE_AUTHORITY = 'CVkw2BVYRx2RBCMypxhjnFb3gj8EoCYySsgYuqo9YSyP'
const PLANETS_UPDATE_AUTHORITY = '3Ps7Mdk7YCHXHckYztQPK4ShuH2miSNsK5EdaAkFnrPj'

const fetchAllNFTData = async (publicKey, connection) => {
  try {
    const nfts = await getParsedNftAccountsByOwner({
      publicAddress: publicKey,
      connection,
      serialization: true
    })
    // Axios
    const nftData = nfts
    const data = Object.keys(nftData).map((key) => nftData[key]); const arr = []
    const n = data.length
    for (let i = 0; i < n; i++) {
      if (!data[i].data.uri.startsWith('https://arweave.net')) { continue }
      const val = await axios.get(data[i].data.uri)
      // add updateAuthority
      val.updateAuthority = data[i].updateAuthority

      arr.push(val)
    }
    return arr
  } catch (error) {
    console.log(error)
  }
}

const fetchAngomonData = async (publicKey, connection) => {
  try {
    const nfts = await getParsedNftAccountsByOwner({
      publicAddress: publicKey,
      connection,
      serialization: true
    })
    // Axios
    const nftData = nfts
    const data = Object.keys(nftData).map((key) => nftData[key]); const arr = []
    const n = data.length
    for (let i = 0; i < n; i++) {
      if (!data[i].data.uri.startsWith('https://arweave.net')) { continue }
      if (data[i].updateAuthority !== ANGOMON_UPDATE_AUTHORITY) { continue }

      const val = await axios.get(data[i].data.uri)
      val.mint = data[i].mint

      arr.push(val)
    }
    return arr
  } catch (error) {
    console.log(error)
  }
}

const fetchPlanetData = async (publicKey, connection) => {
  try {
    const nfts = await getParsedNftAccountsByOwner({
      publicAddress: publicKey,
      connection,
      serialization: true
    })
    // Axios
    const nftData = nfts
    const data = Object.keys(nftData).map((key) => nftData[key]); const arr = []
    const n = data.length
    for (let i = 0; i < n; i++) {
      if (!data[i].data.uri.startsWith('https://arweave.net')) { continue }
      if (data[i].updateAuthority !== PLANETS_UPDATE_AUTHORITY) { continue }

      const val = await axios.get(data[i].data.uri)
      val.mint = data[i].mint

      arr.push(val)
    }
    return arr
  } catch (error) {
    console.log(error)
  }
}

const fetchOrGetFromSessionStorage = async (publicKey, connection) => {
  async function fetchData () {
    const angomons = await fetchAngomonData(publicKey, connection)
    const planets = await fetchPlanetData(publicKey, connection)

    // Save to session storage:
    const saveJson = {
      angomons,
      planets
    }
    window.sessionStorage.setItem(publicKey, JSON.stringify(saveJson))

    return [angomons, planets]
  }
  function fetchDataFromSessionStorage () {
    const cachedObject = JSON.parse(window.sessionStorage.getItem(publicKey))

    return [cachedObject.angomons, cachedObject.planets]
  }
  const cachedValue = window.sessionStorage.getItem(publicKey)

  if (cachedValue) {
    return fetchDataFromSessionStorage()
  } else {
    return await fetchData()
  }
}

export { fetchAllNFTData, fetchAngomonData, fetchPlanetData, fetchOrGetFromSessionStorage }
