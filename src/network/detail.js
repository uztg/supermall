import {request} from './request';

export function getDetail(id){
  
    return request(
      {
        url:"/detail?iid="+id
      }
    )

}
export function getRecommend1(){
  return request({
      url:"/recommend"
  })

}

export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    // this.desc = itemInfo.desc
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
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.logo = shopInfo.shopLogo
    this.goodsCount = shopInfo.cGoods
  }
}
export class GoodsParam {
  constructor(info,rule){
    //注：images 可能没有值(某些商品有值，某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
