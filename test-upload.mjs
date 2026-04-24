import fs from 'fs';

const fd = new FormData();
const buf = fs.readFileSync('./public/maktab.jpg');
const blob = new Blob([buf], { type: 'image/jpeg' });
fd.append('file', blob, 'maktab.jpg');

fetch('http://localhost:3000/api/upload', {
  method: 'POST',
  body: fd
})
.then(res => res.json())
.then(data => {
  console.log('Upload Result:', data);
  if (data.url) {
    const stat = fs.statSync('./public' + data.url);
    console.log('Generated file size:', stat.size / 1024, 'KB');
  }
})
.catch(console.error);
