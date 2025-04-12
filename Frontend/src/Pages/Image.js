import React, { useEffect } from 'react';
import axios from 'axios';

async function Load(id) {
    const url = "http://localhost:5246/api/main/image";
    const container = document.getElementById('responceData');
    const parameters = `?id=${id}`;

    try {
        const response = await axios.get(url + parameters);
        const data = response.data.hits[0];
        console.log(data);
        container.innerHTML = '';

        const img = document.createElement('img');
        const info = document.createElement('div');
        const tags = document.createElement('p');
        const likes = document.createElement('p');
        const back = document.createElement('a');
        tags.innerHTML = "Tags: " + data.tags;
        likes.innerHTML = "Likes: " + data.likes;
        back.innerHTML = "Back to home";
        back.href = "/";
        back.className = "p-12 br-8 bg b";
        img.src = data.largeImageURL;
        img.style.width = '400px';
        img.style.height = '400px';
        info.className = "flex items-start column gap-12";
        info.appendChild(tags);
        info.appendChild(likes);
        info.appendChild(back);
        container.appendChild(img);
        container.appendChild(info);
        container.className = "flex items-center justify-center row gap-12";

        LoadSameImages(data.tags);
    }
    catch (error) {
        console.error('Error fetching data:', error);
        container.innerHTML = 'Error fetching data: ' + error;
    }
} 

async function LoadSameImages(category) {
    const url = "http://localhost:5246/api/main/search";
    const container = document.getElementById('responceDataSameImages');
    const parameters = `?content=${category}`;

    try {
        const response = await axios.get(url + parameters);
        const data = response.data.hits;
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

function Image() {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (!id || isNaN(id) || id < 0) {
            alert('Not valid Id provided in the URL');
            return;
        }
        Load(id);
    });

    return (
        <div className="p-12">
            <div className="flex items-center justify-center column">
                <div id="responceData" />
                <br /><br /><br />
                <div id="responceDataSameImages" className="flex items-center justify-center wrap gap-12" />
            </div>
        </div>
    );
}

export default Image;