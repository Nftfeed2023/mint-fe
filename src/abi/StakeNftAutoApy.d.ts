/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface StakeNftAutoApyInterface extends ethers.utils.Interface {
  functions: {
    "PRECISION_FACTOR()": FunctionFragment;
    "accTokenPerShare()": FunctionFragment;
    "emergencyRewardWithdraw(uint256)": FunctionFragment;
    "endTimeBonus()": FunctionFragment;
    "getTokenIdsStakedByUser(address)": FunctionFragment;
    "lastRewardSeconds()": FunctionFragment;
    "nft()": FunctionFragment;
    "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
    "owner()": FunctionFragment;
    "pendingReward(address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "rewardPerSeconds()": FunctionFragment;
    "stakes(uint256[])": FunctionFragment;
    "startTime()": FunctionFragment;
    "stopReward()": FunctionFragment;
    "tokenReward()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "unStakes(uint256[])": FunctionFragment;
    "updateRewardPerSeconds(uint256)": FunctionFragment;
    "updateTimeActive(uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "PRECISION_FACTOR",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "accTokenPerShare",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "emergencyRewardWithdraw",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "endTimeBonus",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTokenIdsStakedByUser",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "lastRewardSeconds",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "nft", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "onERC721Received",
    values: [string, string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pendingReward",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rewardPerSeconds",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "stakes",
    values: [BigNumberish[]]
  ): string;
  encodeFunctionData(functionFragment: "startTime", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "stopReward",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "tokenReward",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "unStakes",
    values: [BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "updateRewardPerSeconds",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateTimeActive",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "PRECISION_FACTOR",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "accTokenPerShare",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "emergencyRewardWithdraw",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "endTimeBonus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTokenIdsStakedByUser",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lastRewardSeconds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "nft", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "onERC721Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pendingReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rewardPerSeconds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "stakes", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "startTime", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "stopReward", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "tokenReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unStakes", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "updateRewardPerSeconds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateTimeActive",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export type OwnershipTransferredEvent = TypedEvent<
  [string, string] & { previousOwner: string; newOwner: string }
>;

export class StakeNftAutoApy extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: StakeNftAutoApyInterface;

  functions: {
    PRECISION_FACTOR(overrides?: CallOverrides): Promise<[BigNumber]>;

    accTokenPerShare(overrides?: CallOverrides): Promise<[BigNumber]>;

    emergencyRewardWithdraw(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    endTimeBonus(overrides?: CallOverrides): Promise<[BigNumber]>;

    getTokenIdsStakedByUser(
      _user: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]] & { tokenIds: BigNumber[] }>;

    lastRewardSeconds(overrides?: CallOverrides): Promise<[BigNumber]>;

    nft(overrides?: CallOverrides): Promise<[string]>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    pendingReward(
      _user: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    rewardPerSeconds(overrides?: CallOverrides): Promise<[BigNumber]>;

    stakes(
      _tokenIds: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    startTime(overrides?: CallOverrides): Promise<[BigNumber]>;

    stopReward(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    tokenReward(overrides?: CallOverrides): Promise<[string]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    unStakes(
      _tokenIds: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateRewardPerSeconds(
      _rewardPerSeconds: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateTimeActive(
      _startTime: BigNumberish,
      _endTimeBonus: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  PRECISION_FACTOR(overrides?: CallOverrides): Promise<BigNumber>;

  accTokenPerShare(overrides?: CallOverrides): Promise<BigNumber>;

  emergencyRewardWithdraw(
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  endTimeBonus(overrides?: CallOverrides): Promise<BigNumber>;

  getTokenIdsStakedByUser(
    _user: string,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  lastRewardSeconds(overrides?: CallOverrides): Promise<BigNumber>;

  nft(overrides?: CallOverrides): Promise<string>;

  onERC721Received(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    arg3: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  pendingReward(_user: string, overrides?: CallOverrides): Promise<BigNumber>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  rewardPerSeconds(overrides?: CallOverrides): Promise<BigNumber>;

  stakes(
    _tokenIds: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  startTime(overrides?: CallOverrides): Promise<BigNumber>;

  stopReward(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  tokenReward(overrides?: CallOverrides): Promise<string>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  unStakes(
    _tokenIds: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateRewardPerSeconds(
    _rewardPerSeconds: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateTimeActive(
    _startTime: BigNumberish,
    _endTimeBonus: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    PRECISION_FACTOR(overrides?: CallOverrides): Promise<BigNumber>;

    accTokenPerShare(overrides?: CallOverrides): Promise<BigNumber>;

    emergencyRewardWithdraw(
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    endTimeBonus(overrides?: CallOverrides): Promise<BigNumber>;

    getTokenIdsStakedByUser(
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    lastRewardSeconds(overrides?: CallOverrides): Promise<BigNumber>;

    nft(overrides?: CallOverrides): Promise<string>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    pendingReward(_user: string, overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    rewardPerSeconds(overrides?: CallOverrides): Promise<BigNumber>;

    stakes(_tokenIds: BigNumberish[], overrides?: CallOverrides): Promise<void>;

    startTime(overrides?: CallOverrides): Promise<BigNumber>;

    stopReward(overrides?: CallOverrides): Promise<void>;

    tokenReward(overrides?: CallOverrides): Promise<string>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    unStakes(
      _tokenIds: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    updateRewardPerSeconds(
      _rewardPerSeconds: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    updateTimeActive(
      _startTime: BigNumberish,
      _endTimeBonus: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;
  };

  estimateGas: {
    PRECISION_FACTOR(overrides?: CallOverrides): Promise<BigNumber>;

    accTokenPerShare(overrides?: CallOverrides): Promise<BigNumber>;

    emergencyRewardWithdraw(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    endTimeBonus(overrides?: CallOverrides): Promise<BigNumber>;

    getTokenIdsStakedByUser(
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lastRewardSeconds(overrides?: CallOverrides): Promise<BigNumber>;

    nft(overrides?: CallOverrides): Promise<BigNumber>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    pendingReward(_user: string, overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    rewardPerSeconds(overrides?: CallOverrides): Promise<BigNumber>;

    stakes(
      _tokenIds: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    startTime(overrides?: CallOverrides): Promise<BigNumber>;

    stopReward(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    tokenReward(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    unStakes(
      _tokenIds: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateRewardPerSeconds(
      _rewardPerSeconds: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateTimeActive(
      _startTime: BigNumberish,
      _endTimeBonus: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    PRECISION_FACTOR(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    accTokenPerShare(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    emergencyRewardWithdraw(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    endTimeBonus(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTokenIdsStakedByUser(
      _user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lastRewardSeconds(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nft(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pendingReward(
      _user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    rewardPerSeconds(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    stakes(
      _tokenIds: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    startTime(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    stopReward(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    tokenReward(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    unStakes(
      _tokenIds: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateRewardPerSeconds(
      _rewardPerSeconds: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateTimeActive(
      _startTime: BigNumberish,
      _endTimeBonus: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}