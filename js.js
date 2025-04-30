
body{
    font-family: Arial, sans-serif;
    margin: 20%;
    display: flex;
    background-color: #FEFEFF;
    gap: 30px;
}
.sidebar{
    background-color: #0020ff;
    color : rgb(0, 0, 0);
    width: 200px;
    padding: 15px;
}
.daire {
  width: 180px;
  height: 220px;
  object-fit: cover;
  border-radius: 50%;
  margin: 0;
}

.main {
    margin-right: 550px;
    background-color: #FEFEFF;
}
.contact {
    margin: 10px;
}

document.addEventListener("DOMContentLoaded", function() {
    // Tüm bölüm başlıklarını seç (örneğin <h3 class="section-header">)
    const sectionHeaders = document.querySelectorAll(".section-header");
    sectionHeaders.forEach(header => {
        header.style.cursor = "pointer"; // Tıklanabilir olduğunu belirt
        header.addEventListener("click", function() {
            // Başlığın hemen sonraki kardeş element (içerik) alınır
            const content = header.nextElementSibling;
            if (content) {
                // İçerik görünüyorsa gizle, gizli ise göster
                if (content.style.display === "none") {
                    content.style.display = "block";
                } else {
                    content.style.display = "none";
                }
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Tüm kopyalama butonlarını seç (.copy-btn sınıfı ile)
    const copyButtons = document.querySelectorAll(".copy-btn");
    copyButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            // Hedef ID'si ile kopyalanacak metni al (veya data-copy-text kullan)
            const targetId = btn.getAttribute("data-copy-target");
            const textToCopy = targetId
                ? document.getElementById(targetId).innerText
                : btn.getAttribute("data-copy-text");
            if (!textToCopy) return; // Metin yoksa çık

            // Panoya kopyala
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Kopyalandı bildirimi oluştur
                const notification = document.createElement("span");
                notification.className = "copy-notification";
                notification.innerText = "Kopyalandı";
                // Butonun hemen yanına ekle
                btn.parentNode.appendChild(notification);
                // Bir süre sonra bildirimi kaldır
                setTimeout(() => {
                    notification.remove();
                }, 1500);
            });
        });
    });
});
