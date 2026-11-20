# 📖 HızOku - Hızlı ve Anlayarak Okuma Kursu

Ortaokul öğrencilerine (11–14 yaş) yönelik, bilimsel temellere dayanan, mobil uyumlu ve oyunlaştırılmış interaktif hızlı okuma web uygulaması.

🌐 **Canlı Demo (GitHub Pages):** [https://mserman90.github.io/hizli-okuma/](https://mserman90.github.io/hizli-okuma/)

---

## 🎯 Projenin Amacı ve Pedagojik Temeli

Hızlı okuma yalnızca "gözü hızlandırmak" değildir; **anlama ile hız arasındaki dengeyi kurmaktır**. Uygulama, her egzersiz sonrasında öğrencinin anlama düzeyini ölçer ve temel metrik olarak **Etkili Okuma Hızı**nı kullanır:

$$\text{Etkili Okuma Hızı (KDK)} = \text{Okuma Hızı (Kelime/Dakika)} \times \text{Anlama Yüzdesi}$$

Bu yaklaşım, okuma hızının anlama kaybı pahasına artırılmasını engeller ve öğrencinin LGS ve okul sınavlarında uzun paragrafları ilk okuyuşta doğru kavramasını sağlar.

---

## 🔬 Egzersiz Modları

| Mod | Tür | Bilimsel Mekanizma | Açıklama |
|---|---|---|---|
| **👁️ Odak Modu (RSVP)** | Temel Mod | Sakkad Azaltma | Kelimeleri sabit bir odak noktasında tek tek sunarak göz sıçramalarını minimize eder. |
| **🔭 Genişletilmiş Görüş Alanı** | Temel Mod | Fiksasyon Genişletme | Metni 2–5 kelimelik bloklar halinde sunarak çevresel görüşü ve tek fiksasyonda algılanan kelime sayısını artırır. |
| **📍 Yönlendirilmiş Okuma** | Temel Mod | Regresyon Önleme | Satır boyunca dinamik bir vurgu çubuğu ile gözü yönlendirir, geri dönüşleri (%10-15 zaman kaybı) azaltır. |
| **🎯 LGS Paragraf Antrenörü** | Sınav Modu | Zaman Yönetimi & Odak | LGS Türkçe paragraf soruları için 60–80 sn (hedef 75 sn) süre sayacı ile sınav kondisyonu kazandırır. |
| **🧪 Biyonik Okuma** | Deneysel Mod | Yapay Akış | *Bilimsel kanıtı sınırlı/tartışmalı* olarak etiketlenmiştir; kelime başlarını kalınlaştırarak öğrencinin anlama testinde kendi performansını kıyaslamasını sağlar. |

---

## 🎮 Oyunlaştırma & Özellikler

- **🌱 6 Seviyeli İlerleme:** Çaylak → Meraklı → Hızlı → Uzman → Usta → Efsane Okuyucu.
- **🏆 14 Başarı Rozeti:** Gün serileri, anlama ustalığı, LGS tam isabet ve hız rekorları.
- **📲 PWA (Progressive Web App):** Telefona veya tablete bir mobil uygulama gibi yüklenebilir (Android Chrome / iOS Safari "Ana Ekrana Ekle").
- **⚡ %100 Çevrimdışı (Offline) Desteği:** Service Worker sayesinde internet bağlantısı olmadan bile tüm egzersizler, metinler ve anlama testleri eksiksiz çalışır.
- **🔆 Ekran Uyanık Kalma (Wake Lock):** Okuma egzersizleri sırasında telefon ekranının kararmasını ve kilitlenmesini engeller.
- **📳 Dokunsal Geri Bildirim (Haptic Feedback):** Soruları yanıtlarken ve seviye atlarken titreşimli geri bildirim sunar.
- **📈 Görsel İlerleme Grafikleri:** HTML5 Canvas ile çizilen son 10 egzersizin hız ve anlama grafiği.
- **🔊 Web Audio API Ses Sistemi:** Harici kütüphane gerektirmeyen, anında doğru/yanlış/kutlama ses efektleri (sessize alma destekli).
- **👓 Mobil & Erişilebilirlik:** Safe-area (çentik) uyumu, tek dokunuşla font boyutu ölçekleme (A- / A+), tam responsive mobil tasarım.
- **📚 15 Özgün Metin & 45 Soru:** Bilim, Tarih, Doğa, Günlük Yaşam ve LGS Paragrafları.

---

## 💻 Yerel Kurulum & Çalıştırma

Uygulama saf HTML5, CSS3 ve modern Vanilla JavaScript ile geliştirilmiştir. Hiçbir harici bağımlılık veya kurulum gerektirmez.

1. Projeyi klonlayın:
   ```bash
   git clone https://github.com/mserman90/hizli-okuma.git
   cd hizli-okuma
   ```
2. `index.html` dosyasını doğrudan herhangi bir web tarayıcısında açın veya yerel bir sunucu başlatın.

---

## 📄 Lisans

MIT Lisansı ile korunmaktadır.
