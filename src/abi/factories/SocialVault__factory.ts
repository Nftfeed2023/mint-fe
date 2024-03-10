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
import type { SocialVault, SocialVaultInterface } from "../SocialVault";

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
        name: "_creationFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_minAmountClaim",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_systemAddress",
        type: "address",
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
        name: "campaignId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "creator",
        type: "address",
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
        name: "tokenAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalAmountBonus",
        type: "uint256",
      },
    ],
    name: "CreateCampaign",
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
        name: "",
        type: "address",
      },
    ],
    name: "admins",
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
    ],
    name: "amountUsers",
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
        internalType: "uint256",
        name: "_creationFee",
        type: "uint256",
      },
    ],
    name: "changeCreationFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
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
        internalType: "address",
        name: "_systemAddress",
        type: "address",
      },
    ],
    name: "changeSystemAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
    ],
    name: "claim",
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
    name: "containers",
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
        name: "_ntfAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_totalAmountBonus",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_endTime",
        type: "uint256",
      },
    ],
    name: "createCampaign",
    outputs: [
      {
        internalType: "uint256",
        name: "poolId",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "creationFee",
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
    name: "creators",
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
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "emergencyWithdraw",
    outputs: [],
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
        name: "_ntfAddress",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "_users",
        type: "address[]",
      },
    ],
    name: "finalize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "isClose",
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
    inputs: [],
    name: "minAmountClaim",
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
    name: "nftsRegistered",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "startTimes",
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
    name: "systemAddress",
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
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "systemWithdraw",
    outputs: [],
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
    name: "tokens",
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
    name: "totalAmountBonus",
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
    name: "totalCampaign",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "_admin",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_isAdd",
        type: "bool",
      },
    ],
    name: "updateAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405260006007553480156200001657600080fd5b50604051620016bb380380620016bb8339810160408190526200003991620001e4565b620000443362000177565b600180556001600160a01b038416620000a45760405162461bcd60e51b815260206004820152601f60248201527f526f79616c74792041646472657373206973205a65726f20616464726573730060448201526064015b60405180910390fd5b6001600160a01b038116620000fc5760405162461bcd60e51b815260206004820152601e60248201527f53797374656d2041646472657373206973205a65726f2061646472657373000060448201526064016200009b565b600480546001600160a01b038087166001600160a01b031992831617909255600585905560068490556003805492841692909116919091179055600160026000620001443390565b6001600160a01b031681526020810191909152604001600020805460ff1916911515919091179055506200022f92505050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b80516001600160a01b0381168114620001df57600080fd5b919050565b60008060008060808587031215620001fb57600080fd5b6200020685620001c7565b935060208501519250604085015191506200022460608601620001c7565b905092959194509250565b61147c806200023f6000396000f3fe6080604052600436106101ac5760003560e01c8063a1596c4c116100ec578063d4bc675f1161008a578063e42e290d11610064578063e42e290d14610514578063e48603391461052a578063f2fde38b14610560578063f53fd4ae1461058057600080fd5b8063d4bc675f146104be578063d9723751146104de578063dce0b4e4146104fe57600080fd5b8063c92ca3b0116100c6578063c92ca3b01461043e578063d276217914610451578063d36a098114610471578063d3e848f11461049e57600080fd5b8063a1596c4c146103c8578063ad2f852a146103e8578063b49a75091461040857600080fd5b80635e82409e1161015957806388ab08131161013357806388ab0813146103035780638da5cb5b14610333578063933166e11461036557806397591cbf1461039b57600080fd5b80635e82409e146102b8578063670a6fd9146102ce578063715018a6146102ee57600080fd5b8063429b62e51161018a578063429b62e514610222578063441e9f03146102525780635312ea8e1461029857600080fd5b806304d63089146101b15780631338f493146101d35780631e83409a14610202575b600080fd5b3480156101bd57600080fd5b506101d16101cc3660046111d9565b6105ad565b005b3480156101df57600080fd5b50600f546101ed9060ff1681565b60405190151581526020015b60405180910390f35b34801561020e57600080fd5b506101d161021d3660046111d9565b61063d565b34801561022e57600080fd5b506101ed61023d3660046111d9565b60026020526000908152604090205460ff1681565b34801561025e57600080fd5b5061028a61026d3660046111fb565b601060209081526000928352604080842090915290825290205481565b6040519081526020016101f9565b3480156102a457600080fd5b506101d16102b336600461122e565b610707565b3480156102c457600080fd5b5061028a60065481565b3480156102da57600080fd5b506101d16102e9366004611255565b610737565b3480156102fa57600080fd5b506101d16107c9565b34801561030f57600080fd5b506101ed61031e3660046111d9565b60096020526000908152604090205460ff1681565b34801561033f57600080fd5b506000546001600160a01b03165b6040516001600160a01b0390911681526020016101f9565b34801561037157600080fd5b5061034d6103803660046111d9565b600c602052600090815260409020546001600160a01b031681565b3480156103a757600080fd5b5061028a6103b63660046111d9565b600b6020526000908152604090205481565b3480156103d457600080fd5b506101d16103e336600461122e565b6107dd565b3480156103f457600080fd5b5060045461034d906001600160a01b031681565b34801561041457600080fd5b5061034d61042336600461122e565b6008602052600090815260409020546001600160a01b031681565b61028a61044c36600461128c565b6107fb565b34801561045d57600080fd5b506101d161046c36600461122e565b610a74565b34801561047d57600080fd5b5061028a61048c3660046111d9565b600e6020526000908152604090205481565b3480156104aa57600080fd5b5060035461034d906001600160a01b031681565b3480156104ca57600080fd5b506101d16104d93660046111d9565b610a9b565b3480156104ea57600080fd5b506101d16104f93660046112d9565b610b23565b34801561050a57600080fd5b5061028a60055481565b34801561052057600080fd5b5061028a60075481565b34801561053657600080fd5b5061034d6105453660046111d9565b600a602052600090815260409020546001600160a01b031681565b34801561056c57600080fd5b506101d161057b3660046111d9565b610d11565b34801561058c57600080fd5b5061028a61059b3660046111d9565b600d6020526000908152604090205481565b6105b5610d87565b6105bd610de1565b6001600160a01b0381166106185760405162461bcd60e51b815260206004820152601e60248201527f53797374656d2041646472657373206973205a65726f2061646472657373000060448201526064015b60405180910390fd5b600380546001600160a01b0319166001600160a01b0383161790556001805550565b50565b610645610de1565b6001600160a01b03811660009081526010602090815260408083203384529091529020546006548110156106c95760405162461bcd60e51b815260206004820152602560248201527f596f757220616d6f756e74206973206e6f7420656e6f75676820746f20776974604482015264686472617760d81b606482015260840161060f565b6106dd6001600160a01b0383163383610e3a565b506001600160a01b0316600090815260106020908152604080832033845290915281205560018055565b61070f610d87565b610717610de1565b61072e336003546001600160a01b03169083610e3a565b61063a60018055565b61073f610d87565b610747610de1565b6001600160a01b03821661079d5760405162461bcd60e51b815260206004820152601660248201527f41646d696e2061646472657373206973205a65726f2000000000000000000000604482015260640161060f565b6001600160a01b0382166000908152600260205260409020805460ff1916821515179055600180555050565b6107d1610d87565b6107db6000610eca565b565b6107e5610d87565b6107ed610de1565b600581905561063a60018055565b6000610805610de1565b6001600160a01b03861660009081526009602052604090205460ff161561086e5760405162461bcd60e51b815260206004820152601d60248201527f436f6c6c656374696f6e206973206372656174652063616d706169676e000000604482015260640161060f565b8282116108bd5760405162461bcd60e51b815260206004820152601460248201527f656e6454696d65203c3d20737461727454696d65000000000000000000000000604482015260640161060f565b4282116108fc5760405162461bcd60e51b815260206004820152600d60248201526c22b7323a34b6b29032b93937b960991b604482015260640161060f565b6004546005546040516001600160a01b039092169181156108fc0291906000818181858888f19350505050158015610938573d6000803e3d6000fd5b5061094e6001600160a01b038616333087610f1a565b6007805490600061095e83611375565b9091555050600081815260086020908152604080832080546001600160a01b038b81166001600160a01b03199283168117909355918552600a84528285208054928b169282168317905560098452828520805460ff19166001179055600c8452828520805490911633179055600b8352818420889055600d8352818420879055600e83528184208690558352601190915281208054869290610a0190849061138e565b9091555050600754604080519182523360208301526001600160a01b03888116838301528716606083015260808201869052517f08cd70a6c2b3b0d10f2ce3d662265744bb5fa57ad96366710f4d1f35017756ce9181900360a00190a150600754610a6b60018055565b95945050505050565b610a7c610d87565b610a84610de1565b60035461072e906001600160a01b03168083610e3a565b610aa3610d87565b610aab610de1565b6001600160a01b038116610b015760405162461bcd60e51b815260206004820152601f60248201527f526f79616c74792041646472657373206973205a65726f206164647265737300604482015260640161060f565b600480546001600160a01b0319166001600160a01b0383161790556001805550565b3360009081526002602052604090205460ff16610b825760405162461bcd60e51b815260206004820152601e60248201527f41646d696e3a2063616c6c6572206973206e6f74207468652061646d696e0000604482015260640161060f565b610b8a610de1565b600f5460ff1615610bdd5760405162461bcd60e51b815260206004820152600e60248201527f43616d706169676e2066696e616c000000000000000000000000000000000000604482015260640161060f565b80610c2a5760405162461bcd60e51b815260206004820152601260248201527f4c697374207573657220697320656d7074790000000000000000000000000000604482015260640161060f565b6001600160a01b0383166000908152600b6020526040812054610c4e9083906113a7565b905060005b82811015610cf4576001600160a01b038086166000908152600a60209081526040808320549093168252601090529081208391868685818110610c9857610c986113c9565b9050602002016020810190610cad91906111d9565b6001600160a01b03166001600160a01b031681526020019081526020016000206000828254610cdc919061138e565b90915550819050610cec81611375565b915050610c53565b5050600f805460ff19166001179055610d0c60018055565b505050565b610d19610d87565b6001600160a01b038116610d7e5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161060f565b61063a81610eca565b6000546001600160a01b031633146107db5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161060f565b600260015403610e335760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604482015260640161060f565b6002600155565b6040516001600160a01b038316602482015260448101829052610d0c90849063a9059cbb60e01b906064015b60408051601f198184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff0000000000000000000000000000000000000000000000000000000090931692909217909152610f58565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6040516001600160a01b0380851660248301528316604482015260648101829052610f529085906323b872dd60e01b90608401610e66565b50505050565b6000610fad826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b031661102d9092919063ffffffff16565b9050805160001480610fce575080806020019051810190610fce91906113df565b610d0c5760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b606482015260840161060f565b606061103c8484600085611044565b949350505050565b6060824710156110a55760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b606482015260840161060f565b600080866001600160a01b031685876040516110c19190611420565b60006040518083038185875af1925050503d80600081146110fe576040519150601f19603f3d011682016040523d82523d6000602084013e611103565b606091505b50915091506111148783838761111f565b979650505050505050565b6060831561118e578251600003611187576001600160a01b0385163b6111875760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161060f565b508161103c565b61103c83838151156111a35781518083602001fd5b8060405162461bcd60e51b815260040161060f919061143c565b80356001600160a01b03811681146111d457600080fd5b919050565b6000602082840312156111eb57600080fd5b6111f4826111bd565b9392505050565b6000806040838503121561120e57600080fd5b611217836111bd565b9150611225602084016111bd565b90509250929050565b60006020828403121561124057600080fd5b5035919050565b801515811461063a57600080fd5b6000806040838503121561126857600080fd5b611271836111bd565b9150602083013561128181611247565b809150509250929050565b600080600080600060a086880312156112a457600080fd5b6112ad866111bd565b94506112bb602087016111bd565b94979496505050506040830135926060810135926080909101359150565b6000806000604084860312156112ee57600080fd5b6112f7846111bd565b9250602084013567ffffffffffffffff8082111561131457600080fd5b818601915086601f83011261132857600080fd5b81358181111561133757600080fd5b8760208260051b850101111561134c57600080fd5b6020830194508093505050509250925092565b634e487b7160e01b600052601160045260246000fd5b6000600182016113875761138761135f565b5060010190565b808201808211156113a1576113a161135f565b92915050565b6000826113c457634e487b7160e01b600052601260045260246000fd5b500490565b634e487b7160e01b600052603260045260246000fd5b6000602082840312156113f157600080fd5b81516111f481611247565b60005b838110156114175781810151838201526020016113ff565b50506000910152565b600082516114328184602087016113fc565b9190910192915050565b602081526000825180602084015261145b8160408501602087016113fc565b601f01601f1916919091016040019291505056fea164736f6c6343000813000a";

export class SocialVault__factory extends ContractFactory {
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
    _creationFee: BigNumberish,
    _minAmountClaim: BigNumberish,
    _systemAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<SocialVault> {
    return super.deploy(
      _royaltyAddress,
      _creationFee,
      _minAmountClaim,
      _systemAddress,
      overrides || {}
    ) as Promise<SocialVault>;
  }
  getDeployTransaction(
    _royaltyAddress: string,
    _creationFee: BigNumberish,
    _minAmountClaim: BigNumberish,
    _systemAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _royaltyAddress,
      _creationFee,
      _minAmountClaim,
      _systemAddress,
      overrides || {}
    );
  }
  attach(address: string): SocialVault {
    return super.attach(address) as SocialVault;
  }
  connect(signer: Signer): SocialVault__factory {
    return super.connect(signer) as SocialVault__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SocialVaultInterface {
    return new utils.Interface(_abi) as SocialVaultInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SocialVault {
    return new Contract(address, _abi, signerOrProvider) as SocialVault;
  }
}