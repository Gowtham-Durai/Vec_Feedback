import html2canvas from 'html2canvas';

export default async function exportImg() {
    const element = document.querySelector("#capture");
    element.classList.add("tempfeedback");

    if (!element) {
        console.error("Element with id 'capture' not found.");
        return null;
    }

    try {
        // Capture the element with optimized options
        const canvas =  await html2canvas(element, {
            scale: 2,
            windowWidth: element.scrollWidth,
            windowHeight: element.scrollHeight,
            x: 0,
            y: 0,
            logging:false,
        });
        // Convert the canvas image data to grayscale
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Apply grayscale filter
        for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg; // Red
            data[i + 1] = avg; // Green
            data[i + 2] = avg; // Blue
        }
        
        ctx.putImageData(imageData, 0, 0);
        
        // Convert the canvas to a data URL
        element.classList.remove("tempfeedback");
        return canvas.toDataURL("image/png");

    } catch (error) {
        console.error("Error capturing the element:", error);
        return null;
    }
}
