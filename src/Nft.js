import { Box, Image, Link } from '@chakra-ui/react'

function Nft(props) {


    // You can now display the NFT metadata.
    return (
        <Box maxW='lg'
            borderWidth='1px' borderRadius='lg' overflow='hidden'
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            noOfLines={1}
        >
            <Image src={props.image} alt="" />
            <Link href={"https://opensea.io/assets/" + props.address + '/' + props.id} target="_blank">
                {props.title ? props.title : "#" +props.id}
            </Link>
            {props.description}

        </Box>
    )
}

export default Nft;
