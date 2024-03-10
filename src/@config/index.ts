import { EVM_CHAIN_LIST } from './chain-list';
import { IEnvConfig, IEnvConfigResult, IEvmChainConfig } from './dto';
import * as envs from './envs';


let envConfig: IEnvConfigResult = undefined;
export function configEnv(): IEnvConfigResult {
  if (envConfig) {
    return envConfig;
  }
  const envName = process.env.REACT_APP_ENV || 'dev';
  //console.log(`Env: ${envName}`);
  const currentConfig = (envs)[envName] as IEnvConfig;
  // console.log({ currentConfig });
  return {
    ...currentConfig,
    EVM_CHAINS: currentConfig.applyChainIds.map(chainId => EVM_CHAIN_LIST[chainId] as IEvmChainConfig),
    name: envName
  }
};



