import React from 'react';

const BusPassLogo = () => (
    <svg width="40" height="30" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
        {/* Background */}
        <rect x="10" y="10" width="180" height="130" rx="15" ry="15" fill="#f4f4f4" stroke="#000" strokeWidth="2" />

        {/* Bus Icon */}
        <g transform="translate(40, 40)">
            <rect x="0" y="0" width="100" height="60" fill="#4CAF50" stroke="#000" strokeWidth="2" />
            <rect x="10" y="10" width="80" height="40" fill="#fff" />
            <circle cx="20" cy="70" r="10" fill="#000" />
            <circle cx="80" cy="70" r="10" fill="#000" />
        </g>
    </svg>
);

export default BusPassLogo;
