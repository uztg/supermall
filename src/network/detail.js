import {request} from './request';

export function getDetail(id){
  
    return request(
      {
        url:"/detail?iid="+id
      }
    )

}


export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

export class Shop{
  constructor(shopInfo,score){
    this.fans = shopInfo.cFans
    this.name = shopInfo.name
    this.cSells = shopInfo.cSells
    this.score = shopInfo.score
    this.logo = shopInfo.shopLogo
    this.goodsCount = shopInfo.cGoods
  }
}
