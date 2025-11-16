const codeInput = document.getElementById('codeInput');
const previewBtn = document.getElementById('previewBtn');
const preview = document.getElementById('preview');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const importFile = document.getElementById('importFile');

// Function to render the custom language
function renderCustomCode(code) {
    let output = code;

    // blueredbox tag
    output = output.replace(/{blueredbox}([\s\S]*?){\|blueredbox}/g, (match, p1) => {
        return `<div class="blueredbox">${p1}</div>`;
    });

    // micrillion tag
    output = output.replace(/{micrillion \|}/g, () => {
        return `<iframe src="https://legogocreator.github.io/Micrillion/" frameborder="0" width="100%" height="300px"></iframe>`;
    });

    // sense tag
    output = output.replace(/{sense src="(.*?)" alt="(.*?)" \|}/g, (match, src, alt) => {
        if (src.endsWith(".mp4") || src.endsWith(".webm")) {
            return `<video controls src="${src}" alt="${alt}" style="max-width:100%"></video>`;
        } else if (src.endsWith(".mp3") || src.endsWith(".wav")) {
            return `<audio controls src="${src}" alt="${alt}" style="width:100%"></audio>`;
        } else {
            return `<img src="${src}" alt="${alt}" style="max-width:100%">`;
        }
    });

    // fadetext tag
output = output.replace(/{fadetext duration="(.*?)"}([\s\S]*?){\|fadetext}/g, (match, duration, text) => {
    // duration in seconds, default to 2 if not set
    const dur = parseFloat(duration) || 2;
    return `<span class="fadetext" style="animation: fadeOut ${dur}s forwards;">${text}</span>`;
});

    return output;
}

// Preview button
previewBtn.addEventListener('click', () => {
    preview.innerHTML = renderCustomCode(codeInput.value);
});

// Export button
exportBtn.addEventListener('click', () => {
    const blob = new Blob([codeInput.value], { type: 'text/plain' });
    const link = document.createElement('a');
    link.download = 'code.mcl';
    link.href = URL.createObjectURL(blob);
    link.click();
});

// Import button
importBtn.addEventListener('click', () => importFile.click());
importFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        codeInput.value = reader.result;
        preview.innerHTML = renderCustomCode(reader.result);
    };
    reader.readAsText(file);
});
