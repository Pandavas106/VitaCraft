export const FormSection = ({ title, children, isOpen, toggle }) => {
  return (
    <div className="mb-4 border border-gray-200 rounded-lg shadow-sm">
      <div
        className="flex justify-between items-center p-3 bg-gray-100 cursor-pointer"
        onClick={toggle}
      >
        <h3 className="text-lg font-medium">{title}</h3>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && <div className="p-4 bg-white">{children}</div>}
    </div>
  );
};
export const InputField = ({ label, name, value, onChange, type = "text" }) => {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export const TextareaField = ({ label, name, value, onChange }) => {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

// Array Fields component for handling arrays with add/remove functionality
export const ArrayField = ({ items, setItems, renderItem, addNewItem }) => {
  return (
    <div className="mb-3">
      {items.map((item, index) => (
        <div key={index} className="mb-3 pb-3 border-b border-gray-200">
          {renderItem(item, index)}
          <button
            type="button"
            onClick={() => {
              const newItems = [...items];
              newItems.splice(index, 1);
              setItems(newItems);
            }}
            className="mt-2 text-sm text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addNewItem}
        className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded"
      >
        Add Item
      </button>
    </div>
  );
};
