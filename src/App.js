import React, { useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [editingQuantity, setEditingQuantity] = useState('');

  // Create: Add a new item
  const handleAddItem = () => {
    if (name && quantity) {
      const newItem = {
        id: Date.now(),
        name,
        quantity: parseInt(quantity),
      };
      setItems([...items, newItem]);
      setName('');
      setQuantity('');
    } else {
      alert("Please enter both item name and quantity.");
    }
  };

  // Read: List all items (displayed via the state)

  // Update: Edit an existing item
  const handleEditItem = (id) => {
    const itemToEdit = items.find((item) => item.id === id);
    if (itemToEdit) {
      setEditingId(id);
      setEditingName(itemToEdit.name);
      setEditingQuantity(itemToEdit.quantity);
    }
  };

  const handleUpdateItem = () => {
    if (editingName && editingQuantity) {
      const updatedItems = items.map((item) =>
        item.id === editingId
          ? { ...item, name: editingName, quantity: parseInt(editingQuantity) }
          : item
      );
      setItems(updatedItems);
      setEditingId(null);
      setEditingName('');
      setEditingQuantity('');
    } else {
      alert("Please enter both item name and quantity.");
    }
  };

  // Delete: Remove an item
  const handleDeleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  return (
    <div className="App">
      <h1>React CRUD Application</h1>

      {/* Form to add a new item */}
      <div>
        <h2>Add Item</h2>
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>

      {/* Form to edit an existing item */}
      {editingId && (
        <div>
          <h2>Edit Item</h2>
          <input
            type="text"
            placeholder="Edit Item Name"
            value={editingName}
            onChange={(e) => setEditingName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Edit Quantity"
            value={editingQuantity}
            onChange={(e) => setEditingQuantity(e.target.value)}
          />
          <button onClick={handleUpdateItem}>Update Item</button>
          <button onClick={() => setEditingId(null)}>Cancel</button>
        </div>
      )}

      {/* List of items */}
      <h2>Items List</h2>
      <ul>
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item.id}>
              <strong>{item.name}</strong> - Quantity: {item.quantity}{' '}
              <button onClick={() => handleEditItem(item.id)}>Edit</button>
              <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No items added !</p>
        )}
      </ul>
    </div>
  );
}

export default App;
