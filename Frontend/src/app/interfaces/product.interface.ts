interface IProduct{
  _id:string,
  title:string
  price:number
  details?:string,
  imageUrl?:[string],
  category?:string,
  ProdQuantity?:number
}

export default IProduct;
