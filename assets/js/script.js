const qrcodeForm = document.getElementById('qrcodeForm');
const qrcodeText = document.getElementById('qrcodeText');
const qrcodeSizes = document.getElementById('qrcodeSizes');
const qrcodePreviewContent = document.getElementById('qrcodePreviewContent');
const qrcodePreviewUrl = document.getElementById('qrcodePreviewUrl');
const qrcodePreviewDownload = document.getElementById('qrcodePreviewDownload');
const qrcodeButtonGenerate = document.getElementById('qrcodeButtonGenerate');
const qrcodeButtonDownload = document.getElementById('qrcodeButtonDownload');


// Panda Eye move
document.addEventListener('mousemove', (event) => {
    const dw = document.documentElement.clientWidth / 15;
    const dh = document.documentElement.clientHeight / 15;
    const x = event.pageX / dw;
    const y = event.pageY / dh;
    const eyeBalls = document.querySelectorAll('.panda__eye-ball');

    eyeBalls.forEach((eye) => {
        eye.style.width = `${x}px`;
        eye.style.height = `${y}px`;
    });
});


/**
 * Resets the QR code.
 */
const resetQRCode = () => {
    qrcodePreviewContent.innerHTML = '';
    qrcodePreviewUrl.innerHTML = '';
    qrcodePreviewUrl.setAttribute('src', '');
    qrcodeButtonDownload.setAttribute('disabled', 'disabled');
}

/**
 * Generates a QR code based on the given text and size.
 */
const generateQRCode = (text, size) => {

    // Réinitialisation du QRCode
    resetQRCode();

    // Vérification de la longueur du texte
    if (text.length === 0) {
        qrcodeForm.classList.add('wrong-entry');
        setTimeout(() => {
            qrcodeForm.classList.remove('wrong-entry');
        }, 3000);
        return;
    }

    // Activation du bouton de téléchargement
    qrcodeButtonDownload.removeAttribute('disabled');

    // Affichage du texte et de l'URL
    qrcodePreviewUrl.setAttribute('href', text);
    qrcodePreviewUrl.innerText = text;

    // Génération d'un QRCode
    new QRCode(qrcodePreviewContent, {
        text: text,
        width: size,
        height: size,
        colorLight: '#ffffff',
        colorDark: '#000000'
    });
}

/**
 * Downloads the QR code image.
 */
const downloadQRCode = (size) => {

    // Récupération de l'image du QRCode et insertion dans le lien
    const qrcodeImage = qrcodePreviewContent.querySelector('img');
    qrcodePreviewDownload.setAttribute('href', qrcodeImage.src);
    qrcodePreviewDownload.setAttribute('download', `qrcode-${size}x${size}.png`);

    // Téléchargement de l'image
    qrcodePreviewDownload.click();
}

// On réinitialise le QRCode à chaque changement de texte ou de taille
qrcodeText.addEventListener('keydown', resetQRCode);
qrcodeSizes.addEventListener('change', resetQRCode);

// Génération et téléchargement du QRCode
qrcodeButtonGenerate.addEventListener('click', () => generateQRCode(qrcodeText.value, qrcodeSizes.value))
qrcodeButtonDownload.addEventListener('click', () => downloadQRCode(qrcodeSizes.value))
