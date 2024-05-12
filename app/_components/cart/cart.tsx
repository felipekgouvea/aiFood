import { CartContext } from '@/app/_context/cart'
import { useContext } from 'react'
import CartItem from './cart-item'

const Cart = () => {
  const { products } = useContext(CartContext)

  return (
    <div className="flex flex-col gap-10">
      {products.map((product) => (
        <CartItem cartProduct={product} key={product.id} />
      ))}
    </div>
  )
}

export default Cart
