import logo from './logo.svg';
import './App.css';
import { getDefaultProvider, utils } from "ethers"
import { NftProvider, useNft } from "use-nft"
import Nft from './Nft';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, GridItem, SimpleGrid, Button, Text, FormControl, FormLabel, Input, FormHelperText, Alert, AlertIcon } from '@chakra-ui/react';

const ethersConfig = {
  provider: getDefaultProvider("homestead"),
}



function App() {
  const perPage = 9;
  const [nfts, setNfts] = useState([]);
  const [showCount, setShowCount] = useState(perPage);
  const [address, setAddress] = useState('');
  const [errorMessageText, setErrorMessageText] = useState('');
  const [startToken, setStartToken] = useState('');

  useEffect(() => {
    const apiKey = "FBJHuEKR11meXXyZIYay1MMJEA8UI5Bf";
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTsForCollection`;
    const withMetadata = true;
    const perPage = 9;
    if (!utils.isAddress(address) && address != '') {
      setErrorMessageText('Invalid address');
      setNfts(null);
    } else {
      if ((nfts == null || nfts.length < showCount) && address != '') {
        var config = {
          method: 'get',
          url: `${baseURL}?contractAddress=${address}&withMetadata=${withMetadata}&startToken=${startToken}`,
          headers: {}
        };
        axios(config)
          .then(response => {
            setErrorMessageText('');
            setNfts([...nfts, ...response.data.nfts]);
            setStartToken(response.data.nfts[response.data.nfts.length - 1].id.tokenId);
          })
          .catch(error => setErrorMessageText(error.message));
      }
    }
  }, [showCount, address]);


  return (
    <>
      <Container maxWidth={1200}>
        <Text fontSize="4xl" fontWeight="bold" marginBottom="4" textAlign="center">Nft Gallery</Text>
        <FormControl marginBottom={4}>
          <FormLabel fontWeight={700} htmlFor='email'>Contract-address</FormLabel>
          <Input id='email' type='email' value={address} onChange={(val) => { setAddress(val.target.value) }} />
        </FormControl>
        {errorMessageText ?
          <Alert show={errorMessageText} status='error'>
            <AlertIcon />
            {errorMessageText}
          </Alert>
          : <></>}
        <SimpleGrid columns={[2, null, 3]} gap={6}>
          {nfts.length > 0 ? nfts.slice(0, showCount).map((nft, key) =>
            <GridItem key={key} >
              <Nft title={nft.title} address={nft.contract.address} id={parseInt(nft.id.tokenId, 16)} image={nft.media[0].gateway} />
            </GridItem>
          ) : null}
        </SimpleGrid>
      </Container>
      <Container marginTop='4' centerContent>
        {nfts.length > 0 ? <Button align='center' onClick={() => { setShowCount(showCount + perPage) }}>Load more</Button> : <></>}
      </Container>
    </>
  )
}




export default App;
