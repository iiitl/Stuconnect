import { useState, useEffect } from "react";

const Test = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Component Mounted or Count Changed:", count);
  }, [count]);

  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold">Count: {count}</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md"
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>
    </div>
  );
};

export default Test;
