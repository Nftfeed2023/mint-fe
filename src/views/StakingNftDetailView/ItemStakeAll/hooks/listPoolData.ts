export const listPoolData = [
  {
    "image": "https://images.mirror-media.xyz/publication-images/2fIj4SUK6jlw86-Ql0Dl3.png?height=600&width=1200",
    "name": "Revolutionizing NFT Trading: NFTFeed Partners with ZetaChain",
    "address": "0x7D01c787eb04C50987AB569351eE6A74f476C268",
    "tokenId": "",
    "chainName": "OP",
    "chainId": 10,
    "tokenType": "ERC721"
  },


].filter(v => v.chainId === 10 && v.tokenType === "ERC721" && v.image)
  .map(({
    address: nftAddress,
    name,
    chainId,
    image,
  }) => ({
    nftAddress,
    name,
    image,
    chainId: Number(chainId),
  }))
