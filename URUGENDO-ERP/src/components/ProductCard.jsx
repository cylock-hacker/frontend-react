import Products from "../data/Products"

export const MappedProducts = Products.map((product)=>{
        return (
            <div>
                  <div>{product.name}</div>
                  <p>{product.category}</p>
                   <p>{product.price}</p>
              <p>location : {product.shippingLocation}</p>
            </div>
             
        )
})