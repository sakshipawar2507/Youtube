document.getElementById('convert-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const youtubeUrl = document.getElementById('youtube-url').value;

    // Send the URL to the server for conversion
    fetch('/convert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: youtubeUrl })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('download-link').href = data.downloadUrl;
            document.getElementById('result').classList.remove('hidden');
            document.getElementById('error-message').classList.add('hidden');
        } else {
            document.getElementById('error-message').classList.remove('hidden');
            document.getElementById('result').classList.add('hidden');
        }
    })
    .catch(err => {
        console.error(err);
        document.getElementById('error-message').classList.remove('hidden');
        document.getElementById('result').classList.add('hidden');
    });
});
