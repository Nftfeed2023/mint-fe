import { rootApiService } from './@global'

const Endpoint = {
  COLLECTION_LIST_TRENDING: 'api/public/nft-collection/list-trending',
  COLLECTION_LIST_NEWEST: 'api/public/nft-collection/list-newest',
  COLLECTION_LIST_ITEM_NEWEST: 'api/public/nft-collection/list-item-newest',
  COLLECTION_LIST: 'api/public/nft-collection/list',
  COLLECTION_INFO: 'api/public/nft-collection/info',
  COLLECTION_TOTAL_REPORT: 'api/public/nft-collection/total-report',
  COLLECTION_LIST_ITEM: 'api/public/nft-collection/list-ask-by-collection',
  COLLECTION_LIST_ACTIVITIES: 'api/public/nft-collection/list-tx-by-collection',
  COLLECTION_ITEM_LIST_ACTIVITIES: 'api/public/nft-collection/list-tx-by-item',
  COLLECTION_DETAIL_ITEM_IN_COLLECTION:
    'api/public/nft-collection/ask-item-info',
  COLLECTION_LIST_SEARCH: 'api/public/nft-collection/list-search',
  MARKET_USER_MY_ITEMS: 'api/public/market-user/my-items',
  MARKET_USER_ON_SALES: 'api/public/market-user/on-sales',
  MARKET_USER_ACTIVITIES: 'api/public/market-user/activities',
  COLLECTION_LIST_ATTRIBUTE_BY_COLLECTION:
    'api/public/nft-collection/list-attribute-by-collection',
}

export class NFTMarketPlaceServices {
  async listSearch() {
    return await rootApiService.post(Endpoint.COLLECTION_LIST_SEARCH)
  }

  async listTrending() {
    return await rootApiService.post(Endpoint.COLLECTION_LIST_TRENDING)
  }

  async listNewest() {
    return await rootApiService.post(Endpoint.COLLECTION_LIST_NEWEST)
  }

  async listItemNewest() {
    return await rootApiService.post(Endpoint.COLLECTION_LIST_ITEM_NEWEST)
  }

  async list(variables) {
    return await rootApiService.post(Endpoint.COLLECTION_LIST, variables)
  }

  async collectionInfo(variables) {
    return await rootApiService.post(Endpoint.COLLECTION_INFO, variables)
  }

  async collectionTotalReport(variables) {
    return await rootApiService.post(
      Endpoint.COLLECTION_TOTAL_REPORT,
      variables,
    )
  }

  async collectionListItem(variables) {
    return await rootApiService.post(Endpoint.COLLECTION_LIST_ITEM, variables)
  }

  async collectionListActivities(variables) {
    return await rootApiService.post(
      Endpoint.COLLECTION_LIST_ACTIVITIES,
      variables,
    )
  }

  async getDetailItemInCollections(variables) {
    return await rootApiService.post(
      Endpoint.COLLECTION_DETAIL_ITEM_IN_COLLECTION,
      variables,
    )
  }

  async collectionItemListActivities(variables) {
    return await rootApiService.post(
      Endpoint.COLLECTION_ITEM_LIST_ACTIVITIES,
      variables,
    )
  }

  async marketUserMyItems(variables) {
    return await rootApiService.post(Endpoint.MARKET_USER_MY_ITEMS, variables)
  }

  async marketUserActivities(variables) {
    return await rootApiService.post(Endpoint.MARKET_USER_ACTIVITIES, variables)
  }

  async marketUserOnSales(variables) {
    return await rootApiService.post(Endpoint.MARKET_USER_ON_SALES, variables)
  }

  async collectionListAttributeByCollection(variables) {
    return await rootApiService.post(
      Endpoint.COLLECTION_LIST_ATTRIBUTE_BY_COLLECTION,
      variables,
    )
  }
}

export default new NFTMarketPlaceServices()
