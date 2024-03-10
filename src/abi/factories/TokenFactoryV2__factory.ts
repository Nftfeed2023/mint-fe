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
  TokenFactoryV2,
  TokenFactoryV2Interface,
} from "../TokenFactoryV2";

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
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalSupply",
        type: "uint256",
      },
    ],
    name: "DeployToken",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "containerTokens",
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
        internalType: "uint256",
        name: "_totalSupply",
        type: "uint256",
      },
    ],
    name: "deploy",
    outputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    stateMutability: "payable",
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
        internalType: "uint256",
        name: "_totalSupply",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_baseUrl",
        type: "string",
      },
    ],
    name: "deployERC404",
    outputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    stateMutability: "payable",
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
    name: "totalToken",
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
  "0x608060405234801561001057600080fd5b50604051613deb380380613deb83398101604081905261002f91610143565b610038336100f3565b600180556001600160a01b0382166100965760405162461bcd60e51b815260206004820152601f60248201527f526f79616c74792041646472657373206973205a65726f206164647265737300604482015260640160405180910390fd5b600280546001600160a01b0319166001600160a01b03841617905560038190556001600660006100c33390565b6001600160a01b031681526020810191909152604001600020805460ff19169115159190911790555061017d9050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000806040838503121561015657600080fd5b82516001600160a01b038116811461016d57600080fd5b6020939093015192949293505050565b613c5f8061018c6000396000f3fe608060405260043610620000e35760003560e01c8063874591a21162000089578063ad2f852a1162000060578063ad2f852a146200025d578063d4bc675f146200027f578063dce0b4e414620002a4578063f2fde38b14620002bc57600080fd5b8063874591a214620001de5780638da5cb5b1462000218578063a1596c4c146200023857600080fd5b8063626be56711620000be578063626be5671462000178578063670a6fd9146200019f578063715018a614620001c657600080fd5b8063366b541214620000e8578063429b62e5146200011c5780634ef980971462000161575b600080fd5b620000ff620000f936600462000975565b620002e1565b6040516001600160a01b0390911681526020015b60405180910390f35b3480156200012957600080fd5b50620001506200013b36600462000a2e565b60066020526000908152604090205460ff1681565b604051901515815260200162000113565b620000ff6200017236600462000a4c565b620003fd565b3480156200018557600080fd5b506200019060045481565b60405190815260200162000113565b348015620001ac57600080fd5b50620001c4620001be36600462000ac0565b62000516565b005b348015620001d357600080fd5b50620001c462000609565b348015620001eb57600080fd5b50620000ff620001fd36600462000b00565b6005602052600090815260409020546001600160a01b031681565b3480156200022557600080fd5b506000546001600160a01b0316620000ff565b3480156200024557600080fd5b50620001c46200025736600462000b00565b62000621565b3480156200026a57600080fd5b50600254620000ff906001600160a01b031681565b3480156200028c57600080fd5b50620001c46200029e36600462000a2e565b6200069e565b348015620002b157600080fd5b506200019060035481565b348015620002c957600080fd5b50620001c4620002db36600462000a2e565b6200072b565b6000620002ed620007a7565b60048054906000620002ff8362000b1a565b9190505550600085858585336040516200031990620008ae565b6200032995949392919062000b8a565b604051809103906000f08015801562000346573d6000803e3d6000fd5b5060045460009081526005602052604080822080546001600160a01b0319166001600160a01b0385811691909117909155600254600354925194955016926108fc82150292818181858888f19350505050158015620003a9573d6000803e3d6000fd5b507fa41b88f605a4580e938c0296a9ba4f28c4dd00920009ff2e22659ed2c084d63981878787604051620003e1949392919062000beb565b60405180910390a19050620003f560018055565b949350505050565b600062000409620007a7565b600480549060006200041b8362000b1a565b91905055506000848484336040516200043490620008bc565b62000443949392919062000c35565b604051809103906000f08015801562000460573d6000803e3d6000fd5b5060045460009081526005602052604080822080546001600160a01b0319166001600160a01b0385811691909117909155600254600354925194955016926108fc82150292818181858888f19350505050158015620004c3573d6000803e3d6000fd5b507fa41b88f605a4580e938c0296a9ba4f28c4dd00920009ff2e22659ed2c084d63981868686604051620004fb949392919062000beb565b60405180910390a190506200050f60018055565b9392505050565b3360009081526006602052604090205460ff166200057b5760405162461bcd60e51b815260206004820152601e60248201527f41646d696e3a2063616c6c6572206973206e6f74207468652061646d696e000060448201526064015b60405180910390fd5b62000585620007a7565b6001600160a01b038216620005dd5760405162461bcd60e51b815260206004820152601660248201527f41646d696e2061646472657373206973205a65726f2000000000000000000000604482015260640162000572565b6001600160a01b0382166000908152600660205260409020805460ff1916821515179055600180555050565b6200061362000802565b6200061f60006200085e565b565b3360009081526006602052604090205460ff16620006825760405162461bcd60e51b815260206004820152601e60248201527f41646d696e3a2063616c6c6572206973206e6f74207468652061646d696e0000604482015260640162000572565b6200068c620007a7565b60038190556200069b60018055565b50565b3360009081526006602052604090205460ff16620006ff5760405162461bcd60e51b815260206004820152601e60248201527f41646d696e3a2063616c6c6572206973206e6f74207468652061646d696e0000604482015260640162000572565b62000709620007a7565b600280546001600160a01b0319166001600160a01b0383161790556001805550565b6200073562000802565b6001600160a01b0381166200079c5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840162000572565b6200069b816200085e565b600260015403620007fb5760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604482015260640162000572565b6002600155565b6000546001600160a01b031633146200061f5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640162000572565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6121ce8062000c8083390190565b610e058062002e4e83390190565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620008f257600080fd5b813567ffffffffffffffff80821115620009105762000910620008ca565b604051601f8301601f19908116603f011681019082821181831017156200093b576200093b620008ca565b816040528381528660208588010111156200095557600080fd5b836020870160208301376000602085830101528094505050505092915050565b600080600080608085870312156200098c57600080fd5b843567ffffffffffffffff80821115620009a557600080fd5b620009b388838901620008e0565b95506020870135915080821115620009ca57600080fd5b620009d888838901620008e0565b9450604087013593506060870135915080821115620009f657600080fd5b5062000a0587828801620008e0565b91505092959194509250565b80356001600160a01b038116811462000a2957600080fd5b919050565b60006020828403121562000a4157600080fd5b6200050f8262000a11565b60008060006060848603121562000a6257600080fd5b833567ffffffffffffffff8082111562000a7b57600080fd5b62000a8987838801620008e0565b9450602086013591508082111562000aa057600080fd5b5062000aaf86828701620008e0565b925050604084013590509250925092565b6000806040838503121562000ad457600080fd5b62000adf8362000a11565b91506020830135801515811462000af557600080fd5b809150509250929050565b60006020828403121562000b1357600080fd5b5035919050565b60006001820162000b3b57634e487b7160e01b600052601160045260246000fd5b5060010190565b6000815180845260005b8181101562000b6a5760208185018101518683018201520162000b4c565b506000602082860101526020601f19601f83011685010191505092915050565b60a08152600062000b9f60a083018862000b42565b828103602084015262000bb3818862000b42565b9050856040840152828103606084015262000bcf818662000b42565b9150506001600160a01b03831660808301529695505050505050565b6001600160a01b038516815260806020820152600062000c0f608083018662000b42565b828103604084015262000c23818662000b42565b91505082606083015295945050505050565b60808152600062000c4a608083018762000b42565b828103602084015262000c5e818762000b42565b9150508360408301526001600160a01b03831660608301529594505050505056fe60c06040523480156200001157600080fd5b50604051620021ce380380620021ce833981016040819052620000349162000204565b848460128584806001600160a01b03811662000063576040516349e27cff60e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b03831690811782556040519091907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3506001620000ba868262000352565b506002620000c9858262000352565b5060ff83166080819052620000e090600a62000533565b620000ec90836200054b565b60a052506200010c9350869250670de0b6b3a764000091506200054b9050565b6001600160a01b038216600090815260046020526040902055600c62000133838262000352565b50505050505062000565565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200016757600080fd5b81516001600160401b03808211156200018457620001846200013f565b604051601f8301601f19908116603f01168101908282118183101715620001af57620001af6200013f565b81604052838152602092508683858801011115620001cc57600080fd5b600091505b83821015620001f05785820183015181830184015290820190620001d1565b600093810190920192909252949350505050565b600080600080600060a086880312156200021d57600080fd5b85516001600160401b03808211156200023557600080fd5b6200024389838a0162000155565b965060208801519150808211156200025a57600080fd5b6200026889838a0162000155565b95506040880151945060608801519150808211156200028657600080fd5b50620002958882890162000155565b608088015190935090506001600160a01b0381168114620002b557600080fd5b809150509295509295909350565b600181811c90821680620002d857607f821691505b602082108103620002f957634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200034d57600081815260208120601f850160051c81016020861015620003285750805b601f850160051c820191505b81811015620003495782815560010162000334565b5050505b505050565b81516001600160401b038111156200036e576200036e6200013f565b62000386816200037f8454620002c3565b84620002ff565b602080601f831160018114620003be5760008415620003a55750858301515b600019600386901b1c1916600185901b17855562000349565b600085815260208120601f198616915b82811015620003ef57888601518255948401946001909101908401620003ce565b50858210156200040e5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052601160045260246000fd5b600181815b80851115620004755781600019048211156200045957620004596200041e565b808516156200046757918102915b93841c939080029062000439565b509250929050565b6000826200048e575060016200052d565b816200049d575060006200052d565b8160018114620004b65760028114620004c157620004e1565b60019150506200052d565b60ff841115620004d557620004d56200041e565b50506001821b6200052d565b5060208310610133831016604e8410600b841016171562000506575081810a6200052d565b62000512838362000434565b80600019048211156200052957620005296200041e565b0290505b92915050565b60006200054460ff8416836200047d565b9392505050565b80820281158282048414176200052d576200052d6200041e565b60805160a051611c3c6200059260003960006102240152600081816102760152610dca0152611c3c6000f3fe608060405234801561001057600080fd5b50600436106101985760003560e01c806370a08231116100e3578063b88d4fde1161008c578063dd62ed3e11610066578063dd62ed3e146103b1578063e985e9c5146103dc578063f2fde38b1461040a57600080fd5b8063b88d4fde14610378578063c7c3268b1461038b578063c87b56dd1461039e57600080fd5b80639b19251a116100bd5780639b19251a1461032f578063a22cb46514610352578063a9059cbb1461036557600080fd5b806370a08231146102f45780638da5cb5b1461031457806395d89b411461032757600080fd5b8063313ce5671161014557806353d6fd591161011f57806353d6fd59146102c65780635bcabf04146102d95780636352211e146102e157600080fd5b8063313ce5671461027157806342842e0e146102aa5780634f02c420146102bd57600080fd5b806318160ddd1161017657806318160ddd1461021f57806323b872dd146102545780632b9689581461026957600080fd5b806306fdde031461019d578063081812fc146101bb578063095ea7b3146101fc575b600080fd5b6101a561041d565b6040516101b29190611523565b60405180910390f35b6101e46101c9366004611556565b6006602052600090815260409020546001600160a01b031681565b6040516001600160a01b0390911681526020016101b2565b61020f61020a366004611586565b6104ab565b60405190151581526020016101b2565b6102467f000000000000000000000000000000000000000000000000000000000000000081565b6040519081526020016101b2565b6102676102623660046115b0565b6105fc565b005b610267610985565b6102987f000000000000000000000000000000000000000000000000000000000000000081565b60405160ff90911681526020016101b2565b6102676102b83660046115b0565b6109eb565b61024660035481565b6102676102d43660046115ec565b610ac0565b6101a5610b15565b6101e46102ef366004611556565b610b22565b610246610302366004611628565b60046020526000908152604090205481565b6000546101e4906001600160a01b031681565b6101a5610b5d565b61020f61033d366004611628565b600b6020526000908152604090205460ff1681565b6102676103603660046115ec565b610b6a565b61020f610373366004611586565b610bd6565b610267610386366004611643565b610bea565b6102676103993660046116f4565b610cad565b6101a56103ac366004611556565b610ce7565b6102466103bf3660046117a5565b600560209081526000928352604080842090915290825290205481565b61020f6103ea3660046117a5565b600760209081526000928352604080842090915290825290205460ff1681565b610267610418366004611628565b610d27565b6001805461042a906117d8565b80601f0160208091040260200160405190810160405280929190818152602001828054610456906117d8565b80156104a35780601f10610478576101008083540402835291602001916104a3565b820191906000526020600020905b81548152906001019060200180831161048657829003601f168201915b505050505081565b600060035482111580156104bf5750600082115b15610596576000828152600860205260409020546001600160a01b031633811480159061051057506001600160a01b038116600090815260076020908152604080832033845290915290205460ff16155b1561052d576040516282b42960e81b815260040160405180910390fd5b60008381526006602090815260409182902080546001600160a01b0319166001600160a01b038881169182179092559251868152908416917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3506105f2565b3360008181526005602090815260408083206001600160a01b03881680855290835292819020869055518581529192917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a35b5060015b92915050565b6003548111610916576000818152600860205260409020546001600160a01b0384811691161461063f57604051636edaef2f60e11b815260040160405180910390fd5b6001600160a01b03821661066657604051634e46966960e11b815260040160405180910390fd5b336001600160a01b038416148015906106a357506001600160a01b038316600090815260076020908152604080832033845290915290205460ff16155b80156106c657506000818152600660205260409020546001600160a01b03163314155b156106e3576040516282b42960e81b815260040160405180910390fd5b6106eb610dc3565b6001600160a01b03841660009081526004602052604081208054909190610713908490611828565b909155506107219050610dc3565b6001600160a01b03808416600081815260046020908152604080832080549096019095558582526008815284822080546001600160a01b03199081169094179055600681528482208054909316909255918616825260099052908120805461078b90600190611828565b8154811061079b5761079b61183b565b60009182526020808320909101546001600160a01b0387168352600982526040808420868552600a909352909220548154929350839281106107df576107df61183b565b60009182526020808320909101929092556001600160a01b038616815260099091526040902080548061081457610814611851565b600082815260208082208301600019908101839055909201909255838252600a8152604080832054848452818420556001600160a01b0386168084526009835290832080546001818101835582865293852001869055925290546108789190611828565b6000838152600a602052604080822092909255905183916001600160a01b0380871692908816917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4826001600160a01b0316846001600160a01b03167fe59fdd36d0d223c0c7d996db7ad796880f45e1936cb0bb7ac102e7082e0314876108ff610dc3565b60405190815260200160405180910390a350505050565b6001600160a01b038316600090815260056020908152604080832033845290915290205460001981146109725761094d8282611828565b6001600160a01b03851660009081526005602090815260408083203384529091529020555b61097d848484610df5565b50505b505050565b6000546001600160a01b031633146109af576040516282b42960e81b815260040160405180910390fd5b600080546001600160a01b031916815560405133907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3565b6109f68383836105fc565b6001600160a01b0382163b15801590610aa25750604051630a85bd0160e11b8082523360048301526001600160a01b03858116602484015260448301849052608060648401526000608484015290919084169063150b7a029060a4016020604051808303816000875af1158015610a71573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a959190611867565b6001600160e01b03191614155b1561098057604051633da6393160e01b815260040160405180910390fd5b6000546001600160a01b03163314610aea576040516282b42960e81b815260040160405180910390fd5b6001600160a01b03919091166000908152600b60205260409020805460ff1916911515919091179055565b600c805461042a906117d8565b6000818152600860205260409020546001600160a01b031680610b585760405163c5723b5160e01b815260040160405180910390fd5b919050565b6002805461042a906117d8565b3360008181526007602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b6000610be3338484610df5565b9392505050565b610bf58585856105fc565b6001600160a01b0384163b15801590610c8f5750604051630a85bd0160e11b808252906001600160a01b0386169063150b7a0290610c3f9033908a90899089908990600401611891565b6020604051808303816000875af1158015610c5e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c829190611867565b6001600160e01b03191614155b1561097d57604051633da6393160e01b815260040160405180910390fd5b6000546001600160a01b03163314610cd7576040516282b42960e81b815260040160405180910390fd5b600c610ce38282611933565b5050565b6060600c610cf6306014610fb7565b610cff84611157565b604051602001610d1193929190611a0f565b6040516020818303038152906040529050919050565b6000546001600160a01b03163314610d51576040516282b42960e81b815260040160405180910390fd5b6001600160a01b038116610d78576040516349e27cff60e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b0383169081178255604051909133917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a350565b6000610df07f0000000000000000000000000000000000000000000000000000000000000000600a611ba4565b905090565b600080610e00610dc3565b6001600160a01b038087166000818152600460205260408082208054948a1683529082205492825293945091929091869190610e3c8386611828565b90915550506001600160a01b03808716600090815260046020908152604080832080548a019055928a168252600b9052205460ff16610ed8576001600160a01b038716600090815260046020526040812054610e99908590611bb3565b610ea38585611bb3565b610ead9190611828565b905060005b81811015610ed557610ec3896111ea565b80610ecd81611bd5565b915050610eb2565b50505b6001600160a01b0386166000908152600b602052604090205460ff16610f5d576000610f048483611bb3565b6001600160a01b038816600090815260046020526040902054610f28908690611bb3565b610f329190611828565b905060005b81811015610f5a57610f4888611312565b80610f5281611bd5565b915050610f37565b50505b856001600160a01b0316876001600160a01b03167fe59fdd36d0d223c0c7d996db7ad796880f45e1936cb0bb7ac102e7082e03148787604051610fa291815260200190565b60405180910390a35060019695505050505050565b60606000610fc6836002611bee565b610fd1906002611c05565b67ffffffffffffffff811115610fe957610fe96116de565b6040519080825280601f01601f191660200182016040528015611013576020820181803683370190505b509050600360fc1b8160008151811061102e5761102e61183b565b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061105d5761105d61183b565b60200101906001600160f81b031916908160001a9053506000611081846002611bee565b61108c906001611c05565b90505b6001811115611104576f181899199a1a9b1b9c1cb0b131b232b360811b85600f16601081106110c0576110c061183b565b1a60f81b8282815181106110d6576110d661183b565b60200101906001600160f81b031916908160001a90535060049490941c936110fd81611c18565b905061108f565b508315610be35760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e74604482015260640160405180910390fd5b606060006111648361141d565b600101905060008167ffffffffffffffff811115611184576111846116de565b6040519080825280601f01601f1916602001820160405280156111ae576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a85049450846111b857509392505050565b6001600160a01b03811661121157604051636edaef2f60e11b815260040160405180910390fd5b6001600160a01b0381166000908152600960205260408120805461123790600190611828565b815481106112475761124761183b565b9060005260206000200154905060096000836001600160a01b03166001600160a01b0316815260200190815260200160002080548061128857611288611851565b600082815260208082208301600019908101839055909201909255828252600a815260408083208390556008825280832080546001600160a01b031990811690915560069092528083208054909216909155518291906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b6001600160a01b03811661133957604051634e46966960e11b815260040160405180910390fd5b60038054600101908190556000818152600860205260409020546001600160a01b03161561137a5760405163119b4fd360e11b815260040160405180910390fd5b600081815260086020908152604080832080546001600160a01b0319166001600160a01b0387169081179091558084526009835290832080546001818101835582865293852001859055925290546113d29190611828565b6000828152600a602052604080822092909255905182916001600160a01b038516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6000807a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008310611466577a184f03e93ff9f4daa797ed6e38ed64bf6a1f010000000000000000830492506040015b6d04ee2d6d415b85acef81000000008310611492576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc1000083106114b057662386f26fc10000830492506010015b6305f5e10083106114c8576305f5e100830492506008015b61271083106114dc57612710830492506004015b606483106114ee576064830492506002015b600a83106105f65760010192915050565b60005b8381101561151a578181015183820152602001611502565b50506000910152565b60208152600082518060208401526115428160408501602087016114ff565b601f01601f19169190910160400192915050565b60006020828403121561156857600080fd5b5035919050565b80356001600160a01b0381168114610b5857600080fd5b6000806040838503121561159957600080fd5b6115a28361156f565b946020939093013593505050565b6000806000606084860312156115c557600080fd5b6115ce8461156f565b92506115dc6020850161156f565b9150604084013590509250925092565b600080604083850312156115ff57600080fd5b6116088361156f565b91506020830135801515811461161d57600080fd5b809150509250929050565b60006020828403121561163a57600080fd5b610be38261156f565b60008060008060006080868803121561165b57600080fd5b6116648661156f565b94506116726020870161156f565b935060408601359250606086013567ffffffffffffffff8082111561169657600080fd5b818801915088601f8301126116aa57600080fd5b8135818111156116b957600080fd5b8960208285010111156116cb57600080fd5b9699959850939650602001949392505050565b634e487b7160e01b600052604160045260246000fd5b60006020828403121561170657600080fd5b813567ffffffffffffffff8082111561171e57600080fd5b818401915084601f83011261173257600080fd5b813581811115611744576117446116de565b604051601f8201601f19908116603f0116810190838211818310171561176c5761176c6116de565b8160405282815287602084870101111561178557600080fd5b826020860160208301376000928101602001929092525095945050505050565b600080604083850312156117b857600080fd5b6117c18361156f565b91506117cf6020840161156f565b90509250929050565b600181811c908216806117ec57607f821691505b60208210810361180c57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b818103818111156105f6576105f6611812565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fd5b60006020828403121561187957600080fd5b81516001600160e01b031981168114610be357600080fd5b60006001600160a01b03808816835280871660208401525084604083015260806060830152826080830152828460a0840137600060a0848401015260a0601f19601f85011683010190509695505050505050565b601f82111561098057600081815260208120601f850160051c8101602086101561190c5750805b601f850160051c820191505b8181101561192b57828155600101611918565b505050505050565b815167ffffffffffffffff81111561194d5761194d6116de565b6119618161195b84546117d8565b846118e5565b602080601f831160018114611996576000841561197e5750858301515b600019600386901b1c1916600185901b17855561192b565b600085815260208120601f198616915b828110156119c5578886015182559484019460019091019084016119a6565b50858210156119e35787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60008151611a058185602086016114ff565b9290920192915050565b6000808554611a1d816117d8565b60018281168015611a355760018114611a4a57611a79565b60ff1984168752821515830287019450611a79565b8960005260208060002060005b85811015611a705781548a820152908401908201611a57565b50505082870194505b50602f60f81b845287519250611a958382860160208b016114ff565b611ab3611aad8285870101602f60f81b815260010190565b886119f3565b9998505050505050505050565b600181815b80851115611afb578160001904821115611ae157611ae1611812565b80851615611aee57918102915b93841c9390800290611ac5565b509250929050565b600082611b12575060016105f6565b81611b1f575060006105f6565b8160018114611b355760028114611b3f57611b5b565b60019150506105f6565b60ff841115611b5057611b50611812565b50506001821b6105f6565b5060208310610133831016604e8410600b8410161715611b7e575081810a6105f6565b611b888383611ac0565b8060001904821115611b9c57611b9c611812565b029392505050565b6000610be360ff841683611b03565b600082611bd057634e487b7160e01b600052601260045260246000fd5b500490565b600060018201611be757611be7611812565b5060010190565b80820281158282048414176105f6576105f6611812565b808201808211156105f6576105f6611812565b600081611c2757611c27611812565b50600019019056fea164736f6c6343000813000a60806040523480156200001157600080fd5b5060405162000e0538038062000e05833981016040819052620000349162000229565b838360036200004483826200034c565b5060046200005382826200034c565b5050506200008a816200006b6200009460201b60201c565b6200007890600a6200052d565b62000084908562000545565b62000099565b5050505062000575565b601290565b6001600160a01b038216620000f45760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b80600260008282546200010891906200055f565b90915550506001600160a01b038216600081815260208181526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35050565b505050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200018c57600080fd5b81516001600160401b0380821115620001a957620001a962000164565b604051601f8301601f19908116603f01168101908282118183101715620001d457620001d462000164565b81604052838152602092508683858801011115620001f157600080fd5b600091505b83821015620002155785820183015181830184015290820190620001f6565b600093810190920192909252949350505050565b600080600080608085870312156200024057600080fd5b84516001600160401b03808211156200025857600080fd5b62000266888389016200017a565b955060208701519150808211156200027d57600080fd5b506200028c878288016200017a565b60408701516060880151919550935090506001600160a01b0381168114620002b357600080fd5b939692955090935050565b600181811c90821680620002d357607f821691505b602082108103620002f457634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200015f57600081815260208120601f850160051c81016020861015620003235750805b601f850160051c820191505b8181101562000344578281556001016200032f565b505050505050565b81516001600160401b0381111562000368576200036862000164565b6200038081620003798454620002be565b84620002fa565b602080601f831160018114620003b857600084156200039f5750858301515b600019600386901b1c1916600185901b17855562000344565b600085815260208120601f198616915b82811015620003e957888601518255948401946001909101908401620003c8565b5085821015620004085787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052601160045260246000fd5b600181815b808511156200046f57816000190482111562000453576200045362000418565b808516156200046157918102915b93841c939080029062000433565b509250929050565b600082620004885750600162000527565b81620004975750600062000527565b8160018114620004b05760028114620004bb57620004db565b600191505062000527565b60ff841115620004cf57620004cf62000418565b50506001821b62000527565b5060208310610133831016604e8410600b841016171562000500575081810a62000527565b6200050c83836200042e565b806000190482111562000523576200052362000418565b0290505b92915050565b60006200053e60ff84168362000477565b9392505050565b808202811582820484141762000527576200052762000418565b8082018082111562000527576200052762000418565b61088080620005856000396000f3fe608060405234801561001057600080fd5b50600436106100b95760003560e01c80633950935111610081578063a457c2d71161005b578063a457c2d714610177578063a9059cbb1461018a578063dd62ed3e1461019d57600080fd5b8063395093511461013357806370a082311461014657806395d89b411461016f57600080fd5b806306fdde03146100be578063095ea7b3146100dc57806318160ddd146100ff57806323b872dd14610111578063313ce56714610124575b600080fd5b6100c66101d6565b6040516100d391906106f3565b60405180910390f35b6100ef6100ea36600461075d565b610268565b60405190151581526020016100d3565b6002545b6040519081526020016100d3565b6100ef61011f366004610787565b610282565b604051601281526020016100d3565b6100ef61014136600461075d565b6102a6565b6101036101543660046107c3565b6001600160a01b031660009081526020819052604090205490565b6100c66102e5565b6100ef61018536600461075d565b6102f4565b6100ef61019836600461075d565b61038b565b6101036101ab3660046107e5565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6060600380546101e590610818565b80601f016020809104026020016040519081016040528092919081815260200182805461021190610818565b801561025e5780601f106102335761010080835404028352916020019161025e565b820191906000526020600020905b81548152906001019060200180831161024157829003601f168201915b5050505050905090565b600033610276818585610399565b60019150505b92915050565b6000336102908582856104bd565b61029b85858561054f565b506001949350505050565b3360008181526001602090815260408083206001600160a01b038716845290915281205490919061027690829086906102e0908790610852565b610399565b6060600480546101e590610818565b3360008181526001602090815260408083206001600160a01b03871684529091528120549091908381101561037e5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b61029b8286868403610399565b60003361027681858561054f565b6001600160a01b0383166103fb5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610375565b6001600160a01b03821661045c5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610375565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b038381166000908152600160209081526040808320938616835292905220546000198114610549578181101561053c5760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610375565b6105498484848403610399565b50505050565b6001600160a01b0383166105b35760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610375565b6001600160a01b0382166106155760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610375565b6001600160a01b0383166000908152602081905260409020548181101561068d5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610375565b6001600160a01b03848116600081815260208181526040808320878703905593871680835291849020805487019055925185815290927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a3610549565b600060208083528351808285015260005b8181101561072057858101830151858201604001528201610704565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b038116811461075857600080fd5b919050565b6000806040838503121561077057600080fd5b61077983610741565b946020939093013593505050565b60008060006060848603121561079c57600080fd5b6107a584610741565b92506107b360208501610741565b9150604084013590509250925092565b6000602082840312156107d557600080fd5b6107de82610741565b9392505050565b600080604083850312156107f857600080fd5b61080183610741565b915061080f60208401610741565b90509250929050565b600181811c9082168061082c57607f821691505b60208210810361084c57634e487b7160e01b600052602260045260246000fd5b50919050565b8082018082111561027c57634e487b7160e01b600052601160045260246000fdfea164736f6c6343000813000aa164736f6c6343000813000a";

export class TokenFactoryV2__factory extends ContractFactory {
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
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TokenFactoryV2> {
    return super.deploy(
      _royaltyAddress,
      _creationFee,
      overrides || {}
    ) as Promise<TokenFactoryV2>;
  }
  getDeployTransaction(
    _royaltyAddress: string,
    _creationFee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _royaltyAddress,
      _creationFee,
      overrides || {}
    );
  }
  attach(address: string): TokenFactoryV2 {
    return super.attach(address) as TokenFactoryV2;
  }
  connect(signer: Signer): TokenFactoryV2__factory {
    return super.connect(signer) as TokenFactoryV2__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TokenFactoryV2Interface {
    return new utils.Interface(_abi) as TokenFactoryV2Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TokenFactoryV2 {
    return new Contract(address, _abi, signerOrProvider) as TokenFactoryV2;
  }
}
