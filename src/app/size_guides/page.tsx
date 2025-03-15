"use client";
const SizeGuide = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-8">Size Guide</h1>

      <p className="text-xl text-center mb-12">
        Use our size guide to find your perfect fit! Whether you're shopping for
        tops, bottoms, or shoes, we have the measurements and visuals to help
        you make the right choice.
      </p>

      {/* Shirt Size Guide */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Shirt Size Guide</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Men's Shirt Sizing</h3>
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Size</th>
                  <th className="px-4 py-2 text-left">Chest (inches)</th>
                  <th className="px-4 py-2 text-left">Length (inches)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2">S</td>
                  <td className="px-4 py-2">34–36</td>
                  <td className="px-4 py-2">28</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">M</td>
                  <td className="px-4 py-2">38–40</td>
                  <td className="px-4 py-2">29</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">L</td>
                  <td className="px-4 py-2">42–44</td>
                  <td className="px-4 py-2">30</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">XL</td>
                  <td className="px-4 py-2">46–48</td>
                  <td className="px-4 py-2">31</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <div className="flex justify-center">
            <Image
              src="https://example.com/images/shirt-size-guide.jpg" // Replace with your actual image URL
              alt="Shirt size guide illustration"
              width={400}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div> */}
        </div>
      </div>

      {/* Pants Size Guide */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Pants Size Guide</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Men's Pants Sizing</h3>
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Size</th>
                  <th className="px-4 py-2 text-left">Waist (inches)</th>
                  <th className="px-4 py-2 text-left">Inseam (inches)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2">28</td>
                  <td className="px-4 py-2">28–30</td>
                  <td className="px-4 py-2">30</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">30</td>
                  <td className="px-4 py-2">30–32</td>
                  <td className="px-4 py-2">31</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">32</td>
                  <td className="px-4 py-2">32–34</td>
                  <td className="px-4 py-2">32</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">34</td>
                  <td className="px-4 py-2">34–36</td>
                  <td className="px-4 py-2">33</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <div className="flex justify-center">
            <Image
              src="https://example.com/images/pants-size-guide.jpg" // Replace with your actual image URL
              alt="Pants size guide illustration"
              width={400}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div> */}
        </div>
      </div>

      {/* Shoe Size Guide */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Shoe Size Guide</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Men's Shoe Sizing</h3>
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Size</th>
                  <th className="px-4 py-2 text-left">Foot Length (inches)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2">7</td>
                  <td className="px-4 py-2">9.25</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">8</td>
                  <td className="px-4 py-2">9.625</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">9</td>
                  <td className="px-4 py-2">9.9375</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">10</td>
                  <td className="px-4 py-2">10.25</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <div className="flex justify-center">
            <Image
              src="https://example.com/images/shoe-size-guide.jpg" // Replace with your actual image URL
              alt="Shoe size guide illustration"
              width={400}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;
