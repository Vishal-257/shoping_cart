import { useState, useMemo } from 'react';
import initialProducts from './Data';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [cartItems, setCartItems] = useState<Record<number, number>>({});

  const categories = useMemo(() => {
    const uniqueCategories = new Set(initialProducts.map((p: Product) => p.category));
    return ['All', ...Array.from(uniqueCategories)];
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return initialProducts;
    return initialProducts.filter((product: Product) => product.category === selectedCategory);
  }, [selectedCategory]);

  const cartProductDetails = useMemo(() => {
    return Object.keys(cartItems)
      .map((id: string) => {
        const product = initialProducts.find((p: Product) => p.id === parseInt(id));
        if (!product) return null;

        return {
          ...product,
          quantity: cartItems[parseInt(id)],
        } as CartItem;
      })
      .filter((item: CartItem | null): item is CartItem => item !== null && item.quantity > 0);
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartProductDetails.reduce(
      (total: number, item: CartItem) => total + item.price * item.quantity,
      0
    );
  }, [cartProductDetails]);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const id = product.id;
      return {
        ...prev,
        [id]: (prev[id] || 0) + 1,
      };
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => {
      const newItems = { ...prev };

      if (newItems[productId] && newItems[productId] > 0) {
        newItems[productId] -= 1;

        if (newItems[productId] === 0) {
          delete newItems[productId];
        }
      }
      return newItems;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-indigo-700">Dynamic Store Demo</h1>
        <p className="text-gray-500">Filter Products and Manage Your Cart</p>
      </header>

      <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Filter by Category:</h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-4 py-2 text-sm font-medium rounded-full transition duration-150 
                ${selectedCategory === category
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600'}
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">

        <div className="lg:w-3/4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Product Catalog</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product: Product) => (
              <div
                key={product.id}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
              >
                <h4 className="text-xl font-semibold text-indigo-800 mb-2">{product.name}</h4>
                <p className="text-sm text-gray-500">Category: {product.category}</p>
                <p className="text-2xl font-extrabold text-green-600 my-3">
                  ${product.price.toFixed(2)}
                </p>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-150"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-1/4">
          <div className="sticky top-8 p-6 bg-white rounded-xl shadow-2xl border border-indigo-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🛒 Shopping Cart</h2>

            {cartProductDetails.length === 0 ? (
              <p className="text-gray-500 italic">Your cart is empty. Start adding items!</p>
            ) : (
              <>
                <ul className="divide-y divide-gray-200 mb-4">
                  {cartProductDetails.map((item) => (
                    <li key={item.id} className="py-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">
                          {item.name}{' '}
                          <span className="text-sm text-gray-500">x{item.quantity}</span>
                        </p>

                        <p className="text-sm text-indigo-600">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 pt-4 border-t-2 border-indigo-200">
                  <h3 className="flex justify-between items-center text-xl font-bold text-gray-900">
                    <span>Total:</span>
                    <span className="text-indigo-700">${cartTotal.toFixed(2)}</span>
                  </h3>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;