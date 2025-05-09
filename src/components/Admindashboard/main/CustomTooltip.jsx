const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-200">
        <p className="font-semibold">{label}</p>
        {payload.map((item, index) => (
          <p
            key={index}
            className="flex items-center"
            style={{ color: item.color }}
          >
            {item.name}: <span className="ml-2 font-medium">{item.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};
export default CustomTooltip;
