import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';


const App = () => {
  const BASE_URL = 'http://localhost:8080/api/products';

  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(null);
  
  const [updateName, setUpdateName] = useState('');
  const [updatePrice, setUpdatePrice] = useState(null);
  const [updateDescription, setUpdateDescription] = useState('');
  const [updateId, setUpdateId] = useState(null);
  const [updateQuantity, setUpdateQuantity] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setProducts(response.data);
    }catch (error) {
      console.error("error ",error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }

  const addProduct = async () => {
    try {
      await axios.post(BASE_URL, {
        name,
        price,
        description,
        quantity
      });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }

  const updateProduct = async () => {
    try {
      await axios.put(`${BASE_URL}/${updateId}`, {
        name: updateName,
        price: updatePrice,
        description: updateDescription,
        quantity: updateQuantity
      });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };





  return (
    <div className="App">
      <h1>Product Inventory</h1>
      <div className="form">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="text" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <button onClick={addProduct}>Add Product</button>
      </div>
      <div className="products">
        {products && products.map((product) => (
          <div key={product.id} className="product">
            <ul>
              <li>{product.id}</li>
              <li>{product.name}</li>
              <li>{product.price}</li>
              <li>{product.description}</li>
              <li>{product.quantity}</li>
            </ul>
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
            <div className="update-form">
              <input type="text" placeholder="Update Name" value={updateName} onChange={(e) => setUpdateName(e.target.value)} />
              <input type="text" placeholder="Update Price" value={updatePrice} onChange={(e) => setUpdatePrice(e.target.value)} />
              <input type="text" placeholder="Update Description" value={updateDescription} onChange={(e) => setUpdateDescription(e.target.value)} />
              <input type="text" placeholder="Update Quantity" value={updateQuantity} onChange={(e) => setUpdateQuantity(e.target.value)} />
              <button onClick={() => {
                setUpdateId(product.id);
                updateProduct();
              }}>Update</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
