/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  MintNftFactory,
  MintNftFactoryInterface,
} from "../MintNftFactory";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_royaltyAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_royaltyFee",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "poolId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "manager",
        type: "address",
      },
    ],
    name: "DeployNft",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_royaltyAddress",
        type: "address",
      },
    ],
    name: "changeRoyaltyAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_royaltyFee",
        type: "uint256",
      },
    ],
    name: "changeRoyaltyFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "containerNfts",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "string",
        name: "_baseUrlNft",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_priceNft",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_endTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxTotalSupply",
        type: "uint256",
      },
    ],
    name: "deploy",
    outputs: [
      {
        internalType: "uint256",
        name: "poolId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "endTimes",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nft",
        type: "address",
      },
    ],
    name: "getAmountOut",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "managers",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "mapPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "maxTotalSupplys",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nft",
        type: "address",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "minteds",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "royaltyAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "royaltyFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalPool",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x6080604052600060045534801561001557600080fd5b50604051613c34380380613c3483398101604081905261003491610114565b61003d336100c4565b600180556001600160a01b03821661009b5760405162461bcd60e51b815260206004820152601f60248201527f526f79616c74792041646472657373206973205a65726f206164647265737300604482015260640160405180910390fd5b600280546001600160a01b0319166001600160a01b03939093169290921790915560035561014e565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000806040838503121561012757600080fd5b82516001600160a01b038116811461013e57600080fd5b6020939093015192949293505050565b613ad78061015d6000396000f3fe6080604052600436106200011f5760003560e01c8063c4f58a6b11620000a1578063d7527883116200006c578063d752788314620003b0578063ecfb49a314620003e1578063f2fde38b14620003f9578063fdff9b4d146200041e578063fe1347eb146200045857600080fd5b8063c4f58a6b14620002d0578063d36a0981146200030a578063d4bc675f146200033b578063d4c2b230146200036057600080fd5b8063715018a611620000ee578063715018a614620002195780638da5cb5b1462000231578063a87407771462000265578063ad2f852a1462000296578063b8997a9714620002b857600080fd5b8063031aa61d14620001245780631172a704146200016b578063150b7a0214620001925780636a62784214620001f3575b600080fd5b3480156200013157600080fd5b50620001496200014336600462000d7a565b6200047d565b604080519283526001600160a01b039091166020830152015b60405180910390f35b3480156200017857600080fd5b50620001906200018a36600462000e28565b620005a3565b005b3480156200019f57600080fd5b50620001c1620001b136600462000e5a565b630a85bd0160e11b949350505050565b6040517fffffffff00000000000000000000000000000000000000000000000000000000909116815260200162000162565b6200020a6200020436600462000edf565b6200064c565b60405190815260200162000162565b3480156200022657600080fd5b506200019062000a2c565b3480156200023e57600080fd5b506000546001600160a01b03165b6040516001600160a01b03909116815260200162000162565b3480156200027257600080fd5b506200020a6200028436600462000edf565b60096020526000908152604090205481565b348015620002a357600080fd5b506002546200024c906001600160a01b031681565b348015620002c557600080fd5b506200020a60035481565b348015620002dd57600080fd5b506200024c620002ef36600462000e28565b6005602052600090815260409020546001600160a01b031681565b3480156200031757600080fd5b506200020a6200032936600462000edf565b60086020526000908152604090205481565b3480156200034857600080fd5b50620001906200035a36600462000edf565b62000a44565b3480156200036d57600080fd5b506200039f6200037f36600462000efd565b600a60209081526000928352604080842090915290825290205460ff1681565b604051901515815260200162000162565b348015620003bd57600080fd5b506200020a620003cf36600462000edf565b60066020526000908152604090205481565b348015620003ee57600080fd5b506200020a60045481565b3480156200040657600080fd5b50620001906200041836600462000edf565b62000afd565b3480156200042b57600080fd5b506200024c6200043d36600462000edf565b6007602052600090815260409020546001600160a01b031681565b3480156200046557600080fd5b506200020a6200047736600462000edf565b62000b79565b6000806200048a62000ba8565b600480549060006200049c8362000f4b565b91905055506000888888604051620004b49062000caf565b620004c29392919062000faf565b604051809103906000f080158015620004df573d6000803e3d6000fd5b5060048054600090815260056020908152604080832080546001600160a01b03199081166001600160a01b038816908117909255818552600684528285208d905560078452828520805433921682179055600884528285208c905560098452938290208a90559354815190815291820193909352918201529091507f91e92dae329c589773f31c22fe775ae37fdce39f63b3e7c3f3fc398c532f26839060600160405180910390a1600454925090506200059860018055565b965096945050505050565b620005ad62000ba8565b6002546001600160a01b0316331480620005d757506000546002546001600160a01b039081169116145b6200063a5760405162461bcd60e51b815260206004820152602860248201527f41646472657373206e6f74207065726d6973736f6e206368616e676520726f79604482015267616c74792066656560c01b60648201526084015b60405180910390fd5b60038190556200064960018055565b50565b60006200065862000ba8565b6001600160a01b0382811660009081526007602052604090205416620006c15760405162461bcd60e51b815260206004820152601660248201527f4e6674206e6f7420636f6e666967206d616e6167657200000000000000000000604482015260640162000631565b6001600160a01b0382166000908152600860205260409020544211156200072b5760405162461bcd60e51b815260206004820152600f60248201527f54696d65206d696e7420656e6465640000000000000000000000000000000000604482015260640162000631565b816001600160a01b03166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156200076a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019062000790919062000ff8565b6001600160a01b03831660009081526009602052604090205411620007f85760405162461bcd60e51b815260206004820152601960248201527f517479206f766572206d617820746f74616c20737570706c7900000000000000604482015260640162000631565b6001600160a01b0382166000908152600a6020908152604080832033845290915290205460ff16156200086e5760405162461bcd60e51b815260206004820152600e60248201527f55736572206973206d696e746564000000000000000000000000000000000000604482015260640162000631565b6003546001600160a01b0383166000908152600660205260408120549091620008979162001012565b905080341015620008eb5760405162461bcd60e51b815260206004820152601960248201527f4e6f7420656e6f75676820616d6f756e7420746f206d696e7400000000000000604482015260640162000631565b6002546003546040516001600160a01b039092169181156108fc0291906000818181858888f1935050505015801562000928573d6000803e3d6000fd5b506001600160a01b038084166000908152600760209081526040808320546006909252808320549051919093169280156108fc0292909190818181858888f193505050501580156200097e573d6000803e3d6000fd5b506040516335313c2160e11b81523360048201526001600160a01b03841690636a627842906024016020604051808303816000875af1158015620009c6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620009ec919062000ff8565b6001600160a01b0384166000908152600a602090815260408083203384529091529020805460ff1916600117905591505062000a2760018055565b919050565b62000a3662000c03565b62000a42600062000c5f565b565b62000a4e62000ba8565b6002546001600160a01b031633148062000a7857506000546002546001600160a01b039081169116145b62000adb5760405162461bcd60e51b815260206004820152602c60248201527f41646472657373206e6f74207065726d6973736f6e206368616e676520726f7960448201526b616c7479206164647265737360a01b606482015260840162000631565b600280546001600160a01b0319166001600160a01b0383161790556001805550565b62000b0762000c03565b6001600160a01b03811662000b6e5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840162000631565b620006498162000c5f565b6003546001600160a01b038216600090815260066020526040812054909162000ba29162001012565b92915050565b60026001540362000bfc5760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604482015260640162000631565b6002600155565b6000546001600160a01b0316331462000a425760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640162000631565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b612aa2806200102983390190565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff8084111562000cf15762000cf162000cbd565b604051601f8501601f19908116603f0116810190828211818310171562000d1c5762000d1c62000cbd565b8160405280935085815286868601111562000d3657600080fd5b858560208301376000602087830101525050509392505050565b600082601f83011262000d6257600080fd5b62000d738383356020850162000cd3565b9392505050565b60008060008060008060c0878903121562000d9457600080fd5b863567ffffffffffffffff8082111562000dad57600080fd5b62000dbb8a838b0162000d50565b9750602089013591508082111562000dd257600080fd5b62000de08a838b0162000d50565b9650604089013591508082111562000df757600080fd5b5062000e0689828a0162000d50565b945050606087013592506080870135915060a087013590509295509295509295565b60006020828403121562000e3b57600080fd5b5035919050565b80356001600160a01b038116811462000a2757600080fd5b6000806000806080858703121562000e7157600080fd5b62000e7c8562000e42565b935062000e8c6020860162000e42565b925060408501359150606085013567ffffffffffffffff81111562000eb057600080fd5b8501601f8101871362000ec257600080fd5b62000ed38782356020840162000cd3565b91505092959194509250565b60006020828403121562000ef257600080fd5b62000d738262000e42565b6000806040838503121562000f1157600080fd5b62000f1c8362000e42565b915062000f2c6020840162000e42565b90509250929050565b634e487b7160e01b600052601160045260246000fd5b60006001820162000f605762000f6062000f35565b5060010190565b6000815180845260005b8181101562000f8f5760208185018101518683018201520162000f71565b506000602082860101526020601f19601f83011685010191505092915050565b60608152600062000fc4606083018662000f67565b828103602084015262000fd8818662000f67565b9050828103604084015262000fee818562000f67565b9695505050505050565b6000602082840312156200100b57600080fd5b5051919050565b8082018082111562000ba25762000ba262000f3556fe60806040523480156200001157600080fd5b5060405162002aa238038062002aa283398101604081905262000034916200019d565b8282620000413362000088565b6000805460ff60a01b1916905560016200005c8382620002bd565b5060026200006b8282620002bd565b50600c91506200007e90508282620002bd565b5050505062000389565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200010057600080fd5b81516001600160401b03808211156200011d576200011d620000d8565b604051601f8301601f19908116603f01168101908282118183101715620001485762000148620000d8565b816040528381526020925086838588010111156200016557600080fd5b600091505b838210156200018957858201830151818301840152908201906200016a565b600093810190920192909252949350505050565b600080600060608486031215620001b357600080fd5b83516001600160401b0380821115620001cb57600080fd5b620001d987838801620000ee565b94506020860151915080821115620001f057600080fd5b620001fe87838801620000ee565b935060408601519150808211156200021557600080fd5b506200022486828701620000ee565b9150509250925092565b600181811c908216806200024357607f821691505b6020821081036200026457634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620002b857600081815260208120601f850160051c81016020861015620002935750805b601f850160051c820191505b81811015620002b4578281556001016200029f565b5050505b505050565b81516001600160401b03811115620002d957620002d9620000d8565b620002f181620002ea84546200022e565b846200026a565b602080601f831160018114620003295760008415620003105750858301515b600019600386901b1c1916600185901b178555620002b4565b600085815260208120601f198616915b828110156200035a5788860151825594840194600190910190840162000339565b5085821015620003795787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61270980620003996000396000f3fe608060405234801561001057600080fd5b50600436106101d95760003560e01c80635c975abb1161010457806395d89b41116100a2578063c7c3268b11610071578063c7c3268b146103ea578063c87b56dd146103fd578063e985e9c514610410578063f2fde38b1461044c57600080fd5b806395d89b41146103a95780639e59e598146103b1578063a22cb465146103c4578063b88d4fde146103d757600080fd5b806370a08231116100de57806370a0823114610375578063715018a6146103885780638456cb59146103905780638da5cb5b1461039857600080fd5b80635c975abb1461033d5780636352211e1461034f5780636a6278421461036257600080fd5b806318160ddd1161017c5780633f4ba83a1161014b5780633f4ba83a1461030757806342842e0e1461030f5780634f6ccce7146103225780635bcabf041461033557600080fd5b806318160ddd146102b957806323b872dd146102c1578063248b71fc146102d45780632f745c59146102f457600080fd5b80630665473a116101b85780630665473a1461024357806306fdde0314610264578063081812fc14610279578063095ea7b3146102a457600080fd5b8062b45565146101de57806301ffc9a71461020857806302bf3d561461022b575b600080fd5b6101f16101ec366004611fd1565b61045f565b6040516101ff929190612054565b60405180910390f35b61021b6102163660046120e5565b6105ec565b60405190151581526020016101ff565b600b546102359081565b6040519081526020016101ff565b610256610251366004611fd1565b610617565b6040516101ff92919061213d565b61026c61072a565b6040516101ff919061215f565b61028c610287366004612172565b6107bc565b6040516001600160a01b0390911681526020016101ff565b6102b76102b236600461218b565b6107e3565b005b600954610235565b6102b76102cf3660046121b5565b6108fd565b6102e76102e236600461218b565b610974565b6040516101ff91906121f1565b61023561030236600461218b565b610abc565b6102b7610b52565b6102b761031d3660046121b5565b610b64565b610235610330366004612172565b610b7f565b61026c610c12565b600054600160a01b900460ff1661021b565b61028c61035d366004612172565b610ca0565b610235610370366004612204565b610d05565b610235610383366004612204565b610d72565b6102b7610df8565b6102b7610e0a565b6000546001600160a01b031661028c565b61026c610e1a565b6102e76103bf366004612204565b610e29565b6102b76103d236600461221f565b610ec8565b6102b76103e53660046122e7565b610ed7565b6102b76103f8366004612363565b610f55565b61026c61040b366004612172565b610f69565b61021b61041e3660046123ac565b6001600160a01b03918216600090815260066020908152604080832093909416825291909152205460ff1690565b6102b761045a366004612204565b610fa9565b6060600061046c85610d72565b9050600184101561047c57600193505b60008361048a6001876123f5565b6104949190612408565b90508181106104e45760408051600080825260208201909252906104db565b6040805180820190915260008152606060208201528152602001906001900390816104b35790505b509250506105e4565b6000826104f18688612408565b11610505576105008587612408565b610507565b825b905061051382826123f5565b67ffffffffffffffff81111561052b5761052b61225b565b60405190808252806020026020018201604052801561057157816020015b6040805180820190915260008152606060208201528152602001906001900390816105495790505b509350815b818110156105e05760405180604001604052806105938a84610abc565b81526020016105a561040b8b85610abc565b9052856105b285846123f5565b815181106105c2576105c261241f565b602002602001018190525080806105d890612435565b915050610576565b5050505b935093915050565b60006001600160e01b0319821663780e9d6360e01b1480610611575061061182611022565b92915050565b6060600061062485610d72565b9050600184101561063457600193505b6000836106426001876123f5565b61064c9190612408565b905081811061066b5760408051600080825260208201909252906104db565b6000826106788688612408565b1161068c576106878587612408565b61068e565b825b905061069a82826123f5565b67ffffffffffffffff8111156106b2576106b261225b565b6040519080825280602002602001820160405280156106db578160200160208202803683370190505b509350815b818110156105e0576106f28882610abc565b856106fd85846123f5565b8151811061070d5761070d61241f565b60209081029190910101528061072281612435565b9150506106e0565b6060600180546107399061244e565b80601f01602080910402602001604051908101604052809291908181526020018280546107659061244e565b80156107b25780601f10610787576101008083540402835291602001916107b2565b820191906000526020600020905b81548152906001019060200180831161079557829003601f168201915b5050505050905090565b60006107c782611072565b506000908152600560205260409020546001600160a01b031690565b60006107ee82610ca0565b9050806001600160a01b0316836001600160a01b0316036108605760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b038216148061087c575061087c813361041e565b6108ee5760405162461bcd60e51b815260206004820152603d60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c0000006064820152608401610857565b6108f883836110d6565b505050565b6109073382611144565b6109695760405162461bcd60e51b815260206004820152602d60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201526c1c881bdc88185c1c1c9bdd9959609a1b6064820152608401610857565b6108f88383836111c3565b606061097e6113b0565b600082116109ce5760405162461bcd60e51b815260206004820152600f60248201527f5174792063616e6e6f74206265203000000000000000000000000000000000006044820152606401610857565b8167ffffffffffffffff8111156109e7576109e761225b565b604051908082528060200260200182016040528015610a10578160200160208202803683370190505b50905060005b82811015610a7457610a2c600b80546001019055565b6000610a37600b5490565b9050610a43858261140a565b80838381518110610a5657610a5661241f565b60209081029190910101525080610a6c81612435565b915050610a16565b50826001600160a01b03167fef5326e0bee684ca449bdddd555c92d093f19e4cab268151dec73b117042a06582604051610aae91906121f1565b60405180910390a292915050565b6000610ac783610d72565b8210610b295760405162461bcd60e51b815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201526a74206f6620626f756e647360a81b6064820152608401610857565b506001600160a01b03919091166000908152600760209081526040808320938352929052205490565b610b5a6113b0565b610b626115a3565b565b6108f883838360405180602001604052806000815250610ed7565b6000610b8a60095490565b8210610bed5760405162461bcd60e51b815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201526b7574206f6620626f756e647360a01b6064820152608401610857565b60098281548110610c0057610c0061241f565b90600052602060002001549050919050565b600c8054610c1f9061244e565b80601f0160208091040260200160405190810160405280929190818152602001828054610c4b9061244e565b8015610c985780601f10610c6d57610100808354040283529160200191610c98565b820191906000526020600020905b815481529060010190602001808311610c7b57829003601f168201915b505050505081565b6000818152600360205260408120546001600160a01b0316806106115760405162461bcd60e51b815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e20494400000000000000006044820152606401610857565b6000610d0f6113b0565b610d1d600b80546001019055565b6000610d28600b5490565b9050610d34838261140a565b6040516001600160a01b0384169082907ff3cea5493d790af0133817606f7350a91d7f154ea52eaa79d179d4d231e5010290600090a390505b919050565b60006001600160a01b038216610ddc5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b6064820152608401610857565b506001600160a01b031660009081526004602052604090205490565b610e006113b0565b610b6260006115f8565b610e126113b0565b610b62611648565b6060600280546107399061244e565b60606000610e3683610d72565b90508067ffffffffffffffff811115610e5157610e5161225b565b604051908082528060200260200182016040528015610e7a578160200160208202803683370190505b50915060005b81811015610ec157610e928482610abc565b838281518110610ea457610ea461241f565b602090810291909101015280610eb981612435565b915050610e80565b5050919050565b610ed333838361168b565b5050565b610ee13383611144565b610f435760405162461bcd60e51b815260206004820152602d60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201526c1c881bdc88185c1c1c9bdd9959609a1b6064820152608401610857565b610f4f84848484611759565b50505050565b610f5d6113b0565b600c610ed382826124d6565b6060600c610f783060146117d7565b610f818461197a565b604051602001610f93939291906125b2565b6040516020818303038152906040529050919050565b610fb16113b0565b6001600160a01b0381166110165760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610857565b61101f816115f8565b50565b60006001600160e01b031982166380ac58cd60e01b148061105357506001600160e01b03198216635b5e139f60e01b145b8061061157506301ffc9a760e01b6001600160e01b0319831614610611565b6000818152600360205260409020546001600160a01b031661101f5760405162461bcd60e51b815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e20494400000000000000006044820152606401610857565b600081815260056020526040902080546001600160a01b0319166001600160a01b038416908117909155819061110b82610ca0565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b60008061115083610ca0565b9050806001600160a01b0316846001600160a01b0316148061119757506001600160a01b0380821660009081526006602090815260408083209388168352929052205460ff165b806111bb5750836001600160a01b03166111b0846107bc565b6001600160a01b0316145b949350505050565b826001600160a01b03166111d682610ca0565b6001600160a01b03161461123a5760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b6064820152608401610857565b6001600160a01b03821661129c5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610857565b6112a98383836001611a0d565b826001600160a01b03166112bc82610ca0565b6001600160a01b0316146113205760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b6064820152608401610857565b600081815260056020908152604080832080546001600160a01b03199081169091556001600160a01b0387811680865260048552838620805460001901905590871680865283862080546001019055868652600390945282852080549092168417909155905184937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6000546001600160a01b03163314610b625760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610857565b6001600160a01b0382166114605760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610857565b6000818152600360205260409020546001600160a01b0316156114c55760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610857565b6114d3600083836001611a0d565b6000818152600360205260409020546001600160a01b0316156115385760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610857565b6001600160a01b038216600081815260046020908152604080832080546001019055848352600390915280822080546001600160a01b0319168417905551839291907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6115ab611b49565b6000805460ff60a01b191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b611650611ba2565b6000805460ff60a01b1916600160a01b1790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586115db3390565b816001600160a01b0316836001600160a01b0316036116ec5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610857565b6001600160a01b03838116600081815260066020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6117648484846111c3565b61177084848484611bfc565b610f4f5760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b6064820152608401610857565b606060006117e6836002612408565b6117f1906002612663565b67ffffffffffffffff8111156118095761180961225b565b6040519080825280601f01601f191660200182016040528015611833576020820181803683370190505b509050600360fc1b8160008151811061184e5761184e61241f565b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061187d5761187d61241f565b60200101906001600160f81b031916908160001a90535060006118a1846002612408565b6118ac906001612663565b90505b6001811115611924576f181899199a1a9b1b9c1cb0b131b232b360811b85600f16601081106118e0576118e061241f565b1a60f81b8282815181106118f6576118f661241f565b60200101906001600160f81b031916908160001a90535060049490941c9361191d81612676565b90506118af565b5083156119735760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610857565b9392505050565b6060600061198783611d48565b600101905060008167ffffffffffffffff8111156119a7576119a761225b565b6040519080825280601f01601f1916602001820160405280156119d1576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a85049450846119db57509392505050565b6001811115611a845760405162461bcd60e51b815260206004820152603560248201527f455243373231456e756d657261626c653a20636f6e736563757469766520747260448201527f616e7366657273206e6f7420737570706f7274656400000000000000000000006064820152608401610857565b816001600160a01b038516611ae057611adb81600980546000838152600a60205260408120829055600182018355919091527f6e1540171b6c0c960b71a7020d9f60077f6af931a8bbf590da0223dacf75c7af0155565b611b03565b836001600160a01b0316856001600160a01b031614611b0357611b038582611e2a565b6001600160a01b038416611b1f57611b1a81611ec7565b611b42565b846001600160a01b0316846001600160a01b031614611b4257611b428482611f76565b5050505050565b600054600160a01b900460ff16610b625760405162461bcd60e51b815260206004820152601460248201527f5061757361626c653a206e6f74207061757365640000000000000000000000006044820152606401610857565b600054600160a01b900460ff1615610b625760405162461bcd60e51b815260206004820152601060248201527f5061757361626c653a20706175736564000000000000000000000000000000006044820152606401610857565b60006001600160a01b0384163b15611d3d57604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290611c4090339089908890889060040161268d565b6020604051808303816000875af1925050508015611c7b575060408051601f3d908101601f19168201909252611c78918101906126c9565b60015b611d23573d808015611ca9576040519150601f19603f3d011682016040523d82523d6000602084013e611cae565b606091505b508051600003611d1b5760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b6064820152608401610857565b805181602001fd5b6001600160e01b031916630a85bd0160e11b1490506111bb565b506001949350505050565b6000807a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008310611d91577a184f03e93ff9f4daa797ed6e38ed64bf6a1f010000000000000000830492506040015b6d04ee2d6d415b85acef81000000008310611dbd576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc100008310611ddb57662386f26fc10000830492506010015b6305f5e1008310611df3576305f5e100830492506008015b6127108310611e0757612710830492506004015b60648310611e19576064830492506002015b600a83106106115760010192915050565b60006001611e3784610d72565b611e4191906123f5565b600083815260086020526040902054909150808214611e94576001600160a01b03841660009081526007602090815260408083208584528252808320548484528184208190558352600890915290208190555b5060009182526008602090815260408084208490556001600160a01b039094168352600781528383209183525290812055565b600954600090611ed9906001906123f5565b6000838152600a602052604081205460098054939450909284908110611f0157611f0161241f565b906000526020600020015490508060098381548110611f2257611f2261241f565b6000918252602080832090910192909255828152600a90915260408082208490558582528120556009805480611f5a57611f5a6126e6565b6001900381819060005260206000200160009055905550505050565b6000611f8183610d72565b6001600160a01b039093166000908152600760209081526040808320868452825280832085905593825260089052919091209190915550565b80356001600160a01b0381168114610d6d57600080fd5b600080600060608486031215611fe657600080fd5b611fef84611fba565b95602085013595506040909401359392505050565b60005b8381101561201f578181015183820152602001612007565b50506000910152565b60008151808452612040816020860160208601612004565b601f01601f19169290920160200192915050565b6000604080830181845280865180835260608601915060608160051b8701019250602080890160005b838110156120bc57888603605f190185528151805187528301518387018890526120a988880182612028565b965050938201939082019060010161207d565b5050959095019590955295945050505050565b6001600160e01b03198116811461101f57600080fd5b6000602082840312156120f757600080fd5b8135611973816120cf565b600081518084526020808501945080840160005b8381101561213257815187529582019590820190600101612116565b509495945050505050565b6040815260006121506040830185612102565b90508260208301529392505050565b6020815260006119736020830184612028565b60006020828403121561218457600080fd5b5035919050565b6000806040838503121561219e57600080fd5b6121a783611fba565b946020939093013593505050565b6000806000606084860312156121ca57600080fd5b6121d384611fba565b92506121e160208501611fba565b9150604084013590509250925092565b6020815260006119736020830184612102565b60006020828403121561221657600080fd5b61197382611fba565b6000806040838503121561223257600080fd5b61223b83611fba565b91506020830135801515811461225057600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff8084111561228c5761228c61225b565b604051601f8501601f19908116603f011681019082821181831017156122b4576122b461225b565b816040528093508581528686860111156122cd57600080fd5b858560208301376000602087830101525050509392505050565b600080600080608085870312156122fd57600080fd5b61230685611fba565b935061231460208601611fba565b925060408501359150606085013567ffffffffffffffff81111561233757600080fd5b8501601f8101871361234857600080fd5b61235787823560208401612271565b91505092959194509250565b60006020828403121561237557600080fd5b813567ffffffffffffffff81111561238c57600080fd5b8201601f8101841361239d57600080fd5b6111bb84823560208401612271565b600080604083850312156123bf57600080fd5b6123c883611fba565b91506123d660208401611fba565b90509250929050565b634e487b7160e01b600052601160045260246000fd5b81810381811115610611576106116123df565b8082028115828204841417610611576106116123df565b634e487b7160e01b600052603260045260246000fd5b600060018201612447576124476123df565b5060010190565b600181811c9082168061246257607f821691505b60208210810361248257634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156108f857600081815260208120601f850160051c810160208610156124af5750805b601f850160051c820191505b818110156124ce578281556001016124bb565b505050505050565b815167ffffffffffffffff8111156124f0576124f061225b565b612504816124fe845461244e565b84612488565b602080601f83116001811461253957600084156125215750858301515b600019600386901b1c1916600185901b1785556124ce565b600085815260208120601f198616915b8281101561256857888601518255948401946001909101908401612549565b50858210156125865787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b600081516125a8818560208601612004565b9290920192915050565b60008085546125c08161244e565b600182811680156125d857600181146125ed5761261c565b60ff198416875282151583028701945061261c565b8960005260208060002060005b858110156126135781548a8201529084019082016125fa565b50505082870194505b50602f60f81b8452875192506126388382860160208b01612004565b6126566126508285870101602f60f81b815260010190565b88612596565b9998505050505050505050565b80820180821115610611576106116123df565b600081612685576126856123df565b506000190190565b60006001600160a01b038087168352808616602084015250836040830152608060608301526126bf6080830184612028565b9695505050505050565b6000602082840312156126db57600080fd5b8151611973816120cf565b634e487b7160e01b600052603160045260246000fdfea164736f6c6343000813000aa164736f6c6343000813000a";

export class MintNftFactory__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _royaltyAddress: string,
    _royaltyFee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MintNftFactory> {
    return super.deploy(
      _royaltyAddress,
      _royaltyFee,
      overrides || {}
    ) as Promise<MintNftFactory>;
  }
  getDeployTransaction(
    _royaltyAddress: string,
    _royaltyFee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _royaltyAddress,
      _royaltyFee,
      overrides || {}
    );
  }
  attach(address: string): MintNftFactory {
    return super.attach(address) as MintNftFactory;
  }
  connect(signer: Signer): MintNftFactory__factory {
    return super.connect(signer) as MintNftFactory__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MintNftFactoryInterface {
    return new utils.Interface(_abi) as MintNftFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MintNftFactory {
    return new Contract(address, _abi, signerOrProvider) as MintNftFactory;
  }
}
