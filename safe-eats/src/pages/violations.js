import React from 'react';

const Violations = () => {
  // Sample data for common violations and tips
  const violationsData = [
    {
      id: 1,
      violation: 'Improper food storage',
      tip: 'Ensure that all food items are stored at the proper temperature and are properly sealed.',
    },
    {
      id: 2,
      violation: 'Unsanitary kitchen conditions',
      tip: 'Regularly clean all kitchen surfaces and equipment to maintain a sanitary cooking environment.',
    },
    // Add more violations and tips as needed
  ];

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">Common Violations and Tips</h1>
      <p>Learn about common violations in NYC restaurants and tips on how to avoid them.</p>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {violationsData.map((violation) => (
          <div key={violation.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">{violation.violation}</h3>
            <p>{violation.tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Violations;
