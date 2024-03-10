/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { DooDooToken, DooDooTokenInterface } from "../DooDooToken";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "ONE_HUNDRED_PERCENT",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
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
    name: "dexPairs",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
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
    name: "sellTax",
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
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
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
        internalType: "address[]",
        name: "_routers",
        type: "address[]",
      },
    ],
    name: "updateDexPair",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405260646007553480156200001657600080fd5b5060405180604001604052806007815260200166446f6f20446f6f60c81b81525060405180604001604052806006815260200165446f6f446f6f60d01b815250816003908162000067919062000287565b50600462000076828262000287565b505050620000936200008d620000c260201b60201c565b620000c6565b620000bc33620000a66012600a62000468565b620000b690633b9aca0062000480565b62000118565b620004b0565b3390565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b038216620001735760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b80600260008282546200018791906200049a565b90915550506001600160a01b038216600081815260208181526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35050565b505050565b634e487b7160e01b600052604160045260246000fd5b600181811c908216806200020e57607f821691505b6020821081036200022f57634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620001de57600081815260208120601f850160051c810160208610156200025e5750805b601f850160051c820191505b818110156200027f578281556001016200026a565b505050505050565b81516001600160401b03811115620002a357620002a3620001e3565b620002bb81620002b48454620001f9565b8462000235565b602080601f831160018114620002f35760008415620002da5750858301515b600019600386901b1c1916600185901b1785556200027f565b600085815260208120601f198616915b82811015620003245788860151825594840194600190910190840162000303565b5085821015620003435787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052601160045260246000fd5b600181815b80851115620003aa5781600019048211156200038e576200038e62000353565b808516156200039c57918102915b93841c93908002906200036e565b509250929050565b600082620003c35750600162000462565b81620003d25750600062000462565b8160018114620003eb5760028114620003f65762000416565b600191505062000462565b60ff8411156200040a576200040a62000353565b50506001821b62000462565b5060208310610133831016604e8410600b84101617156200043b575081810a62000462565b62000447838362000369565b80600019048211156200045e576200045e62000353565b0290505b92915050565b60006200047960ff841683620003b2565b9392505050565b808202811582820484141762000462576200046262000353565b8082018082111562000462576200046262000353565b61115c80620004c06000396000f3fe608060405234801561001057600080fd5b50600436106101165760003560e01c80638da5cb5b116100a2578063c002f93911610071578063c002f93914610232578063cc1776d314610255578063dd0081c71461025e578063dd62ed3e14610267578063f2fde38b146102a057600080fd5b80638da5cb5b146101e957806395d89b4114610204578063a457c2d71461020c578063a9059cbb1461021f57600080fd5b806328f82ce1116100e957806328f82ce114610181578063313ce5671461019657806339509351146101a557806370a08231146101b8578063715018a6146101e157600080fd5b806306fdde031461011b578063095ea7b31461013957806318160ddd1461015c57806323b872dd1461016e575b600080fd5b6101236102b3565b6040516101309190610eb2565b60405180910390f35b61014c610147366004610f15565b610345565b6040519015158152602001610130565b6002545b604051908152602001610130565b61014c61017c366004610f41565b61035f565b61019461018f366004610f82565b610383565b005b60405160128152602001610130565b61014c6101b3366004610f15565b6106a2565b6101606101c6366004610ff7565b6001600160a01b031660009081526020819052604090205490565b6101946106e1565b6005546040516001600160a01b039091168152602001610130565b6101236106f5565b61014c61021a366004610f15565b610704565b61014c61022d366004610f15565b61079b565b61014c610240366004610ff7565b60066020526000908152604090205460ff1681565b61016060075481565b61016061271081565b61016061027536600461101b565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6101946102ae366004610ff7565b6107a9565b6060600380546102c290611054565b80601f01602080910402602001604051908101604052809291908181526020018280546102ee90611054565b801561033b5780601f106103105761010080835404028352916020019161033b565b820191906000526020600020905b81548152906001019060200180831161031e57829003601f168201915b5050505050905090565b600033610353818585610822565b60019150505b92915050565b60003361036d858285610946565b6103788585856109d8565b506001949350505050565b61038b610b23565b60005b8181101561069d576000808484848181106103ab576103ab61108e565b90506020020160208101906103c09190610ff7565b9050806001600160a01b031663c45a01556040518163ffffffff1660e01b8152600401602060405180830381865afa158015610400573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061042491906110a4565b6001600160a01b031663e6a4390530836001600160a01b031663ad5c46486040518163ffffffff1660e01b8152600401602060405180830381865afa158015610471573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061049591906110a4565b6040516001600160e01b031960e085901b1681526001600160a01b03928316600482015291166024820152604401602060405180830381865afa1580156104e0573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061050491906110a4565b91506001600160a01b03821661065b57806001600160a01b031663c45a01556040518163ffffffff1660e01b8152600401602060405180830381865afa158015610552573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061057691906110a4565b6001600160a01b031663c9c6539630836001600160a01b031663ad5c46486040518163ffffffff1660e01b8152600401602060405180830381865afa1580156105c3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105e791906110a4565b6040516001600160e01b031960e085901b1681526001600160a01b039283166004820152911660248201526044016020604051808303816000875af1158015610634573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061065891906110a4565b91505b6106683082600019610822565b506001600160a01b03166000908152600660205260409020805460ff1916600117905580610695816110d7565b91505061038e565b505050565b3360008181526001602090815260408083206001600160a01b038716845290915281205490919061035390829086906106dc9087906110f0565b610822565b6106e9610b23565b6106f36000610b7d565b565b6060600480546102c290611054565b3360008181526001602090815260408083206001600160a01b03871684529091528120549091908381101561078e5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b6103788286868403610822565b6000336103538185856109d8565b6107b1610b23565b6001600160a01b0381166108165760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610785565b61081f81610b7d565b50565b6001600160a01b0383166108845760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610785565b6001600160a01b0382166108e55760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610785565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b0383811660009081526001602090815260408083209386168352929052205460001981146109d257818110156109c55760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610785565b6109d28484848403610822565b50505050565b6001600160a01b038316610a3c5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610785565b6001600160a01b038216610a9e5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610785565b80600003610ab25761069d83836000610bdc565b6001600160a01b03821660009081526006602052604081205460ff1615610af15761271060075483610ae49190611103565b610aee919061111a565b90505b8015610b1857610b01818361113c565b9150610b0e843083610bdc565b610b183082610d80565b6109d2848484610bdc565b6005546001600160a01b031633146106f35760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610785565b600580546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b038316610c405760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610785565b6001600160a01b038216610ca25760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610785565b6001600160a01b03831660009081526020819052604090205481811015610d1a5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610785565b6001600160a01b03848116600081815260208181526040808320878703905593871680835291849020805487019055925185815290927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a36109d2565b6001600160a01b038216610de05760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b6064820152608401610785565b6001600160a01b03821660009081526020819052604090205481811015610e545760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b6064820152608401610785565b6001600160a01b0383166000818152602081815260408083208686039055600280548790039055518581529192917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a3505050565b600060208083528351808285015260005b81811015610edf57858101830151858201604001528201610ec3565b506000604082860101526040601f19601f8301168501019250505092915050565b6001600160a01b038116811461081f57600080fd5b60008060408385031215610f2857600080fd5b8235610f3381610f00565b946020939093013593505050565b600080600060608486031215610f5657600080fd5b8335610f6181610f00565b92506020840135610f7181610f00565b929592945050506040919091013590565b60008060208385031215610f9557600080fd5b823567ffffffffffffffff80821115610fad57600080fd5b818501915085601f830112610fc157600080fd5b813581811115610fd057600080fd5b8660208260051b8501011115610fe557600080fd5b60209290920196919550909350505050565b60006020828403121561100957600080fd5b813561101481610f00565b9392505050565b6000806040838503121561102e57600080fd5b823561103981610f00565b9150602083013561104981610f00565b809150509250929050565b600181811c9082168061106857607f821691505b60208210810361108857634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052603260045260246000fd5b6000602082840312156110b657600080fd5b815161101481610f00565b634e487b7160e01b600052601160045260246000fd5b6000600182016110e9576110e96110c1565b5060010190565b80820180821115610359576103596110c1565b8082028115828204841417610359576103596110c1565b60008261113757634e487b7160e01b600052601260045260246000fd5b500490565b81810381811115610359576103596110c156fea164736f6c6343000813000a";

export class DooDooToken__factory extends ContractFactory {
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
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<DooDooToken> {
    return super.deploy(overrides || {}) as Promise<DooDooToken>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): DooDooToken {
    return super.attach(address) as DooDooToken;
  }
  connect(signer: Signer): DooDooToken__factory {
    return super.connect(signer) as DooDooToken__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DooDooTokenInterface {
    return new utils.Interface(_abi) as DooDooTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DooDooToken {
    return new Contract(address, _abi, signerOrProvider) as DooDooToken;
  }
}
