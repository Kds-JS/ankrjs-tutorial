import Head from 'next/head'
import styles from '../styles/Home.module.css'
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

import { Nft } from '@ankr.com/ankr.js/dist/types';
import { getNfts } from '../utils';
import { ethers } from 'ethers';

// icons
import { FaTwitter, FaGithub, FaDiscord } from 'react-icons/fa';
 
const Home: NextPage = () => {
  const [walletAddress, setWalletAddress] = useState('0xB2Ebc9b3a788aFB1E942eD65B59E9E49A1eE500D');
  const [nfts, setNfts] = useState<Nft[]>([]);

  console.log(nfts);

  useEffect(() => {
    

    if (isValidAddress()) {

      const fetchNfts = async () => {
        try {
          const { nfts } = await getNfts(walletAddress);
          setNfts(nfts);
        } catch (e : any) {
          setNfts([]);
          console.log(e.message);
        }
      };

      fetchNfts();
    } else {
      setNfts([]);
    }
    
  }, [walletAddress]);

  
  const isValidAddress = () => {
    const isValid = ethers.utils.isAddress(walletAddress);
    return isValid;
  }

  const displayedNft = () => {

    if (nfts.length != 0)  {
      return (
        <div className={styles.cardContainer}>
          {nfts.map((nft, index) => (
            <div key={index} className={styles.card}>
              <img src={nft.imageUrl} alt={nft.name} />

              <div className={styles.description}>
                <span style={{fontWeight: "bold"}}>{nft.name}</span>
                <span>{nft.collectionName}</span>
              </div>
            </div>
          ))}
        </div>
      )
    } else {
      return (
        <div style={{textAlign: "center", marginBottom:"50px"}}>{"You don't have any NFT"}</div>
      )
    }

  }
  

  return (
    <div className={styles.container}>
      <Head>
        <title>NFT viewer App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={styles.header}>
        <h1>NFT viewer</h1>
        <div>Powered by <a href="https://www.ankr.com/advanced-api/">Ankr Advanced APIs</a></div>
      </div>

      <div className={styles.form}>
        <label htmlFor='wallet-address'>
          Wallet address :
        </label>
        <input
          id='wallet-address'
          type='text'
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          placeholder='Enter a wallet address here'
        />
      </div>

      {!isValidAddress() && (
          <div className={styles.error}>This address is not valid</div>
      )}

      <div >

        {displayedNft()}

      </div>

      <div className={styles.footer}>
        <div>made with ??? by @kds_JS</div>

        <div className={styles.socialNetwork}>
            <a href="https://twitter.com/kds_JS">
              <FaTwitter/>
            </a>
            <a href="https://github.com/Kds-JS">
              <FaGithub/>
            </a>
            <a href="https://discord.com/users/842885714190139394">
              <FaDiscord/>
            </a>
        </div>
      </div>
    </div>
  );
};
 
export default Home;