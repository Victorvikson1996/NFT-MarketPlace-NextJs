import { ethers } from 'ethers'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'


import { nftadress, nftmarketaddress } from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'






export default function Home() {

  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')



  useEffect(() => {
    loadNFTs()
  }, [])


  async function loadNFTs() {

    const provider = new ethers.providers.JsonRpcProvider()
    const tokenContract = new ethers.Contract(nftadress, NFT.abi, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)
    const data = await marketContract.fetchMarketItems()

    const items = await Promise.all(data.map(async (i) => {
      const tokenUri = await tokenContract.fetchTokenURI(i.tokenId)
      const meta = await axios.get(tokenUri) //https://ifp.org/nft/api/v1/token/{tokenId}
      let price = ethers.utilis.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      }
      return item
    }))
  }

  return (
    <div className={styles.container}>
      <h1>Home</h1>
    </div>
  )
}
