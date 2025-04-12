import React, { useState, useEffect } from 'react';
import axios from 'axios';

async function FSearch(content) {
    const url = "http://localhost:5246/api/main/search";
    const parameters = `?content=${content}`;

    try {
        const response = await axios.get(url + parameters);
        const data = response.data.hits;
        console.log(data);
        const container = document.getElementById('responceData');
        container.innerHTML = '';

        data.forEach((item) => {
            const a = document.createElement('a');
            const img = document.createElement('img');
            img.src = item.largeImageURL;
            img.style.width = '200px';
            img.style.height = '200px';
            a.appendChild(img);
            a.href = "/image?id=" + item.id;
            container.appendChild(a);
        });
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}

function Home() {
    const [search, setSearch] = useState('');

    const SetSearch = (e) => setSearch(e.target.value);

    useEffect(() => {
        FSearch(search);
    });

    return (
        <div className="flex items-center justify-center column p-12">
            <div className="flex column items-center justify-center w-full gap-12">
                <h2>Find the photo</h2>
                <input type="text" onChange={SetSearch} placeholder="Search for a photo..." className="p-12 br-8 bg b" />
            </div>
            <br /><br /><br />
            <div id="responceData" className="flex items-center justify-center wrap gap-12"></div>
        </div>
    )
}

export default Home;