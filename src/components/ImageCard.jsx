import React from 'react';

function ImageCard({ imgUrl }) {
    return (
        <div className="img_card bg-white rounded-lg shadow-md overflow-hidden">
            <img src={imgUrl} alt="generated" className="w-full h-48 object-cover"/>
            <a href={imgUrl} download className="download_btn block text-center p-2 bg-green-500 text-white">
                Download
            </a>
        </div>
    );
}

export default ImageCard;