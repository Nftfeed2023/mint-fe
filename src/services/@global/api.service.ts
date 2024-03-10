import { configEnv } from '~/@config'
import { EMediaType } from '~/@core/constants'
import { IObjectPromise } from '~/@core/dto'
import { AxiosHttpClient, IAxiosRequestOptions } from '~/@core/network'

class ApiService {
  private httpClient: AxiosHttpClient
  constructor(config: {
    baseurl: string
    options: IAxiosRequestOptions
    interceptors?: IObjectPromise
  }) {
    this.httpClient = new AxiosHttpClient(config)
  }
  async get<T = any>(endpoint: string, params: any = {}): Promise<T> {
    try {
      const res = await this.httpClient.get<T>(endpoint, params)
      return res.data
    } catch (error) {
      throw error
    }
  }
  async delete<T = any>(endpoint: string, params: any = {}): Promise<T> {
    try {
      const res = await this.httpClient.delete<T>(endpoint, params)
      return res.data
    } catch (error) {
      throw error
    }
  }
  async getByBody<T = any>(endpoint: string, body: any = {}): Promise<T> {
    try {
      const res = await this.httpClient.getByBody<T>(endpoint, body)
      return res.data
    } catch (error) {
      throw error
    }
  }
  async post<T = any>(endpoint: string, body: any = {}): Promise<T> {
    try {
      const res = await this.httpClient.post<T>(endpoint, body)
      return res.data
    } catch (error) {
      throw error
    }
  }

  async put<T = any>(endpoint: string, body: any = {}): Promise<T> {
    try {
      const res = await this.httpClient.put<T>(endpoint, body)
      return res.data
    } catch (error) {
      throw error
    }
  }

  async uploadFile<T = any>(
    endpoint: string,
    formData: FormData,
    onUploadProgress?: (event: any) => void,
  ): Promise<T> {
    try {
      const res = await this.httpClient.uploadFile<T>(
        endpoint,
        formData,
        onUploadProgress,
      )
      return res.data
    } catch (error) {
      throw error
    }
  }
}

const { CONNECTORS, } = configEnv();
const { ROOT, } = CONNECTORS;

export const rootApiService = new ApiService({
  baseurl: ROOT.baseUrl,
  options: {
    timeout: 2 * 60 * 1000,
    headers: {
      'Content-Type': EMediaType.APPLICATION_JSON,
    },
  },
  interceptors: {},
})

export const domainApiServiceNft = new ApiService({
  baseurl: "",
  options: {
    timeout: 2 * 60 * 1000,
    headers: {
      'Content-Type': EMediaType.APPLICATION_JSON,
    },
  },
  interceptors: {},
})

export const domainApiService = new ApiService({
  baseurl: "",
  options: {
    timeout: 2 * 60 * 1000,
    headers: {
      'Content-Type': EMediaType.APPLICATION_JSON,
    },
  },
  interceptors: {},
})

export const bitqueryApiService = new ApiService({
  baseurl: '',
  options: {
    timeout: 2 * 60 * 1000,
    headers: {
      'Content-Type': EMediaType.APPLICATION_JSON,
      'X-API-KEY': 'BQYbMmYdi1skCBBwjRJRFu1rOaTRYQrz',
    },
  },
  interceptors: {},
})

export const moralisApiService = new ApiService({
  baseurl: 'https://deep-index.moralis.io/api/v2/',
  options: {
    timeout: 2 * 60 * 1000,
    headers: {
      'Content-Type': EMediaType.APPLICATION_JSON,
      accept: 'application/json',
      'X-API-Key':
        'MV7JbXKJt7deSyr41Z9aIjgufsSJhNW2kySLGQOjl3hRpp5w8mZqxY3LBzGqkStW',
    },
  },
  interceptors: {},
})

export const optionalApiService = new ApiService({
  baseurl: '',
  options: {
    timeout: 2 * 60 * 1000,
    headers: {
      'Content-Type': EMediaType.APPLICATION_JSON,
      accept: 'application/json',
      'X-API-Key':
        'MV7JbXKJt7deSyr41Z9aIjgufsSJhNW2kySLGQOjl3hRpp5w8mZqxY3LBzGqkStW',
    },
  },
  interceptors: {},
})

export const uploadApiService = new ApiService({
  baseurl: "",
  options: {
    timeout: 30000,
    headers: {
      // 'Content-Type': 'application/json',
      // 'mvs-service-account-id': '636e008cf214372e7b22bfc0',
      // 'mvs-service-account-secret': 'ldTmMX7G6$$mebC@cSIB6e5Mo$Hjo6Bo',
      // 'api-key': 'mKLxLfCwr4lnoXV25r9d&T2!',
      "mvs-service-account-id": "636e008cf214372e7b22bfc0",
      "mvs-service-account-secret": "ldTmMX7G6$$mebC@cSIB6e5Mo$Hjo6Bo",
    }
  },
});

export const socsialApiService = new ApiService({
  baseurl: "https://i198e9817g.execute-api.ap-southeast-1.amazonaws.com/prod/mvs-dapp",
  options: {
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json'
    }
  }
});

export const mintFunApiService = new ApiService({
  baseurl: "https://mint.fun/api/mintfun",
  options: {
    timeout: 2 * 60 * 1000,
    headers: {
      "Content-Type": EMediaType.APPLICATION_JSON,
      "accept": EMediaType.APPLICATION_JSON,
    },
  },
  interceptors: {

  },
});
