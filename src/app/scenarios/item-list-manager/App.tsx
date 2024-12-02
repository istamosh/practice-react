import { Button } from "flowbite-react";
import { useState } from "react";

function App() {
  const [items, setItems] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleAddItem = () => {
    // TODO: Add logic to add input to items list
    if (input) {
      setItems((prev) => [...prev, input]);
      setInput("");
    }
  };

  return (
    <>
      <div className="App flex flex-col">
        <h3>Item List</h3>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter item"
          data-testid="input-field"
        />
        <Button onClick={handleAddItem} data-testid="add-button">
          Add Item
        </Button>
        <ul data-testid="item-list">
          {items.map((item, index) => (
            <li key={index} data-testid="list-item">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
