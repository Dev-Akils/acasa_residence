import { useState } from "react";

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    plotSize: "",
    dropdown: "Estimate Project Start",
    notRobot: false,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const options = ["Within 3 months", "3 to 4 months", "After 6 months"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Enter a valid 10-digit number";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter a valid email";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.plotSize.trim()) newErrors.plotSize = "Plot size is required";
    if (!formData.notRobot) newErrors.notRobot = "Please confirm you are not a robot";
    return newErrors;
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  const foundErrors = validate();
  if (Object.keys(foundErrors).length > 0) {
    setErrors(foundErrors);
  } else {
    setErrors({});
    console.log("Submitted:", formData);
    localStorage.setItem('formData', JSON.stringify(formData));
    setFormData({
      name: "",
      phone: "",
      email: "",
      location: "",
      plotSize: "",
      dropdown: "Estimate Project Start",
      notRobot: false,
    });

   
//  alert("Form submitted and saved!");
  }
};


  return (
    <form
      onSubmit={handleSubmit}
      className="absolute top-[30%] md:top-[60%] md:left-[33%] left-1/2 transform -translate-x-1/2 w-[90%] md:w-[60%] grid grid-cols-1 md:grid-cols-3 md:gap-2 lg:grid-cols-4 gap-4 text-black p-6 rounded-lg shadow-lg"
    >
      {/* Name */}
      <label className="col-span-1">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white/30 backdrop-blur-md placeholder-gray-700 focus:outline-none"
        />
        {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
      </label>

      {/* Phone */}
      <label className="col-span-1">
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white/30 backdrop-blur-md placeholder-gray-700 focus:outline-none"
        />
        {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
      </label>

      {/* Email */}
      <label className="col-span-1">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white/30 backdrop-blur-md placeholder-gray-700 focus:outline-none"
        />
        {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
      </label>

      {/* Location */}
      <label className="col-span-1">
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white/30 backdrop-blur-md placeholder-gray-700 focus:outline-none"
        />
        {errors.location && <p className="text-red-600 text-sm">{errors.location}</p>}
      </label>

      {/* Plot Size */}
      <label className="col-span-1">
        <input
          type="text"
          name="plotSize"
          placeholder="Size of plot"
          value={formData.plotSize}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white/30 backdrop-blur-md placeholder-gray-700 focus:outline-none"
        />
        {errors.plotSize && <p className="text-red-600 text-[14px]">{errors.plotSize}</p>}
      </label>

      {/* Dropdown */}
      <div className="relative col-span-1">
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
          }}
          className="w-full px-4 py-2 text-left border border-gray-300 rounded-md bg-white/30 backdrop-blur-md"
        >
          {formData.dropdown}
        </button>

        {isOpen && (
          <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => {
                  setFormData({ ...formData, dropdown: option });
                  setIsOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Not a robot */}
      <div className="flex items-center space-x-3 col-span-1 mt-1 bg-white rounded p-2">
        <input
          type="checkbox"
          name="notRobot"
          checked={formData.notRobot}
          onChange={handleChange}
          className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="notRobot" className="text-sm md:text-base text-gray-800">
          I'm not a robot
        </label>
        
      </div>
      

      {/* Submit Button */}
      <div className="col-span-1 md:col-span-1 flex">
        <button
          type="submit"
          className="rounded-full bg-gray-800 text-white text-sm md:text-base px-5 py-2 hover:bg-gray-700 transition"
        >
          Contact Us
        </button>
      </div>
    </form>
  );
}
