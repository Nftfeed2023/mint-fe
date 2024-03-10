/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  StakeNftFactory,
  StakeNftFactoryInterface,
} from "../StakeNftFactory";

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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "containerPools",
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
        name: "_nftAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_nftPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_daysLocked",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_rewardPerSecond",
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
    name: "deploy",
    outputs: [],
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
  "0x6080604052600060025534801561001557600080fd5b5061001f33610028565b60018055610078565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6117d9806100876000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c80638da5cb5b116100505780638da5cb5b146100da578063ecfb49a3146100eb578063f2fde38b1461010257600080fd5b8063520c896714610077578063715018a6146100bd5780637f6ba621146100c7575b600080fd5b6100a0610085366004610326565b6003602052600090815260409020546001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b6100c5610115565b005b6100c56100d536600461035b565b610129565b6000546001600160a01b03166100a0565b6100f460025481565b6040519081526020016100b4565b6100c56101103660046103a5565b6101e4565b61011d610262565b61012760006102bc565b565b600086868686868660405161013d90610319565b6001600160a01b039096168652602086019490945260408501929092526060840152608083015260a082015260c001604051809103906000f080158015610188573d6000803e3d6000fd5b5060028054919250600061019b836103c7565b90915550506002546000908152600360205260409020805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055505050505050565b6101ec610262565b6001600160a01b0381166102565760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084015b60405180910390fd5b61025f816102bc565b50565b6000546001600160a01b031633146101275760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161024d565b600080546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6113de806103ef83390190565b60006020828403121561033857600080fd5b5035919050565b80356001600160a01b038116811461035657600080fd5b919050565b60008060008060008060c0878903121561037457600080fd5b61037d8761033f565b9860208801359850604088013597606081013597506080810135965060a00135945092505050565b6000602082840312156103b757600080fd5b6103c08261033f565b9392505050565b6000600182016103e757634e487b7160e01b600052601160045260246000fd5b506001019056fe60806040523480156200001157600080fd5b50604051620013de380380620013de833981016040819052620000349162000356565b6200003f3362000063565b600180554660035562000057868686868686620000b3565b505050505050620003b7565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b620000bd6200029d565b620000c7620002f8565b856001600160a01b038116620001245760405162461bcd60e51b815260206004820152601b60248201527f4e46542061646472657373206973207a6572652061646472657373000000000060448201526064015b60405180910390fd5b828280821115620001735760405162461bcd60e51b81526020600482015260236024820152600080516020620013be833981519152604482015262696d6560e81b60648201526084016200011b565b42811015620001c05760405162461bcd60e51b81526020600482015260236024820152600080516020620013be833981519152604482015262696d6560e81b60648201526084016200011b565b60008811620002025760405162461bcd60e51b815260206004820152600d60248201526c141c9a58d9481a5b9d985b1a59609a1b60448201526064016200011b565b60008711620002545760405162461bcd60e51b815260206004820152601360248201527f44617973206c6f636b657220696e76616c69640000000000000000000000000060448201526064016200011b565b5050600280546001600160a01b0319166001600160a01b03891617905550600485905560058490556006839055600782905560088190556200029560018055565b505050505050565b600260015403620002f15760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064016200011b565b6002600155565b6000546001600160a01b03163314620003545760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016200011b565b565b60008060008060008060c087890312156200037057600080fd5b86516001600160a01b03811681146200038857600080fd5b6020880151604089015160608a015160808b015160a0909b0151939c929b509099909850965090945092505050565b610ff780620003c76000396000f3fe608060405234801561001057600080fd5b50600436106101165760003560e01c80637ff5cad3116100a25780639a8a0592116100715780639a8a059214610219578063a25083f614610222578063b304cae314610235578063f2fde38b14610248578063f36fb4e21461025b57600080fd5b80637ff5cad3146101e35780638da5cb5b146101f65780638defff5d146102075780638f10369a1461021057600080fd5b80633197cbb6116100e95780633197cbb6146101945780635bf8633a1461019d578063715018a6146101c857806373cf575a146101d257806378e97925146101da57600080fd5b80630d39fc811461011b578063150b7a02146101375780631f17906c1461016e578063210fe3a214610181575b600080fd5b61012460045481565b6040519081526020015b60405180910390f35b610155610145366004610d22565b630a85bd0160e11b949350505050565b6040516001600160e01b0319909116815260200161012e565b61012461017c366004610de2565b61026e565b61012461018f366004610dfb565b610280565b61012460085481565b6002546101b0906001600160a01b031681565b6040516001600160a01b03909116815260200161012e565b6101d0610293565b005b6101d06102a7565b61012460075481565b6101d06101f1366004610e25565b610438565b6000546001600160a01b03166101b0565b61012460055481565b61012460065481565b61012460035481565b6101d0610230366004610e6f565b61044e565b610124610243366004610f15565b61063d565b6101d0610256366004610f37565b610649565b610124610269366004610f37565b6106bf565b600061027a82426106cb565b92915050565b600061028c8383610750565b9392505050565b61029b6107d6565b6102a56000610830565b565b6102af61088d565b60085442116103055760405162461bcd60e51b815260206004820152601860248201527f506c65617365207761696c7420706f6f6c2066696e697368000000000000000060448201526064015b60405180910390fd5b33600090815260096020526040812061031d906108e6565b90506000811161036f5760405162461bcd60e51b815260206004820152601560248201527f5573657220656d707479206e6674207374616b6564000000000000000000000060448201526064016102fc565b60005b8181101561042d5733600090815260096020526040812061039390836108f0565b600254604051632142170760e11b8152306004820152336024820152604481018390529192506001600160a01b0316906342842e0e90606401600060405180830381600087803b1580156103e657600080fd5b505af11580156103fa573d6000803e3d6000fd5b505033600090815260096020526040902061041892509050826108fc565b5050808061042590610f68565b915050610372565b50506102a560018055565b610446868686868686610908565b505050505050565b61045661088d565b6007544210156104a85760405162461bcd60e51b815260206004820152600f60248201527f4e6f74206163746976652074696d65000000000000000000000000000000000060448201526064016102fc565b6008544211156104ea5760405162461bcd60e51b815260206004820152600d60248201526c506f6f6c20697320636c6f736560981b60448201526064016102fc565b600081511161053b5760405162461bcd60e51b815260206004820152601460248201527f456d70747920696e70757420746f6b656e49647300000000000000000000000060448201526064016102fc565b60005b81518110156106305760025482516001600160a01b03909116906342842e0e903390309086908690811061057457610574610f81565b60209081029190910101516040516001600160e01b031960e086901b1681526001600160a01b0393841660048201529290911660248301526044820152606401600060405180830381600087803b1580156105ce57600080fd5b505af11580156105e2573d6000803e3d6000fd5b5050505061061d8282815181106105fb576105fb610f81565b6020908102919091018101513360009081526009909252604090912090610b06565b508061062881610f68565b91505061053e565b5061063a60018055565b50565b600061028c83836106cb565b6106516107d6565b6001600160a01b0381166106b65760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016102fc565b61063a81610830565b600061027a8242610750565b6000828152600a602052604081205460055482906106ec9062015180610f97565b6106f69083610fae565b90508160000361070b5760009250505061027a565b81841161071d5760009250505061027a565b600061072c8286600854610b12565b60065490915061073c8483610fc1565b6107469190610f97565b9695505050505050565b6001600160a01b038216600090815260096020526040812081908190610775906108e6565b905060005b818110156107cc576001600160a01b03861660009081526009602052604090206107ae906107a890836108f0565b866106cb565b6107b89084610fae565b9250806107c481610f68565b91505061077a565b5090949350505050565b6000546001600160a01b031633146102a55760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016102fc565b600080546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6002600154036108df5760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064016102fc565b6002600155565b600061027a825490565b600061028c8383610b53565b600061028c8383610b7d565b61091061088d565b6109186107d6565b856001600160a01b03811661096f5760405162461bcd60e51b815260206004820152601b60248201527f4e46542061646472657373206973207a6572652061646472657373000000000060448201526064016102fc565b8282808211156109cd5760405162461bcd60e51b815260206004820152602360248201527f53746172742074696d652069732067726561746572207468616e20656e642074604482015262696d6560e81b60648201526084016102fc565b42811015610a295760405162461bcd60e51b815260206004820152602360248201527f53746172742074696d652069732067726561746572207468616e20656e642074604482015262696d6560e81b60648201526084016102fc565b60008811610a695760405162461bcd60e51b815260206004820152600d60248201526c141c9a58d9481a5b9d985b1a59609a1b60448201526064016102fc565b60008711610ab95760405162461bcd60e51b815260206004820152601360248201527f44617973206c6f636b657220696e76616c69640000000000000000000000000060448201526064016102fc565b50506002805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b038916179055506004859055600584905560068390556007829055600881905560018055610446565b600061028c8383610c70565b6000828411158015610b245750818411155b15610b3057508261028c565b838311158015610b405750818311155b15610b4c57508161028c565b5092915050565b6000826000018281548110610b6a57610b6a610f81565b9060005260206000200154905092915050565b60008181526001830160205260408120548015610c66576000610ba1600183610fc1565b8554909150600090610bb590600190610fc1565b9050818114610c1a576000866000018281548110610bd557610bd5610f81565b9060005260206000200154905080876000018481548110610bf857610bf8610f81565b6000918252602080832090910192909255918252600188019052604090208390555b8554869080610c2b57610c2b610fd4565b60019003818190600052602060002001600090559055856001016000868152602001908152602001600020600090556001935050505061027a565b600091505061027a565b6000818152600183016020526040812054610cb75750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915561027a565b50600061027a565b80356001600160a01b0381168114610cd657600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715610d1a57610d1a610cdb565b604052919050565b60008060008060808587031215610d3857600080fd5b610d4185610cbf565b93506020610d50818701610cbf565b935060408601359250606086013567ffffffffffffffff80821115610d7457600080fd5b818801915088601f830112610d8857600080fd5b813581811115610d9a57610d9a610cdb565b610dac601f8201601f19168501610cf1565b91508082528984828501011115610dc257600080fd5b808484018584013760008482840101525080935050505092959194509250565b600060208284031215610df457600080fd5b5035919050565b60008060408385031215610e0e57600080fd5b610e1783610cbf565b946020939093013593505050565b60008060008060008060c08789031215610e3e57600080fd5b610e4787610cbf565b9860208801359850604088013597606081013597506080810135965060a00135945092505050565b60006020808385031215610e8257600080fd5b823567ffffffffffffffff80821115610e9a57600080fd5b818501915085601f830112610eae57600080fd5b813581811115610ec057610ec0610cdb565b8060051b9150610ed1848301610cf1565b8181529183018401918481019088841115610eeb57600080fd5b938501935b83851015610f0957843582529385019390850190610ef0565b98975050505050505050565b60008060408385031215610f2857600080fd5b50508035926020909101359150565b600060208284031215610f4957600080fd5b61028c82610cbf565b634e487b7160e01b600052601160045260246000fd5b600060018201610f7a57610f7a610f52565b5060010190565b634e487b7160e01b600052603260045260246000fd5b808202811582820484141761027a5761027a610f52565b8082018082111561027a5761027a610f52565b8181038181111561027a5761027a610f52565b634e487b7160e01b600052603160045260246000fdfea164736f6c6343000813000a53746172742074696d652069732067726561746572207468616e20656e642074a164736f6c6343000813000a";

export class StakeNftFactory__factory extends ContractFactory {
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
  ): Promise<StakeNftFactory> {
    return super.deploy(overrides || {}) as Promise<StakeNftFactory>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): StakeNftFactory {
    return super.attach(address) as StakeNftFactory;
  }
  connect(signer: Signer): StakeNftFactory__factory {
    return super.connect(signer) as StakeNftFactory__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StakeNftFactoryInterface {
    return new utils.Interface(_abi) as StakeNftFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StakeNftFactory {
    return new Contract(address, _abi, signerOrProvider) as StakeNftFactory;
  }
}
