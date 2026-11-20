// ============================================================
// HızOku - İçerik Veritabanı
// Ortaokul seviyesi metinler ve anlama soruları
// ============================================================

const TEXTS = [
  // ---- SEVİYE 1 (Kolay, ~100-120 kelime) ----
  {
    id: 1,
    title: "Güneş Sistemi'nin Devleri",
    category: "bilim",
    icon: "🪐",
    level: 1,
    content: `Güneş Sistemi'nde sekiz gezegen bulunur. Bu gezegenlerden en büyüğü Jüpiter'dir. Jüpiter o kadar büyüktür ki içine bin üç yüzden fazla Dünya sığabilir. Yüzeyinde dev bir fırtına olan Büyük Kırmızı Leke, yüzlerce yıldır devam etmektedir. Satürn ise görkemli halkalarıyla tanınır. Bu halkalar buz parçacıkları ve kaya parçalarından oluşur. Uranüs ve Neptün ise buz devleri olarak adlandırılır çünkü atmosferlerinde donmuş metan gazı bulunur. Neptün, Güneş'e en uzak gezegen olup yüzeyinde saatte iki bin kilometre hıza ulaşan rüzgârlar eser. Güneş Sistemi'nin dış gezegenleri, iç gezegenlere kıyasla çok daha büyük ve soğuktur.`,
    questions: [
      {
        question: "İçine bin üç yüzden fazla Dünya sığabilen gezegen hangisidir?",
        options: ["Satürn", "Jüpiter", "Neptün", "Uranüs"],
        correct: 1
      },
      {
        question: "Satürn'ün halkaları nelerden oluşur?",
        options: [
          "Toz ve gaz bulutlarından",
          "Buz parçacıkları ve kaya parçalarından",
          "Volkanik lavlardan",
          "Metan gazından"
        ],
        correct: 1
      },
      {
        question: "Uranüs ve Neptün neden 'buz devleri' olarak adlandırılır?",
        options: [
          "Yüzeyleri tamamen buzla kaplı olduğu için",
          "Güneş'e en uzak oldukları için",
          "Atmosferlerinde donmuş metan gazı bulunduğu için",
          "Halkaları buzdan oluştuğu için"
        ],
        correct: 2
      }
    ]
  },
  {
    id: 2,
    title: "Bal Arılarının Gizli Dili",
    category: "doğa",
    icon: "🐝",
    level: 1,
    content: `Bal arıları, yiyecek kaynağı bulduklarında bunu diğer arılara bildirmek için dans ederler. Bu iletişim yöntemine "arı dansı" denir. İki tür dans vardır: yuvarlak dans ve kuyruk sallama dansı. Yuvarlak dans, yiyeceğin kovana yakın olduğunu bildirir. Kuyruk sallama dansı ise uzaktaki kaynakları anlatmak için kullanılır. Arı, dans sırasında vücudunu sallama hızı ve açısıyla yiyeceğin uzaklığını ve yönünü iletir. Bu keşif, bilim insanı Karl von Frisch tarafından yapılmış ve kendisine Nobel Ödülü kazandırmıştır. Bal arıları bu sayede kilometrelerce uzaktaki çiçekleri bile birbirlerine tarif edebilirler. Doğadaki bu iletişim sistemi, insan dilinin basitliğiyle kıyaslanamayacak kadar zariftir.`,
    questions: [
      {
        question: "Yuvarlak dans ne anlama gelir?",
        options: [
          "Tehlike var",
          "Yiyecek kovana yakın",
          "Yiyecek çok uzakta",
          "Kovan taşınmalı"
        ],
        correct: 1
      },
      {
        question: "Arı dansını keşfeden bilim insanı kimdir?",
        options: ["Charles Darwin", "Albert Einstein", "Karl von Frisch", "Louis Pasteur"],
        correct: 2
      },
      {
        question: "Kuyruk sallama dansında arı neyi iletir?",
        options: [
          "Yiyeceğin tadını",
          "Yiyeceğin rengini",
          "Yiyeceğin uzaklığını ve yönünü",
          "Çiçeğin türünü"
        ],
        correct: 2
      }
    ]
  },
  {
    id: 3,
    title: "İstanbul'un Fethi",
    category: "tarih",
    icon: "🏰",
    level: 1,
    content: `1453 yılında Osmanlı padişahı Sultan Mehmed, henüz yirmi bir yaşındayken İstanbul'u fethetti. Şehir, güçlü surlarla çevriliydi ve daha önce birçok kuşatmaya dayanmıştı. Mehmed, bu surları aşmak için devasa toplar döktürdü. En ünlüsü Şahi topuydu. Ayrıca Haliç'e girmeyi engelleyen zinciri aşmak için gemileri karadan yürüterek Haliç'e indirdi. Bu cesur strateji, tarihin en yaratıcı askerî manevralarından biri kabul edilir. Fetihten sonra Mehmed, şehrin ismini Konstantinopolis olarak korurken farklı dinlere hoşgörü gösterdi. Ayasofya camiye dönüştürüldü. Bu olay, Orta Çağ'ın sonu ve Yeni Çağ'ın başlangıcı olarak kabul edilir.`,
    questions: [
      {
        question: "Sultan Mehmed İstanbul'u fethettiğinde kaç yaşındaydı?",
        options: ["On sekiz", "Yirmi bir", "Yirmi beş", "Otuz"],
        correct: 1
      },
      {
        question: "Gemiler neden karadan yürütüldü?",
        options: [
          "Surları arkadan kuşatmak için",
          "Haliç'e girmeyi engelleyen zinciri aşmak için",
          "Düşmanı şaşırtmak için",
          "Gemiler hasarlı olduğu için"
        ],
        correct: 1
      },
      {
        question: "İstanbul'un fethi hangi dönemin başlangıcı sayılır?",
        options: ["İlk Çağ", "Orta Çağ", "Yeni Çağ", "Yakın Çağ"],
        correct: 2
      }
    ]
  },
  {
    id: 4,
    title: "Neden Gökyüzü Mavidir?",
    category: "bilim",
    icon: "🌤️",
    level: 1,
    content: `Güneş ışığı aslında beyaz değildir; gökkuşağındaki tüm renkleri içerir. Bu renkler farklı dalga boylarına sahiptir. Kırmızı ışık uzun dalga boyuna, mavi ışık ise kısa dalga boyuna sahiptir. Güneş ışığı atmosfere girdiğinde hava molekülleriyle çarpışır. Bu çarpışma sonucunda kısa dalga boylu mavi ışık her yöne saçılır. Bu olaya Rayleigh saçılması denir. İşte bu yüzden gökyüzüne baktığımızda her yönden gelen mavi ışığı görürüz. Gün batımında ise güneş ışığı atmosferde daha uzun bir yol kat eder. Bu durumda mavi ışık tamamen saçılır ve geriye kırmızı ile turuncu tonlar kalır. Bu nedenle gün batımları kızıl renklerde görünür.`,
    questions: [
      {
        question: "Mavi ışığın dalga boyu nasıldır?",
        options: ["Uzun", "Kısa", "Orta", "Değişken"],
        correct: 1
      },
      {
        question: "Gökyüzünün mavi görünmesini sağlayan olaya ne denir?",
        options: ["Kırılma", "Yansıma", "Rayleigh saçılması", "Soğurma"],
        correct: 2
      },
      {
        question: "Gün batımında gökyüzü neden kızıl renkte görünür?",
        options: [
          "Güneş kızıl ışık yayar",
          "Atmosfer kalınlaşır",
          "Mavi ışık tamamen saçılır, kırmızı ve turuncu kalır",
          "Bulutlar ışığı kırmızıya boyar"
        ],
        correct: 2
      }
    ]
  },
  {
    id: 5,
    title: "Plastik Kirliliği ve Okyanuslar",
    category: "günlük yaşam",
    icon: "🌊",
    level: 1,
    content: `Her yıl yaklaşık sekiz milyon ton plastik okyanuslara karışmaktadır. Bu miktar, her dakika bir çöp kamyonu dolusu plastiğin denize boşaltılmasına eşdeğerdir. Plastikler doğada yüzlerce yıl boyunca çözünmez; ancak güneş ışığı ve dalgalar etkisiyle küçük parçalara ayrılır. Beş milimetreden küçük olan bu parçalara mikroplastik denir. Deniz canlıları bu parçacıkları yiyecek sanarak yutar. Araştırmalar, deniz kaplumbağalarının yüzde doksan birinden fazlasının midesinde plastik bulunduğunu göstermiştir. Mikroplastikler besin zinciri yoluyla balıklara, oradan da insanlara ulaşabilir. Bu sorunu azaltmak için tek kullanımlık plastiklerden kaçınmak ve geri dönüşüme önem vermek gerekmektedir.`,
    questions: [
      {
        question: "Her yıl okyanuslara ne kadar plastik karışır?",
        options: ["Bir milyon ton", "Beş milyon ton", "Sekiz milyon ton", "On milyon ton"],
        correct: 2
      },
      {
        question: "Mikroplastik nedir?",
        options: [
          "Özel üretilen küçük plastikler",
          "Beş milimetreden küçük plastik parçaları",
          "Geri dönüştürülmüş plastik",
          "Denizde çözünen plastik"
        ],
        correct: 1
      },
      {
        question: "Deniz kaplumbağalarının yüzde kaçının midesinde plastik bulunmuştur?",
        options: ["Yüzde elli", "Yüzde yetmiş", "Yüzde doksan birden fazla", "Yüzde yirmi"],
        correct: 2
      }
    ]
  },

  // ---- SEVİYE 2 (Orta, ~140-170 kelime) ----
  {
    id: 6,
    title: "İnsan Beyninin Gizemli Dünyası",
    category: "bilim",
    icon: "🧠",
    level: 2,
    content: `İnsan beyni, yaklaşık bir buçuk kilogram ağırlığında olmasına rağmen vücuttaki enerjinin yüzde yirmisini tüketir. Beyin, yaklaşık seksen altı milyar sinir hücresinden (nöron) oluşur. Bu nöronlar birbirleriyle trilyonlarca bağlantı kurarak devasa bir ağ oluşturur. Bilgi, nöronlar arasında elektriksel sinyaller ve kimyasal maddeler aracılığıyla iletilir. Bu iletim hızı saatte dört yüz otuz kilometreye kadar çıkabilir. Beynin farklı bölgeleri farklı görevlerden sorumludur. Örneğin, ön lob karar verme ve planlama ile ilgilenirken arka lob görsel bilgileri işler. Hipokampüs adlı bölge ise yeni anıların oluşturulmasında kritik bir rol oynar. İlginç bir şekilde beyin ağrı hissetmez çünkü kendisinde ağrı reseptörü bulunmaz. Beyin cerrahisi sırasında hastalar bazen uyanık tutulur ve konuşturulur. Uyku sırasında beyin pasif değildir; tam aksine günün anılarını düzenler, gereksiz bilgileri eler ve öğrenilenleri kalıcı belleğe aktarır. Bu yüzden düzenli uyku, öğrenme için kritik öneme sahiptir.`,
    questions: [
      {
        question: "İnsan beyni vücut enerjisinin yüzde kaçını tüketir?",
        options: ["Yüzde on", "Yüzde yirmi", "Yüzde otuz", "Yüzde kırk"],
        correct: 1
      },
      {
        question: "Hipokampüs ne işe yarar?",
        options: [
          "Görsel bilgileri işler",
          "Yeni anıların oluşturulmasında rol oynar",
          "Kas hareketlerini kontrol eder",
          "Ağrıyı algılar"
        ],
        correct: 1
      },
      {
        question: "Uyku sırasında beyin ne yapar?",
        options: [
          "Tamamen dinlenir",
          "Sadece rüya görür",
          "Anıları düzenler ve öğrenilenleri kalıcı belleğe aktarır",
          "Hiçbir işlem yapmaz"
        ],
        correct: 2
      }
    ]
  },
  {
    id: 7,
    title: "Türklerin Orta Asya'dan Göçü",
    category: "tarih",
    icon: "🐎",
    level: 2,
    content: `Türkler, tarih boyunca Orta Asya steplerinden farklı yönlere büyük göçler gerçekleştirmiştir. Bu göçlerin en önemli nedenleri arasında iklim değişiklikleri, kuraklık, nüfus artışı ve boylar arası mücadeleler sayılabilir. Özellikle Çin baskısı, birçok Türk boyunun batıya yönelmesine neden olmuştur. Göç eden Türk boyları gittikleri yerlere atlı göçebe kültürünü, demir işleme teknolojisini ve askerî teşkilat anlayışını taşımıştır. Hunlar, Avrupa'ya ulaşan ilk Türk topluluğu olarak kabul edilir. Attila önderliğindeki Hunlar, Roma İmparatorluğu'nu ciddi şekilde tehdit etmiş ve Kavimler Göçü'nü tetiklemiştir. Bu göç dalgası, Batı Roma İmparatorluğu'nun yıkılmasına ve Avrupa'nın siyasi haritasının tamamen değişmesine yol açmıştır. Selçuklular ise Anadolu'ya gelerek bu toprakları Türk yurdu hâline getirmiş, İslam medeniyetiyle harmanlanan zengin bir kültürel miras bırakmıştır. Göçler, yalnızca askeri değil aynı zamanda kültürel bir etkileşim sürecidir.`,
    questions: [
      {
        question: "Türk göçlerinin nedenlerinden biri değildir?",
        options: ["İklim değişiklikleri", "Deniz ticareti", "Nüfus artışı", "Boylar arası mücadeleler"],
        correct: 1
      },
      {
        question: "Kavimler Göçü'nü tetikleyen topluluk hangisidir?",
        options: ["Selçuklular", "Göktürkler", "Hunlar", "Uygurlar"],
        correct: 2
      },
      {
        question: "Göç eden Türk boyları gittikleri yerlere ne taşımıştır?",
        options: [
          "Tarım tekniklerini",
          "Denizcilik bilgisini",
          "Atlı göçebe kültürünü ve demir işleme teknolojisini",
          "Yazı sistemini"
        ],
        correct: 2
      }
    ]
  },
  {
    id: 8,
    title: "Fotosentez: Bitkiler Nasıl Beslenir?",
    category: "doğa",
    icon: "🌿",
    level: 2,
    content: `Bitkiler, hayvanlar gibi yiyecek aramaz; kendi besinlerini kendileri üretir. Bu sürece fotosentez denir. Fotosentez için üç temel madde gereklidir: güneş ışığı, su ve karbondioksit. Bitkinin yapraklarındaki kloroplast organellerinde bulunan klorofil pigmenti, güneş ışığını emer. Bu enerji kullanılarak su ve karbondioksit, glikoz (şeker) ve oksijene dönüştürülür. Üretilen glikoz bitkinin enerji kaynağı olurken oksijen atmosfere salınır. Dünya üzerindeki oksijenin büyük bölümü ağaçlardan değil okyanuslardaki fitoplanktonlardan gelir. Fitoplanktonlar atmosferdeki oksijenin yaklaşık yüzde ellisini üretir. Fotosentez olmadan yeryüzünde yaşam mümkün olmazdı çünkü hem besin zincirinin temeli hem de atmosferdeki oksijen dengesi bu sürece bağlıdır. Yaprakların yeşil görünmesinin nedeni de klorofildir; bu pigment yeşil ışığı yansıtır, diğer renkleri emer. Sonbaharda klorofil azaldığında yapraklar sarı ve kırmızı tonlara bürünür.`,
    questions: [
      {
        question: "Fotosentez için gerekli olmayan madde hangisidir?",
        options: ["Güneş ışığı", "Su", "Oksijen", "Karbondioksit"],
        correct: 2
      },
      {
        question: "Atmosferdeki oksijenin yaklaşık yüzde kaçı fitoplanktonlardan gelir?",
        options: ["Yüzde yirmi", "Yüzde otuz", "Yüzde elli", "Yüzde seksen"],
        correct: 2
      },
      {
        question: "Sonbaharda yaprakların renk değiştirmesinin nedeni nedir?",
        options: [
          "Sıcaklığın düşmesi",
          "Klorofil miktarının azalması",
          "Fotosentezin artması",
          "Yağmurun artması"
        ],
        correct: 1
      }
    ]
  },
  {
    id: 9,
    title: "Dijital Ayak İzi",
    category: "günlük yaşam",
    icon: "👣",
    level: 2,
    content: `İnternette yaptığımız her işlem bir iz bırakır. Arama motorlarında yazdığımız kelimeler, ziyaret ettiğimiz web siteleri, sosyal medyada paylaştığımız fotoğraflar ve beğendiğimiz gönderiler dijital ayak izimizi oluşturur. Bu veriler sunucularda uzun süre saklanır ve çeşitli şirketler tarafından analiz edilir. Reklamverenler bu bilgileri kullanarak kişiye özel reklamlar gösterir. Örneğin, bir spor ayakkabı aradıktan sonra her yerde spor ayakkabı reklamları görmenizin nedeni budur. Dijital ayak izi yalnızca ticari amaçlarla kullanılmaz; iş başvurularında da sosyal medya hesapları incelenmektedir. Gençlerin çevrimiçi paylaşımları yıllar sonra karşılarına çıkabilir. Bu nedenle internette paylaşım yaparken dikkatli olmak önemlidir. Güçlü şifreler kullanmak, bilinmeyen bağlantılara tıklamamak ve kişisel bilgileri paylaşmamak temel güvenlik kurallarıdır. Unutmayın: internette silinen içerikler bile tamamen yok olmayabilir, çünkü başkaları tarafından kopyalanmış veya arşivlenmiş olabilir.`,
    questions: [
      {
        question: "Dijital ayak izi nedir?",
        options: [
          "Bilgisayarın fiziksel izi",
          "İnternette yaptığımız işlemlerin bıraktığı veri izi",
          "Web sitelerinin tasarım şablonu",
          "Sosyal medya profil fotoğrafı"
        ],
        correct: 1
      },
      {
        question: "Kişiye özel reklamlar nasıl gösterilir?",
        options: [
          "Rastgele seçilir",
          "Dijital ayak izi analiz edilerek",
          "Televizyon izleme alışkanlıklarına göre",
          "Yaşa göre otomatik belirlenir"
        ],
        correct: 1
      },
      {
        question: "İnternette silinen içerikler hakkında hangisi doğrudur?",
        options: [
          "Tamamen yok olur",
          "Yalnızca bir hafta saklanır",
          "Başkaları tarafından kopyalanmış olabilir",
          "Hiçbir şekilde geri getirilemez"
        ],
        correct: 2
      }
    ]
  },

  // ---- SEVİYE 3 (Zor, ~180-220 kelime) ----
  {
    id: 10,
    title: "Kara Delikler: Evrenin Canavarları",
    category: "bilim",
    icon: "🕳️",
    level: 3,
    content: `Kara delikler, kütlesi çok büyük yıldızların ömürlerinin sonunda çökmesiyle oluşur. Bir yıldız yakıtını tükettiğinde kendi kütleçekimi altında sıkışmaya başlar. Eğer yıldız yeterince büyükse bu çökme durdurulamaz ve madde sonsuz yoğunlukta bir noktaya, tekilliğe sıkışır. Kara deliğin etrafında olay ufku denilen görünmez bir sınır bulunur. Bu sınırı geçen hiçbir şey, ışık bile, geri çıkamaz. Kara delikler doğrudan görülemez çünkü ışık yaymazlar. Ancak çevrelerindeki maddeyi yutarken oluşan yüksek enerjili gaz disklerinden yayılan X ışınları sayesinde dolaylı olarak tespit edilirler. 2019 yılında Olay Ufku Teleskobu projesi, Messier 87 galaksisinin merkezindeki süper kütleli kara deliğin ilk fotoğrafını çekmeyi başardı. Bu görüntü, kara deliklerin varlığına dair en güçlü görsel kanıt oldu. Samanyolu galaksimizin merkezinde de Sagittarius A* adlı süper kütleli bir kara delik bulunmaktadır. Bu kara deliğin kütlesi Güneş'in yaklaşık dört milyon katıdır. Kara delikler Einstein'ın genel görelilik kuramının öngördüğü en uç nesnelerdir ve zaman-mekân yapısını bükerek etraflarında zamanın yavaşlamasına neden olurlar.`,
    questions: [
      {
        question: "Olay ufku nedir?",
        options: [
          "Kara deliğin merkezi",
          "Kara deliğin etrafındaki görünmez sınır",
          "Yıldızın patladığı an",
          "Galaksinin dış sınırı"
        ],
        correct: 1
      },
      {
        question: "İlk kara delik fotoğrafı hangi yıl çekildi?",
        options: ["2015", "2017", "2019", "2021"],
        correct: 2
      },
      {
        question: "Sagittarius A*'ın kütlesi Güneş'in yaklaşık kaç katıdır?",
        options: ["Yüz bin katı", "Bir milyon katı", "Dört milyon katı", "On milyon katı"],
        correct: 2
      }
    ]
  },
  {
    id: 11,
    title: "Yapay Zekâ ve Günlük Hayat",
    category: "günlük yaşam",
    icon: "🤖",
    level: 3,
    content: `Yapay zekâ, bilgisayarların insan zekâsına benzer görevleri yerine getirmesini sağlayan teknolojilerin genel adıdır. Günlük hayatımızda yapay zekâ düşündüğümüzden çok daha yaygındır. Akıllı telefonlardaki sesli asistanlar, fotoğraflardaki yüz tanıma sistemleri, sosyal medyadaki içerik önerileri ve navigasyon uygulamalarındaki trafik tahminleri yapay zekâ ile çalışır. Makine öğrenimi, yapay zekânın bir alt dalıdır ve bilgisayarların açıkça programlanmadan verilerden öğrenmesini sağlar. Örneğin, bir e-posta servisi binlerce spam örneği inceleyerek yeni spam mesajları otomatik olarak tanıyabilir. Derin öğrenme ise insan beynindeki sinir ağlarından esinlenerek geliştirilen daha gelişmiş bir tekniktir. Bu teknik sayesinde bilgisayarlar artık görüntü tanıma, dil çevirisi ve hatta sanat eseri üretme gibi karmaşık görevleri başarıyla gerçekleştirebilmektedir. Ancak yapay zekânın sınırları da vardır. Mevcut yapay zekâ sistemleri gerçek anlamda düşünmez veya anlamaz; büyük veri kümelerindeki örüntüleri tanır. Etik kaygılar da önemli bir tartışma konusudur: önyargılı verilerle eğitilen yapay zekâ ayrımcı kararlar verebilir. Bu nedenle yapay zekâ geliştirme sürecinde adalet ve şeffaflık ilkeleri büyük önem taşımaktadır.`,
    questions: [
      {
        question: "Makine öğrenimi nedir?",
        options: [
          "Bilgisayarların kendini tamir etmesi",
          "Bilgisayarların açıkça programlanmadan verilerden öğrenmesi",
          "Robotların yürümeyi öğrenmesi",
          "İnsanların bilgisayar kullanmayı öğrenmesi"
        ],
        correct: 1
      },
      {
        question: "Derin öğrenme hangi yapıdan esinlenmiştir?",
        options: [
          "Bilgisayar devrelerinden",
          "İnsan beynindeki sinir ağlarından",
          "İnternet ağlarından",
          "Sosyal medya algoritmalarından"
        ],
        correct: 1
      },
      {
        question: "Yapay zekâ etiği konusunda hangi sorun vurgulanmıştır?",
        options: [
          "Elektrik tüketiminin fazla olması",
          "Önyargılı verilerle eğitilen yapay zekânın ayrımcı kararlar verebilmesi",
          "Bilgisayarların çok pahalı olması",
          "İnternetin yavaşlaması"
        ],
        correct: 1
      }
    ]
  },
  {
    id: 12,
    title: "Depremlerin Bilimi",
    category: "bilim",
    icon: "🌍",
    level: 3,
    content: `Dünya'nın dış kabuğu tek parça değildir; tektonik plakalar adı verilen dev kara parçalarından oluşur. Bu plakalar, alttaki yarı erimiş manto tabakası üzerinde yılda birkaç santimetre hızla hareket eder. Plakalar birbirine yaklaştığında, uzaklaştığında veya birbirine sürtündüğünde kenarlarında büyük gerilim birikir. Bu gerilim aniden boşaldığında deprem meydana gelir. Depremler sismograf adlı cihazlarla ölçülür ve büyüklükleri Richter ölçeği veya moment magnitüd ölçeği ile ifade edilir. Türkiye, Kuzey Anadolu Fay Hattı ve Doğu Anadolu Fay Hattı gibi aktif fay hatlarının üzerinde yer aldığı için deprem riski yüksek bir ülkedir. Depremler henüz önceden tahmin edilememektedir; ancak bilim insanları fay hatlarını inceleyerek hangi bölgelerin risk altında olduğunu belirleyebilir. Depreme dayanıklı bina yapımı, afet çantası hazırlamak ve deprem anında nasıl davranılacağını bilmek hayat kurtarabilir. Deprem anında çök-kapan-tutun hareketi yapılmalı, sarsıntı geçene kadar sağlam bir masa altına sığınılmalıdır. Bina boşaltılırken asansör kullanılmamalı, merdiven tercih edilmelidir. Bu bilgiler basit görünse de panik anında hatırlanması güç olabilir; bu yüzden düzenli tatbikat yapmak büyük önem taşır.`,
    questions: [
      {
        question: "Tektonik plakalar ne üzerinde hareket eder?",
        options: [
          "Su tabakası üzerinde",
          "Yarı erimiş manto tabakası üzerinde",
          "Kum tabakası üzerinde",
          "Kaya tabakası üzerinde"
        ],
        correct: 1
      },
      {
        question: "Türkiye'de deprem riskinin yüksek olmasının nedeni nedir?",
        options: [
          "İkliminin sıcak olması",
          "Denizlerle çevrili olması",
          "Aktif fay hatlarının üzerinde yer alması",
          "Dağlık arazi yapısı"
        ],
        correct: 2
      },
      {
        question: "Deprem anında ne yapılmalıdır?",
        options: [
          "Hemen dışarı koşulmalı",
          "Asansörle bina terk edilmeli",
          "Çök-kapan-tutun hareketi yapılmalı",
          "Pencereden bakılmalı"
        ],
        correct: 2
      }
    ]
  },
  {
    id: 13,
    title: "Amazon Yağmur Ormanları",
    category: "doğa",
    icon: "🌳",
    level: 3,
    content: `Amazon yağmur ormanları, Güney Amerika'da yaklaşık beş buçuk milyon kilometrekare alan kaplayan dünyanın en büyük tropikal ormanıdır. Bu devasa orman, dokuz ülkenin topraklarına yayılır ve Dünya'daki tüm yağmur ormanlarının yarısından fazlasını oluşturur. Amazon, gezegenimizdeki bilinen türlerin onda birinden fazlasına ev sahipliği yapar. Burada kırk binden fazla bitki türü, bin üç yüzden fazla kuş türü ve üç milyondan fazla böcek türü yaşar. Amazon Nehri ise hacim bakımından dünyanın en büyük nehridir ve okyanusa her saniye iki yüz bin metreküp su boşaltır. Yağmur ormanları, karbondioksit emerek ve oksijen üreterek küresel iklim dengesinde kritik bir rol oynar. Bu nedenle Amazon'a "Dünya'nın akciğerleri" denir. Ancak ormansızlaşma ciddi bir tehdit oluşturmaktadır. Tarım alanı açmak, hayvancılık ve yasadışı ağaç kesimi nedeniyle her yıl binlerce kilometrekare orman yok edilmektedir. Son kırk yılda Amazon'un yaklaşık yüzde on yedisi tahrip edilmiştir. Bilim insanları, ormansızlaşmanın belirli bir eşiği geçmesi hâlinde Amazon'un savana ekosistemine dönüşebileceği konusunda uyarıda bulunmaktadır. Bu dönüşüm, küresel iklim değişikliğini dramatik biçimde hızlandırabilir.`,
    questions: [
      {
        question: "Amazon yağmur ormanları kaç ülkenin topraklarına yayılır?",
        options: ["Beş", "Yedi", "Dokuz", "On iki"],
        correct: 2
      },
      {
        question: "Amazon'un 'Dünya'nın akciğerleri' olarak adlandırılmasının nedeni nedir?",
        options: [
          "Çok geniş bir alan kaplaması",
          "Karbondioksit emerek oksijen üretmesi",
          "Çok sayıda hayvan türü barındırması",
          "Nehirlerinin büyük olması"
        ],
        correct: 1
      },
      {
        question: "Son kırk yılda Amazon'un yaklaşık yüzde kaçı tahrip edilmiştir?",
        options: ["Yüzde beş", "Yüzde on", "Yüzde on yedi", "Yüzde yirmi beş"],
        correct: 2
      }
    ]
  },
  // ---- LGS ÖZEL PARAGRAFLAR (LGS Tarzı Sorular) ----
  {
    id: 14,
    title: "LGS Paragraf: Empati ve Dinleme Sanatı",
    category: "LGS Paragraf",
    icon: "🎯",
    level: 2,
    content: `Günümüz dünyasında iletişim kanalları inanılmaz bir hızla çoğalsa da insanların birbirini gerçekten anlama oranı aynı hızla düşmektedir. Çoğu insan dinlemek için değil, yalnızca sıranın kendisine gelip cevap vermesi için bekler. Oysa gerçek dinleme, karşımızdaki kişinin yalnızca kelimelerini değil, o kelimelerin arkasındaki duyguyu ve düşünceyi de fark edebilmektir. Empati tam olarak bu noktada devreye girer. Kendimizi bir başkasının yerine koyup olaylara onun penceresinden bakabilmek, çatışmaları çözmenin en güçlü anahtarıdır. Yapılan psikolojik deneyler, dinlendiğini hisseden bireylerin güven duygusunun arttığını ve sorun çözme becerilerinin geliştiğini kanıtlamaktadır. Okulda, ailede ve arkadaşlık ilişkilerinde yaşanan anlaşmazlıkların büyük çoğunluğu ne söylendiğinden çok, nasıl dinlenmediğinden kaynaklanır.`,
    questions: [
      {
        question: "Bu parçanın ana düşüncesi (ana fikri) aşağıdakilerden hangisidir?",
        options: [
          "Teknolojik iletişim araçları yüz yüze iletişimi tamamen bitirmiştir.",
          "Gerçek iletişim, karşımızdakini empatiyle ve anlamak amacıyla dinlemekle mümkündür.",
          "Sorun çözme becerisi yalnızca uzman psikologların desteğiyle gelişir.",
          "Okuldaki başarı dinleme süresine doğrudan bağlıdır."
        ],
        correct: 1
      },
      {
        question: "Parçaya göre çatışmaları çözmenin en güçlü anahtarı nedir?",
        options: [
          "Hemen karşı tezler üretip savunmaya geçmek",
          "Sadece kendi haklılığını kanıtlamaya çalışmak",
          "Olaylara karşımızdakinin penceresinden bakabilmek (empati)",
          "İletişim ortamını terk etmek"
        ],
        correct: 2
      },
      {
        question: "Parçadan aşağıdaki yargılardan hangisi çıkarılamaz?",
        options: [
          "Dinlendiğini hissetmek bireylerde güven duygusu yaratır.",
          "Pek çok insan konuşma sırasını beklemeyi dinlemek sanmaktadır.",
          "İletişim kanallarının artması insanların birbirini anlamasını her zaman artırmaz.",
          "En başarılı öğrenciler hiç konuşmadan sadece dinleyenlerdir."
        ],
        correct: 3
      }
    ]
  },
  {
    id: 15,
    title: "LGS Paragraf: Bilimsel Merak ve Başarı",
    category: "LGS Paragraf",
    icon: "🎯",
    level: 3,
    content: `Büyük bilimsel buluşların ve çığır açan teknolojilerin ardındaki temel itici güç, çoğu zaman dâhiyane bir zekâdan ziyade bitmek bilmeyen bir meraktır. Çocukluk döneminde hemen her bireyde var olan "Neden?" ve "Nasıl?" soruları, büyüme sürecinde çoğu zaman kaybolur veya körelir. Ancak Aziz Sancar'dan Marie Curie'ye, Isaac Newton'dan Nikola Tesla'ya kadar insanlığa yön veren bilim insanlarının ortak özelliği, içlerindeki bu çocuksu merakı ve sorgulama cesaretini ömür boyu diri tutmuş olmalarıdır. Hata yapmaktan korkmamak, başarısızlıkla sonuçlanan deneyleri birer yenilgi değil, gerçeğe atılan birer adım saymak bu merak duygusunun ayrılmaz bir parçasıdır. Nitekim Thomas Edison, ampulü bulana dek binlerce başarısız deneme yapmış ve her defasında "Yanılmadım, sadece çalışmayan bin yolu keşfettim." demiştir.`,
    questions: [
      {
        question: "Parçada geçen Edison'un sözüyle asıl vurgulanmak istenen nedir?",
        options: [
          "Hataların ve başarısızlıkların öğrenme sürecinin değerli bir parçası olduğu",
          "Elektrik enerjisinin çok zor şartlarda keşfedildiği",
          "Tek başına çalışan insanların daha az hata yaptığı",
          "Merak duygusunun sadece çocuklukta işe yaradığı"
        ],
        correct: 0
      },
      {
        question: "Metne göre insanlığa yön veren bilim insanlarının ortak yönü nedir?",
        options: [
          "Çok zengin ailelerden gelmeleri",
          "Sorgulama cesaretini ve çocuksu merakı ömür boyu korumaları",
          "Hiçbir deneyde başarısızlığa uğramamış olmaları",
          "Yalnızca fizik ve kimya alanlarında uzmanlaşmaları"
        ],
        correct: 1
      },
      {
        question: "Bu metne en uygun başlık hangisi olabilir?",
        options: [
          "Edison'un Hayat Hikâyesi",
          "Ampulün Keşif Süreci",
          "Keşiflerin Gizli Gücü: Bitmeyen Merak",
          "Çocukluk Çağı Sorunları"
        ],
        correct: 2
      }
    ]
  }
];

// Kalibrasyon testi için özel metin
const CALIBRATION_TEXT = {
  title: "Kalibrasyon Testi",
  content: `Kitap okumak, insanlığın en eski ve en değerli alışkanlıklarından biridir. Okuma, yalnızca bilgi edinme aracı değil, aynı zamanda hayal gücünü geliştiren, empati yeteneğini artıran ve eleştirel düşünmeyi güçlendiren bir etkinliktir. Araştırmalar, düzenli kitap okuyan çocukların kelime hazinesinin daha geniş olduğunu ve akademik başarılarının daha yüksek olduğunu göstermektedir. Okuma alışkanlığı küçük yaşlarda kazanıldığında ömür boyu sürer. Günde yalnızca yirmi dakika okuma bile yılda yaklaşık bir milyon sekiz yüz bin kelimeye denk gelir. Bu da yaklaşık on beş kitap demektir. Dijital çağda ekran başında geçirilen süre artsa da fiziksel kitap okumanın yerini hiçbir şey tutamaz. Kâğıt üzerinden okuma, ekrandan okumaya kıyasla anlama ve hatırlama düzeyini artırır. Bir kitabın sayfalarını çevirmek, metnin neresinde olduğumuzu hatırlamamıza yardımcı olan fiziksel bir deneyim sunar. Okuma hızını artırmak, daha fazla kitap okumayı mümkün kılar; ancak asıl önemli olan okuduğunu anlamaktır.`,
  questions: [
    {
      question: "Günde yirmi dakika okuma yılda yaklaşık kaç kelimeye denk gelir?",
      options: ["Beş yüz bin", "Bir milyon", "Bir milyon sekiz yüz bin", "İki milyon beş yüz bin"],
      correct: 2
    },
    {
      question: "Araştırmalara göre kâğıttan okuma ekrandan okumaya kıyasla neyi artırır?",
      options: ["Okuma hızını", "Anlama ve hatırlama düzeyini", "Kelime sayısını", "Sayfa çevirme hızını"],
      correct: 1
    },
    {
      question: "Metne göre okuma alışkanlığı ile ilgili hangisi doğrudur?",
      options: [
        "Yalnızca yetişkinlerde etkilidir",
        "Küçük yaşlarda kazanıldığında ömür boyu sürer",
        "Dijital çağda gereksiz hale gelmiştir",
        "Yalnızca akademik amaçla okunmalıdır"
      ],
      correct: 1
    }
  ]
};

// Rozetler
const BADGES = [
  { id: "first_read", name: "İlk Adım", icon: "🌟", description: "İlk okuma egzersizini tamamla", condition: (stats) => stats.totalExercises >= 1 },
  { id: "speed_5", name: "Hız Ustası", icon: "⚡", description: "5 egzersiz tamamla", condition: (stats) => stats.totalExercises >= 5 },
  { id: "speed_15", name: "Süper Okuyucu", icon: "🚀", description: "15 egzersiz tamamla", condition: (stats) => stats.totalExercises >= 15 },
  { id: "perfect_score", name: "Tam İsabet", icon: "🎯", description: "Bir testte tüm soruları doğru yanıtla", condition: (stats) => stats.hasPerfectScore },
  { id: "streak_3", name: "3 Gün Serisi", icon: "🔥", description: "3 gün üst üste egzersiz yap", condition: (stats) => stats.streak >= 3 },
  { id: "streak_7", name: "Haftalık Şampiyon", icon: "👑", description: "7 gün üst üste egzersiz yap", condition: (stats) => stats.streak >= 7 },
  { id: "comprehension_master", name: "Anlama Ustası", icon: "🧠", description: "Ortalama anlama oranı %90 üstü", condition: (stats) => stats.avgComprehension >= 90 },
  { id: "level_2", name: "Seviye 2", icon: "📗", description: "Seviye 2'ye ulaş", condition: (stats) => stats.level >= 2 },
  { id: "level_3", name: "Seviye 3", icon: "📘", description: "Seviye 3'e ulaş", condition: (stats) => stats.level >= 3 },
  { id: "all_modes", name: "Çok Yönlü", icon: "🎭", description: "Tüm egzersiz modlarını dene", condition: (stats) => stats.usedModes.size >= 3 },
  { id: "lgs_master", name: "LGS Paragraf Ustası", icon: "🏹", description: "Bir LGS paragraf testinde %100 yap", condition: (stats) => stats.hasLgsPerfect },
  { id: "bionic_explorer", name: "Deneysel Kaşif", icon: "🧪", description: "Biyonik Okuma modunu dene", condition: (stats) => stats.usedModes.has("bionic") },
  { id: "effective_150", name: "Etkili Okuyucu", icon: "💎", description: "Etkili okuma hızı 150 KDK üstü", condition: (stats) => stats.bestEffective >= 150 },
  { id: "effective_200", name: "Elmas Okuyucu", icon: "💠", description: "Etkili okuma hızı 200 KDK üstü", condition: (stats) => stats.bestEffective >= 200 },
  { id: "marathon_hero", name: "Maraton Şampiyonu", icon: "🥇", description: "LGS Paragraf Maratonunu tamamla", condition: (stats) => stats.marathonCompleted >= 1 },
  { id: "marathon_triple", name: "LGS Üçlemesi", icon: "🎖️", description: "3 farklı LGS Paragraf Denemesini tamamla", condition: (stats) => stats.marathonTripleCompleted },
  { id: "eye_gym_master", name: "Şahin Bakış", icon: "🦅", description: "Göz Isınma Salonunda 3 antrenman tamamla", condition: (stats) => stats.eyeGymCompleted >= 3 },
];

// Seviye sistemi
const LEVELS = [
  { level: 1, xpRequired: 0, name: "Çaylak Okuyucu", icon: "🌱" },
  { level: 2, xpRequired: 100, name: "Meraklı Okuyucu", icon: "📖" },
  { level: 3, xpRequired: 250, name: "Hızlı Okuyucu", icon: "⚡" },
  { level: 4, xpRequired: 500, name: "Uzman Okuyucu", icon: "🎓" },
  { level: 5, xpRequired: 800, name: "Usta Okuyucu", icon: "🏆" },
  { level: 6, xpRequired: 1200, name: "Efsane Okuyucu", icon: "👑" },
];

// Haftanın ipuçları
const TIPS = [
  "💡 Biliyor muydun? Okuma hızını artırmak için en etkili yöntem, düzenli pratik yapmaktır.",
  "💡 Gözlerini satır boyunca hareket ettirirken kelime gruplarını birlikte okumayı dene!",
  "💡 Okurken dudaklarını kıpırdatmamaya dikkat et, bu hızını düşürür.",
  "💡 Anlama olmadan hız anlamsızdır. Her zaman anladığından emin ol!",
  "💡 Kısa ama düzenli pratik, uzun ama düzensiz pratikten daha etkilidir.",
  "💡 Gözlerinin geri dönmesini (regresyon) azaltmak okuma hızını artırır.",
  "💡 Rahat bir ortamda, iyi aydınlatma altında okumak performansını artırır.",
  "💡 Her gün 15 dakika pratik yaparak okuma hızını ciddi şekilde geliştirebilirsin!",
  "💡 Metni okumadan önce başlığına bakıp ne hakkında olduğunu tahmin etmek anlamayı kolaylaştırır.",
  "💡 Düzenli uyku, öğrenme ve okuma performansı için çok önemlidir.",
];

// ============================================================
// LGS Paragraf Maratonu - Çoklu Deneme Kütüphanesi
// MEB 8. Sınıf LGS Türkçe Formatında 3 Özgün Deneme Sınavı
// ============================================================

const LGS_MARATHON_EXAMS = [
  {
    id: "exam-1",
    number: 1,
    title: "1. Deneme: Bilim, Teknoloji ve İnsan",
    shortTitle: "Bilim & Teknoloji",
    badge: "🤖 Bilim & Teknoloji",
    icon: "🔬",
    color: "#6C5CE7",
    description: "Yapay zekâ, Göbeklitepe, uzay araştırmaları, derin deniz biyolüminesansı ve mantık-muhakeme soruları.",
    questions: [
      {
        id: 1,
        type: "Ana Fikir",
        badge: "🎯 Ana Düşünce",
        title: "1. Soru: Yapay Zekâ ve İnsan Yaratıcılığı",
        passage: `Günümüzde yapay zekâ sistemleri saniyeler içinde binlerce görsel üretebilmekte, şiirler yazabilmekte ve besteler yapabilmektedir. Ancak bu üretimlerin ardında yatan süreç, gerçek bir duygu veya yaşantı değil; daha önce insanlar tarafından üretilmiş verilerin karmaşık algoritmalarla yeniden harmanlanmasıdır. Oysa bir sanat eserini değerli kılan şey, yalnızca kusursuz biçimi değil; sanatçının yaşadığı kederi, sevinci, umudu ve dünyaya özgü bakışını o esere sindirebilmesidir. Bir makine ne kadar gelişirse gelişsin, henüz kalbi kırılmamış ya da bir gün batımında nedensiz bir hüzün duymamıştır. Bu yüzden sanat, daima insanın kendi iç dünyasıyla kurduğu biricik köprü olarak kalacaktır.`,
        question: `Bu parçada asıl anlatılmak istenen düşünce aşağıdakilerden hangisidir?`,
        options: [
          "Teknoloji geliştikçe geleneksel sanat dalları önemini kaybedecektir.",
          "Yapay zekânın ürettiği eserler, sanatçılara yeni ilham kapıları açmaktadır.",
          "Gerçek sanat, algoritmaların değil ancak insani duygu ve yaşanmışlıkların ürünü olabilir.",
          "Bilgisayarların ürettiği sanat eserleri kusursuz bir estetik seviyeye ulaşmıştır."
        ],
        correct: 2,
        explanation: `Yazar metin boyunca yapay zekânın veri harmanladığını ancak duygu ve yaşantıya sahip olamayacağını vurgulamaktadır. 'Bu yüzden sanat, daima insanın kendi iç dünyasıyla kurduğu biricik köprü olarak kalacaktır' cümlesi de asıl düşüncenin C seçeneği olduğunu doğrudan destekler.`
      },
      {
        id: 2,
        type: "Yardımcı Fikir",
        badge: "🔍 Çıkarılamaz",
        title: "2. Soru: Göbeklitepe ve Tarihin Sıfır Noktası",
        passage: `Şanlıurfa yakınlarındaki Göbeklitepe, arkeoloji dünyasının yerleşik tarih anlayışını kökünden sarsmıştır. Bu keşiften önce bilim dünyası, insanların önce tarımı keşfedip köyler kurduğunu, ardından dini yapılar inşa ettiğini savunuyordu. Ancak Göbeklitepe'de bulunan ve günümüzden yaklaşık 12 bin yıl öncesine tarihlenen devasa 'T' biçimli sütunlar, henüz tarıma geçmemiş avcı-toplayıcı toplulukların bile tapınaklar inşa etmek amacıyla bir araya geldiklerini gösterdi. Üzerlerinde tilki, boğa, akrep gibi yabani hayvan kabartmaları bulunan bu sütunlar, o dönemin insanlarının gelişmiş bir sembolik düşünceye ve mimari uzmanlığa sahip olduğunu kanıtlamaktadır.`,
        question: `Bu parçadan Göbeklitepe ile ilgili olarak aşağıdakilerden hangisi ÇIKARILAMAZ?`,
        options: [
          "Arkeologların yerleşik tarih tezlerini yeniden gözden geçirmesini sağladığı",
          "Sütunların üzerinde dönemin yabani fauna ve hayvan figürlerinin yer aldığı",
          "Tapınakları inşa eden toplulukların ileri düzeyde tarım faaliyetleri yürüttüğü",
          "Günümüzden yaklaşık on iki bin yıl önceki avcı-toplayıcılar tarafından yapıldığı"
        ],
        correct: 2,
        explanation: `Metinde açıkça 'henüz tarıma geçmemiş avcı-toplayıcı toplulukların bile tapınaklar inşa etmek amacıyla bir araya geldikleri' belirtilmektedir. Dolayısıyla bu toplulukların 'ileri düzeyde tarım yürüttüğü' yargısı metne tamamen aykırıdır.`
      },
      {
        id: 3,
        type: "Akışı Bozan Cümle",
        badge: "✂️ Düşünce Akışı",
        title: "3. Soru: Sokak Oyunları ve Çocuk Gelişimi",
        passage: `(I) Geleneksel sokak oyunları, çocukların yalnızca fiziksel enerjilerini boşaltmalarını sağlamaz; aynı zamanda sosyal kuralları ve adalet kavramını yaşayarak öğrenmelerine aracı olur. (II) Saklambaç, körebe ya da mendil kapmaca oynayan çocuklar, yenilmeyi kabullenmeyi ve başkalarının haklarına saygı duymayı doğal yoldan deneyimler. (III) Günümüz video oyunları ise üst düzey grafik motorları ve sürükleyici senaryolarıyla milyonlarca oyuncuyu büyülemektedir. (IV) Oyun esnasında kendi aralarında kurdukları bu mikro toplum düzeni, çocuğun ileriki yaşlarda toplumsal yaşama uyum sağlamasını kolaylaştırır.`,
        question: `Bu parçada numaralanmış cümlelerden hangisi düşüncenin akışını bozmaktadır?`,
        options: ["I", "II", "III", "IV"],
        correct: 2,
        explanation: `Parçanın genelinde (I, II ve IV numaralı cümlelerde) geleneksel sokak oyunlarının çocukların sosyal, ahlaki ve psikolojik gelişimine katkıları anlatılmaktadır. III numaralı cümlede ise aniden günümüz video oyunlarının grafik ve senaryo özelliklerinden bahsedilerek akış bozulmuştur.`
      },
      {
        id: 4,
        type: "Mantık ve Muhakeme",
        badge: "🧩 Mantık - Sıralama",
        title: "4. Soru: Bilim Şenliği Proje Sunumları",
        passage: `Bir ortaokulun bilim şenliğinde Ali, Beren, Cemil ve Derya adlı dört öğrenci Robotik, Biyoloji, Çevre ve Uzay projelerini sırayla sunacaktır. Sunum sıralarıyla ilgili bilinenler şunlardır:\n• Biyoloji projesi, Uzay projesinden hemen önceki sırada sunulmuştur.\n• Ali'nin sunumu ne ilk ne de son sıradadır.\n• Beren, Robotik projesini sunmuştur ve bu sunum 4. (son) sıradadır.\n• Cemil'in projesi Ali'nin projesinden hemen öncedir.`,
        question: `Bu bilgilere göre 1. sırada hangi öğrenci hangi projeyi sunmuştur?`,
        options: [
          "Cemil - Biyoloji Projesi",
          "Ali - Çevre Projesi",
          "Cemil - Uzay Projesi",
          "Derya - Biyoloji Projesi"
        ],
        correct: 0,
        explanation: `Beren 4. sıradadır (Robotik). Ali ne ilk ne sondur ve Cemil Ali'den hemen öncedir, dolayısıyla Cemil 1. sırada, Ali 2. sırada olmak zorundadır (Derya 3. sıraya kalır). Biyoloji projesi Uzay'dan hemen önce olduğuna göre 1. ve 2. sıralar Biyoloji ve Uzay olmalıdır. Yani 1. sıradaki Cemil Biyoloji projesini sunmuştur.`
      },
      {
        id: 5,
        type: "Anlatım Teknikleri",
        badge: "🎨 Anlatım Biçimleri",
        title: "5. Soru: Karadeniz Yaylalarında Sabah",
        passage: `Günün ilk ışıkları, vadiyi saran pamuksu sis perdesini usulca yırtarak ladin ağaçlarının nemli dallarına düşüyordu. Uzaklardan deli bir derenin taşlara çarpan çılgın türküsü duyuluyor, çimenlerin üzerindeki çiğ damlaları minik elmaslar gibi parıldıyordu. Rüzgâr, kekik ve çam kokularını sırtlayıp yüzümüze serin bir selam bırakarak geçip gitti. Doğanın bu uyanışı karşısında insan, adeta bir mabetteymişçesine derin bir sükûnetle nefesini tutuyordu.`,
        question: `Bu parçanın anlatımında aşağıdakilerden hangisine BAŞVURULMAMIŞTIR?`,
        options: [
          "Benzetmeye (çiğ damlalarının elmaslara benzetilmesi)",
          "İşitsel ögelere (derenin sesinin betimlenmesi)",
          "Kişileştirmeye (rüzgârın selam bırakıp gitmesi)",
          "Sayısal verilerden yararlanmaya"
        ],
        correct: 3,
        explanation: `Metinde pamuksu sis / minik elmaslar (benzetme), derenin sesi (işitsel öge), rüzgarın selam bırakması / derenin türkü söylemesi (kişileştirme) yer almaktadır. Ancak hiçbir sayısal veri (istatistik/ölçüm) kullanılmamıştır.`
      },
      {
        id: 6,
        type: "Metin Karşılaştırma",
        badge: "⚖️ İki Metin Analizi",
        title: "6. Soru: Çöl ve Kutup Canlıları",
        passage: `1. Metin: Kutup ayıları, Kuzey Kutbu'nun dondurucu soğuklarında hayatta kalabilmek için derilerinin altında 10 cm kalınlığında bir yağ tabakası ve ısıyı hapseden şeffaf, içi boş tüylerle donatılmıştır. Geniş patileri ise karda batmadan yürümelerini sağlar.\n\n2. Metin: Sahra Çölü'nde yaşayan Fennek tilkisi, kavurucu sıcaklarda vücut ısısını tahliye edebilmek için vücuduna oranla olağanüstü büyüklükte kulaklara sahiptir. Ayrıca tüylü ayak tabanları, kızgın kumlarda yanmadan koşabilmesine imkân verir.`,
        question: `Bu iki metnin ORTAK yönü aşağıdakilerden hangisidir?`,
        options: [
          "Aynı coğrafi iklim kuşağındaki canlıları konu edinmeleri",
          "Canlıların zorlu çevre koşullarına uyum (adaptasyon) özelliklerini açıklamaları",
          "Nesli tükenme tehlikesi altında olan canlıları tanıtmaları",
          "İnsan faaliyetlerinin vahşi yaşama olumsuz etkilerine dikkat çekmeleri"
        ],
        correct: 1,
        explanation: `1. metin kutup ayısının soğuğa adaptasyonunu, 2. metin fennek tilkisinin çöl sıcağına adaptasyonunu anlatmaktadır. Her iki metin de canlıların zorlu doğa koşullarına geliştirdiği biyolojik uyumları (adaptasyonları) konu almaktadır.`
      },
      {
        id: 7,
        type: "Cümlede Anlam",
        badge: "🎯 Neden-Sonuç / Amaç",
        title: "7. Soru: Okyanuslardaki Plastik Adaları",
        passage: `Her yıl milyonlarca ton plastik atık akarsular yoluyla denizlere ulaşmaktadır. Bu atıklar, okyanus akıntılarıyla bir araya toplanarak devasa plastik adaları oluşturmaktadır. Deniz canlıları bu parlak ve renkli mikroplastikleri besin zannettikleri için midelerine doldurmakta ve ne yazık ki açlıktan hayatını kaybetmektedir. Bilim insanları bu ölümcül gidişatı durdurmak amacıyla biyolojik olarak çözünebilen yosun bazlı alternatif ambalajlar geliştirmek için gece gündüz çalışmaktadır.`,
        question: `Bu parçadaki altı çizili cümlelerin anlam ilişkisi aşağıdakilerin hangisinde sırasıyla doğru verilmiştir?`,
        options: [
          "1. Neden-Sonuç — 2. Amaç-Sonuç",
          "1. Amaç-Sonuç — 2. Koşul-Sonuç",
          "1. Koşul-Sonuç — 2. Neden-Sonuç",
          "1. Neden-Sonuç — 2. Karşılaştırma"
        ],
        correct: 0,
        explanation: `Deniz canlılarının atıkları besin zannetmesi bir 'NEDEN', midelerini bunlarla doldurup açlıktan ölmeleri bir 'SONUÇ'tur. Bilim insanlarının yosun bazlı alternatif üretme eylemi ise 'ölümcül gidişatı durdurmak' AMACINA yöneliktir. Dolayısıyla sıralama Neden-Sonuç ve Amaç-Sonuç'tur.`
      },
      {
        id: 8,
        type: "Sözcükte Anlam",
        badge: "📖 Deyim ve Mecaz",
        title: "8. Soru: Ustanın Nasihati",
        passage: `Eski bir bakır ustası, dükkânına yeni başlayan genç çırağına çekici uzatırken şöyle demişti: 'Evlat, bu meslekte acele eden kendi ayağına çelme takar. Bir tepsiye vururken göz nuru dökmeyi bileceksin. Müşterinin getirdiği eski bir cezveyi yabana atma; işini öyle bir yap ki herkes seni parmakla göstersin. İğneyle kuyu kazar gibi sabırlı olmazsan usta olamazsın.'`,
        question: `Ustanın çırağına verdiği öğütler arasında aşağıdaki deyimlerden hangisinin ifade ettiği anlam YOKTUR?`,
        options: [
          "Göz nuru dökmek (Büyük dikkat ve emek harcamak)",
          "Parmakla gösterilmek (Seçkin ve başarılı bulunmak)",
          "Yabana atmak (Önemsiz görüp dikkate almamak)",
          "Pireyi deve yapmak (Küçük bir olayı aşırı büyütmek)"
        ],
        correct: 3,
        explanation: `Parçada 'göz nuru dökmek' (emek vermek), 'yabana atmamak' (önemsiz görmemek), 'parmakla gösterilmek' (başarılı bulunmak) deyimleri doğrudan yer almaktadır. Ancak 'pireyi deve yapmak' deyimi ve anlamı metinde hiç geçmemektedir.`
      },
      {
        id: 9,
        type: "Bilimsel Paragraf",
        badge: "🧪 Bilim - Çıkarım",
        title: "9. Soru: Biyolüminesans (Işık Saçan Canlılar)",
        passage: `Güneş ışığının asla ulaşamadığı okyanusların zifiri karanlık derinliklerinde yaşayan pek çok canlı, kendi ışığını üretme yeteneğine sahiptir. Biyolüminesans adı verilen bu biyokimyasal reaksiyon, lüsiferin maddesinin oksijenle tepkimeye girmesiyle gerçekleşir. İşin büyüleyici yanı, bu ışığın neredeyse %100'ünün saf ışık olması, yani sıradan bir ampul gibi ısı enerjisi kaybetmemesidir. Derin deniz fener balığı bu ışığı avlarını kendine çekmek için bir yem olarak kullanırken; bazı karides türleri ise avcılarının gözünü aniden kamaştırıp kaçabilmek için parlak bir ışık bulutu püskürtür.`,
        question: `Bu parçaya göre canlıların biyolüminesans özelliğini kullanma amaçları arasında aşağıdakilerden hangisi GÖSTERİLEMEZ?`,
        options: [
          "Avlarını kendilerine doğru çekip tuzağa düşürmek",
          "Vücut sıcaklıklarını dondurucu sularda yüksek tutmak",
          "Düşmanlarının gözünü kamaştırarak tehlikelerden kaçmak",
          "Karanlık ortamda yaşamsal faaliyetlerini sürdürmek"
        ],
        correct: 1,
        explanation: `Metinde biyolüminesans ışığının neredeyse hiç ısı kaybetmediği, yani ısı üretmediği açıkça belirtilmektedir ('sıradan bir ampul gibi ısı enerjisi kaybetmez'). Dolayısıyla vücut sıcaklığını artırmak amacıyla kullanılamaz.`
      },
      {
        id: 10,
        type: "Eleştirel Okuma",
        badge: "💡 Yazarın Tutumu",
        title: "10. Soru: Nicelik mi Nitelik mi?",
        passage: `Günümüzde sosyal medyada sıkça karşılaşıyoruz: 'Bu ay tam 20 kitap bitirdim!', 'Hedefim yılda 250 kitap okumak!'. Ne yazık ki okuma eylemi de çağımızın hız ve tüketim çılgınlığına kurban edilmiş durumda. Bir kitabı hız trenine biner gibi alelacele tüketmek, sayfaları sadece gözle tarayıp geçmek marifet değildir. Önemli olan, bir kitabı bitirdiğinde o kitabın senin zihninde hangi yeni pencereleri açtığı, sana hangi yeni soruları sordurduğudur. Yavaş ve sindire sindire okunan tek bir klasik roman, yarış pistindeymiş gibi tüketilen elli kitaptan çok daha fazla dönüştürür insanı.`,
        question: `Bu parçanın yazarı aşağıdakilerden hangisini eleştirmektedir?`,
        options: [
          "Kitap fiyatlarının gençlerin bütçesini aşmasını",
          "Sosyal medyanın kitap tanıtımlarına yer vermemesini",
          "Okumanın anlama ve derinlikten uzaklaşıp salt sayısal bir yarışa dönüştürülmesini",
          "Klasik romanların günümüz gençleri tarafından zor anlaşılmasını"
        ],
        correct: 2,
        explanation: `Yazar 'okuma eyleminin hız ve tüketim çılgınlığına kurban edildiğini', 'marifetin sayfa adedi değil zihinde açılan pencereler olduğunu' belirterek okumanın niceliksel/sayısal bir yarışa çevrilmesini eleştirmektedir.`
      }
    ]
  },
  {
    id: "exam-2",
    number: 2,
    title: "2. Deneme: Doğa, Ekoloji ve Yaşam Bilimleri",
    shortTitle: "Doğa & Ekoloji",
    badge: "🌿 Doğa & Yaşam",
    icon: "🌱",
    color: "#10B981",
    description: "Orman iletişim ağları, iklim değişikliği, biyoçeşitlilik, mikroplastikler ve ekolojik tarım odaklı 10 MEB yeni nesil soru.",
    questions: [
      {
        id: 1,
        type: "Ana Fikir",
        badge: "🎯 Ana Düşünce",
        title: "1. Soru: Ormanların Yeraltı Ağı (Miçelyum)",
        passage: `Ormanlardaki mantar ağları (miçelyum), ağaçların birbirleriyle besin ve bilgi paylaşmasını sağlayan yeraltı bir internet hattı gibidir. Bir ağaç böcek saldırısına uğradığında bu ağ üzerinden komşu ağaçlara kimyasal sinyaller göndererek onların savunma mekanizmalarını harekete geçirir. Hatta genç ve gölgede kalmış fidanlara, yaşlı ana ağaçlar bu mantar köprüleri sayesinde şeker ve su aktarır. Doğa bize rekabetten ziyade, dayanışma ve ortak yaşamın hayatta kalmanın asıl anahtarı olduğunu fısıldamaktadır.`,
        question: `Bu parçada asıl anlatılmak istenen düşünce aşağıdakilerden hangisidir?`,
        options: [
          "Ağaçlar böcek saldırılarına karşı tek başlarına savunmasızdır.",
          "Orman ekosisteminde mantarlar, ağaçlardan daha baskın bir role sahiptir.",
          "Doğada hayatta kalmanın ve dengenin temeli, canlılar arasındaki rekabet değil iş birliği ve dayanışmadır.",
          "Genç fidanların büyümesi yalnızca güneş ışığı miktarına bağlıdır."
        ],
        correct: 2,
        explanation: `Yazar metin boyunca mantar ağlarının ağaçlar arasında yardımlaşma sağladığını anlatmış ve son cümlede 'Doğa bize rekabetten ziyade, dayanışma ve ortak yaşamın hayatta kalmanın asıl anahtarı olduğunu fısıldamaktadır' diyerek ana fikri doğrudan özetlemiştir.`
      },
      {
        id: 2,
        type: "Yardımcı Fikir",
        badge: "🔍 Çıkarılamaz",
        title: "2. Soru: Kutup Ayıları ve İklim Değişimi",
        passage: `Arktik bölgesinin simgesi olan kutup ayıları, yaşamlarını deniz buzullarına bağımlı olarak sürdürürler. Deniz buzu, onların fokları avlayabildikleri tek av sahasıdır. Ancak küresel sıcaklık artışı sebebiyle buzulların her yıl daha erken erimesi ve kışın daha geç donması, kutup ayılarının avlanma sürelerini ciddi şekilde kısıtlamaktadır. Aç kalan ayılar karaya çıkmak zorunda kalmakta, enerjilerini korumak için metabolizmalarını yavaşlatmaktadır. Bilim insanları, buzulların bu hızla erimesi durumunda yüzyılın sonuna kadar kutup ayısı popülasyonunun büyük ölçüde yok olabileceği uyarısında bulunmaktadır.`,
        question: `Bu parçadan kutup ayılarıyla ilgili aşağıdakilerden hangisi ÇIKARILAMAZ?`,
        options: [
          "Avlanma alanlarının büyük oranda deniz buzullarıyla sınırlı olduğu",
          "Buzulların erime takvimindeki değişimin beslenmelerini olumsuz etkilediği",
          "Karaya çıktıklarında enerji tasarrufu yapmak amacıyla metabolizmalarını yavaşlattıkları",
          "Sıcak iklim şartlarına uyum sağlayarak karasal hayvanları avlamayı öğrendikleri"
        ],
        correct: 3,
        explanation: `Parçada kutup ayılarının karaya çıktıklarında metabolizmalarını yavaşlattıkları ve aç kaldıkları belirtilmiş; karasal hayvanları avlamayı öğrendiklerine veya sıcak iklime uyum sağladıklarına dair hiçbir bilgi verilmemiştir.`
      },
      {
        id: 3,
        type: "Akışı Bozan Cümle",
        badge: "✂️ Düşünce Akışı",
        title: "3. Soru: Çöl Bitkilerinin Su Depolama Sırrı",
        passage: `(I) Çöl bitkileri, aşırı kurak ve sıcak ortamlarda hayatta kalabilmek için olağanüstü su depolama teknikleri geliştirmiştir. (II) Örneğin kaktüsler, yapraklarını dikene dönüştürerek terleme yoluyla kaybedilen su miktarını neredeyse sıfıra indirir. (III) Kalın ve etli gövdeleri ise nadir görülen yağmur dönemlerinde tonlarca suyu hızla emip depolayabilir. (IV) Kaktüsler son yıllarda ev ve ofis dekorasyonunda popüler birer süs bitkisi haline gelmiştir. (V) Ayrıca toprağın hemen altında metrelerce yana uzanan sığ kök sistemleri, en ufak çiy damlasını bile toplayabilecek hassasiyettedir.`,
        question: `Bu parçadaki numaralanmış cümlelerden hangisi düşüncenin akışını bozmaktadır?`,
        options: ["II", "III", "IV", "V"],
        correct: 2,
        explanation: `Metnin I, II, III ve V numaralı cümlelerinde çöl bitkilerinin (kaktüslerin) çölde su depolama ve hayatta kalma biyolojik adaptasyonları anlatılırken; IV numaralı cümlede ev dekorasyonu ve süs bitkisi olmalarından bahsedilerek konunun dışına çıkılmıştır.`
      },
      {
        id: 4,
        type: "Mantık ve Muhakeme",
        badge: "🧩 Mantık - Sıralama",
        title: "4. Soru: Ekolojik Çiftlik Ekim Planı",
        passage: `Bir ekolojik tarım okulunda Eren, Derya, Kaan ve Melis adlı 4 öğrenci; Domates, Biber, Çilek ve Fasulye parsellerini yan yana dizili 1, 2, 3 ve 4 numaralı alanlara ekeceklerdir.\nBilinenler şunlardır:\n• Çilek parseli, 1 numaralı alandadır.\n• Derya fasulye ekmiştir ve alanı Eren'in alanının hemen sağındadır.\n• Eren'in ektiği ürün domatestir ve alanı çift numaralı değildir.\n• Melis biber ekmemiştir.`,
        question: `Bu bilgilere göre 4 numaralı alana hangi öğrenci, hangi ürünü ekmiştir?`,
        options: [
          "Kaan - Biber",
          "Melis - Çilek",
          "Derya - Fasulye",
          "Eren - Domates"
        ],
        correct: 2,
        explanation: `Çilek 1 numaradadır. Eren tek numaralı alana domates ekmiş ve 1 dolu olduğuna göre Eren 3 numaralı alandadır. Derya fasulyeyi Eren'in hemen sağına (4 numaraya) ekmiştir. Melis çileği (1) ekmiştir; geriye kalan Kaan ise biberi (2) ekmiştir. Dolayısıyla 4 numaralı alana Derya fasulye ekmiştir.`
      },
      {
        id: 5,
        type: "Paragraf Bölme",
        badge: "📑 İki Paragrafa Bölme",
        title: "5. Soru: Mercan Resifleri ve Tehditler",
        passage: `(I) Mercan resifleri, okyanus tabanının yalnızca yüzde birini kaplamasına rağmen denizlerdeki tüm canlı türlerinin dörtte birine yuva sağlar. (II) Bu rengârenk su altı cennetleri, fırtınalarda kıyı şeritlerini dev dalgalardan koruyan doğal birer dalgakırandır. (III) Ancak son yıllarda artan deniz suyu sıcaklıkları, mercanların dokularındaki fotosentetik algleri dışarı atarak beyazlaşmasına ve ölmesine sebep olmaktadır. (IV) Bilim insanları, bu ölümcül beyazlaşma sürecini durdurabilmek için sıcaklığa dayanıklı 'süper mercan' kolonileri yetiştirme projeleri başlatmıştır. (V) Ayrıca yapay resifler suya batırılarak deniz canlılarının tutunabileceği yeni yapay yaşam alanları oluşturulmaktadır.`,
        question: `Bu parça iki paragrafa bölünmek istense ikinci paragraf hangi cümleyle başlar?`,
        options: ["II", "III", "IV", "V"],
        correct: 1,
        explanation: `I ve II numaralı cümlelerde mercan resiflerinin doğal ekosistemdeki önemi ve işlevleri anlatılırken; III numaralı cümleden itibaren küresel ısınmanın getirdiği tehdit ve beyazlaşma sorunu ele alınmaya başlanmıştır. Dolayısıyla ikinci paragraf III ile başlar.`
      },
      {
        id: 6,
        type: "Metin Tamamlama",
        badge: "🔗 Anlam Akışı",
        title: "6. Soru: Tozlaşma ve Arıların Önemi",
        passage: `Arılar yalnızca bal üreticisi değildir; dünyadaki tarımsal gıdaların üçte birinin tozlaşmasını sağlayarak sofralarımıza ulaşmasını mümkün kılan gizli kahramanlardır. Eğer arı popülasyonları pestisitler ve habitat kaybı yüzünden yok olursa elma, badem, domates gibi yüzlerce meyve ve sebze türü tozlaşamaz. ----. Çünkü ekosistemdeki tek bir halkayı kopardığınızda, zincirin tamamı sarsılmaya mahkûmdur.`,
        question: `Bu parçada boş bırakılan yere düşüncenin akışına göre aşağıdakilerden hangisi getirilmelidir?`,
        options: [
          "Bu durum yalnızca arıcıların ekonomik kazancını azaltacaktır",
          "Böylece hem küresel bir besin krizi doğacak hem de binlerce bitki türünün nesli tükenecektir",
          "Doğadaki tozlaşma açığını yapay gübrelerle kapatmak oldukça kolay olacaktır",
          "Oysa arıların sayısındaki düşüşün insan sağlığına doğrudan bir etkisi bulunmamaktadır"
        ],
        correct: 1,
        explanation: `Boşluktan önceki cümlede tozlaşmanın durması durumunda gıdaların yetişemeyeceği, boşluktan sonra da tüm ekosistem zincirinin sarsılacağı vurgulanmıştır. B seçeneğindeki 'küresel besin krizi ve bitkilerin neslinin tükenmesi' bu iki yargı arasındaki mantıksal nedensel bağı eksiksiz tamamlar.`
      },
      {
        id: 7,
        type: "Anlatım Teknikleri",
        badge: "🎨 Anlatım Biçimleri",
        title: "7. Soru: Kuşların Sonbahar Göçü",
        passage: `Gökyüzünde binlerce leylek, sanki görünmez bir orkestra şefinin işaretini beklercesine devasa spiraller çizerek yükseliyordu. Kanatlarının altından süzülen ılık termal hava akımları, onları kanat çırpmadan kilometrelerce yükseğe, bulutların koynuna taşıyordu. Aşağıda kalan nehir gümüş bir şerit gibi kıvrılıyor; sarı, turuncu ve kızıl tonlara bürünen sonbahar ormanı ise rüzgârla dalgalanan dev bir halıyı andırıyordu. Bu yolculuk, kışın dondurucu pençesinden sıyrılıp güneyin güneşine kavuşmak için verilen destansı bir savaştı.`,
        question: `Bu parçanın anlatımında aşağıdakilerden hangisine BAŞVURULMAMIŞTIR?`,
        options: [
          "Benzetmeye",
          "Görme duyusuna ait ayrıntılara",
          "Kişileştirmeye",
          "Sayısal verilerden yararlanmaya"
        ],
        correct: 3,
        explanation: `Parçada 'görünmez orkestra şefi gibi', 'gümüş bir şerit gibi', 'dev bir halıyı andırıyordu' (benzetme); 'bulutların koynu', 'kışın pençesi' (kişileştirme); renkler ve uçuş tasviri (görme duyusu) vardır. Ancak istatistiki veya ölçülebilir sayısal verilerden yararlanılmamıştır.`
      },
      {
        id: 8,
        type: "Eleştirel Okuma",
        badge: "🎯 Neden-Sonuç",
        title: "8. Soru: Görünmez Tehdit: Mikroplastikler",
        passage: `Günümüzde üretilen plastiklerin yalnızca yüzde dokuzu geri dönüştürülebilmektedir. Geriye kalan milyonlarca ton plastik; okyanuslara, nehirlere ve toprağa karışarak zamanla güneş ışığı ve dalgaların etkisiyle 5 milimetreden küçük mikroplastik parçacıklarına ayrışmaktadır. Bu gözle görülemeyecek kadar ufak parçacıklar, planktonlardan balıklara, oradan da soframıza gelen deniz ürünlerine ve içme sularına kadar sızmaktadır. Bizler plastik kirliliğini sadece kıyılara vuran çöp yığınları sandığımız sürece, her gün kendi bedenimize görünmez bir kimyasal yük depolamaya devam edeceğiz.`,
        question: `Bu parçaya göre mikroplastik tehlikesinin en kritik sonucu aşağıdakilerden hangisidir?`,
        options: [
          "Sahillerdeki turizm faaliyetlerini sekteye uğratması",
          "Besin zincirine sızarak doğrudan insan sağlığını ve sofrasını tehdit etmesi",
          "Geri dönüşüm tesislerinin maliyetlerini aşırı artırması",
          "Okyanuslardaki dalga hareketlerini olumsuz yönde etkilemesi"
        ],
        correct: 1,
        explanation: `Yazar, mikroplastiklerin en tehlikeli yönünün deniz canlılarından sofralarımıza ve içme sularımıza kadar besin zincirine sızması ve kendi bedenimize girmesi olduğunu vurgulamaktadır.`
      },
      {
        id: 9,
        type: "Sözcükte Anlam",
        badge: "📖 Deyim ve Mecaz",
        title: "9. Soru: Sulak Alanların Can Damarı",
        passage: `Sulak alanlar, göçmen kuşların dinlenme istasyonu ve yer altı sularının doğal filtresidir. Bir bölgedeki bataklık veya sazlık alanı kurutup tarım arazisine çevirmek, ilk bakışta karlı bir adım gibi görünse de aslında o bölgenin ekolojik dengesinin 'can damarını kesmek' anlamına gelir. Çünkü yer altı suları çekilince verimli topraklar kısa sürede çölleşir ve telafisi imkânsız kuraklıklar başlar.`,
        question: `Bu parçada geçen 'can damarını kesmek' sözüyle anlatılmak istenen aşağıdakilerden hangisidir?`,
        options: [
          "Canlıların besin bulmasını kolaylaştırmak",
          "Bir sistemin varlığını sürdürmesi için en hayati unsuru yok etmek",
          "Ekonomik açıdan büyük gelir kaynakları oluşturmak",
          "Doğal alanları koruma altına almak"
        ],
        correct: 1,
        explanation: `'Can damarı', bir varlığın yaşaması veya bir işin yürümesi için en hayati, en vazgeçilmez noktadır. Can damarını kesmek ise o hayati desteği ortadan kaldırmak, yok etmek demektir.`
      },
      {
        id: 10,
        type: "Karşılaştırma",
        badge: "⚖️ İki Yöntem Karşılaştırması",
        title: "10. Soru: Organik ve Endüstriyel Tarım",
        passage: `Endüstriyel tarım, kimyasal gübre ve tarım ilaçlarıyla kısa vadede dönüm başına çok yüksek ürün miktarı vadeder; ne var ki bu yöntem birkaç on yıl içinde toprağın organik yapısını öldürüp onu verimsiz bir kum yığınına çevirir. Organik tarım ise kimyasallardan arındırılmış, biyolojik döngülere saygılı bir üretim modelidir; ilk yıllarda ürün miktarı endüstriyel tarıma kıyasla daha az olsa da toprağı canlı tutarak gelecek nesillerin de gıda üretebilmesini teminat altına alır. Biri bugünün kârı için yarını ipotek altına alırken, diğeri geleceği korumak adına bugünden sabır ve emek talep eder.`,
        question: `Bu parçada organik tarım ile endüstriyel tarımın karşılaştırılmasında öne çıkan temel fark nedir?`,
        options: [
          "Çiftçilerin eğitim düzeylerine göre belirlenmeleri",
          "Biri kısa vadeli yüksek kazanca odaklanırken diğerinin uzun vadeli toprak sürdürülebilirliğini hedeflemesi",
          "Kullanılan tarım aletlerinin teknolojik donanımı",
          "Üretilen ürünlerin sadece yerel pazarlarda satılması"
        ],
        correct: 1,
        explanation: `Metnin son cümlesinde 'Biri bugünün kârı için yarını ipotek altına alırken (endüstriyel), diğeri geleceği korumak adına bugünden sabır ve emek talep eder (organik)' ifadesiyle temel farkın kısa vadeli yüksek kazanç ile uzun vadeli sürdürülebilirlik olduğu açıkça belirtilmiştir.`
      }
    ]
  },
  {
    id: "exam-3",
    number: 3,
    title: "3. Deneme: Sanat, Dil ve Kültür Mirası",
    shortTitle: "Sanat & Kültür",
    badge: "🏛️ Kültür & Sanat",
    icon: "🎨",
    color: "#F59E0B",
    description: "Mimar Sinan, ebru sanatı, deyimlerin kökeni, müzik-beyin ilişkisi ve edebiyat odaklı 10 seçkin paragraf sorusu.",
    questions: [
      {
        id: 1,
        type: "Ana Fikir",
        badge: "🎯 Ana Düşünce",
        title: "1. Soru: Mimar Sinan ve Süleymaniye Akustiği",
        passage: `Mimar Sinan, Süleymaniye Camii'ni inşa ederken kubbenin içine farklı boyutlarda 64 adet boş küp yerleştirmiş ve bu küplerin ağızlarını caminin içine doğru açmıştır. Amacı, imamın sesinin hiçbir elektronik yükselticiye ihtiyaç duymadan binlerce cemaatin bulunduğu en ücra köşelere bile aynı berraklıkta ulaşmasını sağlamaktı. Dahası, yüzlerce kandilden çıkan dumanın cami duvarlarını kirletmesini engellemek için kurduğu hava akımı kanallarıyla isi tek bir noktada toplamış ve bu isten dönemin en kaliteli hattat mürekkebini ürettirmiştir. Sinan'ın mimarlığı, yalnızca taş ve harcın birleşimi değil; fizik, akustik ve çevre bilincinin estetikle yoğrulduğu eşsiz bir dehadır.`,
        question: `Bu parçada Mimar Sinan ile ilgili olarak asıl anlatılmak istenen nedir?`,
        options: [
          "Osmanlı döneminde inşa edilen camilerin dünya çapında taklit edildiği",
          "Dehasının yalnızca mimari biçimle sınırlı kalmayıp bilimi, akustiği ve işlevselliği sanata dönüştürdüğü",
          "Kandil isinden üretilen mürekkeplerin diğer mürekkeplerden daha dayanıklı olduğu",
          "Süleymaniye Camii'nin inşaatının beklenenden çok daha uzun sürdüğü"
        ],
        correct: 1,
        explanation: `Parçanın ana fikri, Sinan'ın mimarlığının sadece taş yapılar inşa etmek değil; akustik, hava akımı, malzeme geri dönüşümü gibi bilimsel ilkeleri estetik ve işlevsellikle birleştiren üstün bir deha olduğudur (B seçeneği).`
      },
      {
        id: 2,
        type: "Yardımcı Fikir",
        badge: "🔍 Çıkarılamaz",
        title: "2. Soru: Ebru Sanatı: Su Üstünde Sabır",
        passage: `Ebru sanatı, kitre adı verilen bitkisel bir zamkla yoğunlaştırılmış suyun üzerine, sığır ödü karıştırılmış doğal toprak boyaların serpilmesi ve bu desenlerin kâğıda aktarılmasıyla icra edilir. Öd suyu, boyaların birbirine karışmadan su yüzeyinde yüzmesini ve yayılmasını sağlar. Ebru ustası asla acele edemez; her boya damlasının suyla kurduğu temas, o günkü odanın sıcaklığına, neme ve ustanın o anki ruh haline göre farklı bir biçim alır. Bu yönüyle ebru, sanatçının malzemeye tamamen hükmettiği bir alan değil; suyun ve doğanın diline saygı duyarak onunla uyum içinde ürettiği bir sabır yolculuğudur.`,
        question: `Bu parçadan ebru sanatı ile ilgili olarak aşağıdakilerden hangisi ÇIKARILAMAZ?`,
        options: [
          "Yapımında doğal bileşenlerin ve hayvansal katkıların (öd suyu) kullanıldığı",
          "Desenlerin oluşumunda ortam koşullarının ve sanatçının duygu durumunun etkili olduğu",
          "Suyun yoğunluğunu artırmak için kimyasal yapıştırıcıların tercih edildiği",
          "Sanatçının suyla bir güç mücadelesine girmek yerine doğayla uyum sağladığı"
        ],
        correct: 2,
        explanation: `Metinde suyun yoğunlaştırılması için 'kitre adı verilen bitkisel bir zamk' kullanıldığı yazmaktadır. Kimyasal yapıştırıcıların kullanıldığı bilgisi yanlıştır ve çıkarılamaz.`
      },
      {
        id: 3,
        type: "Akışı Bozan Cümle",
        badge: "✂️ Düşünce Akışı",
        title: "3. Soru: Masalların Çocuk Ruhuna Katkısı",
        passage: `(I) Masallar, çocukların yalnızca uykuya dalmasını sağlayan basit anlatılar değil; onların zihinsel ve ahlaki gelişimini besleyen kadim kaynaklardır. (II) Masallardaki iyi-kötü, cesaret-korkaklık çatışmaları sayesinde çocuklar, gerçek hayattaki soyut kavramları somutlaştırarak öğrenirler. (III) Kahramanın zorluklar karşısında pes etmeyip mücadele etmesi, çocuğun problem çözme becerisine ve özgüvenine doğrudan katkı sunar. (IV) Son yıllarda çocuklara yönelik animasyon filmler sinema sektöründe milyarlarca dolarlık devasa bir bütçeye ulaşmıştır. (V) Dolayısıyla masal dinleyerek veya okuyarak büyüyen bir çocuğun empati yeteneği çok daha güçlü gelişir.`,
        question: `Bu parçadaki numaralanmış cümlelerden hangisi düşüncenin akışını bozmaktadır?`,
        options: ["II", "III", "IV", "V"],
        correct: 2,
        explanation: `Parçanın tamamında masalların çocuğun zihinsel, ahlaki gelişimi, empati ve problem çözme becerisine katkısı işlenirken; IV numaralı cümlede sinema sektöründeki animasyon film bütçelerinden söz edilerek konunun akışı bozulmuştur.`
      },
      {
        id: 4,
        type: "Mantık ve Muhakeme",
        badge: "🧩 Mantık - Sıralama",
        title: "4. Soru: Kitap Günleri Söyleşi Takvimi",
        passage: `Bir ortaokulda düzenlenen Kitap Günleri kapsamında Ahmet, Berna, Ceyda ve Deniz adlı dört yazar; Perşembe, Cuma, Cumartesi ve Pazar günlerinde birer söyleşi yapacaklardır.\nBilinenler şunlardır:\n• Hafta içi günlerde (Perşembe ve Cuma) yalnızca erkek yazarlar söyleşi yapmıştır.\n• Berna'nın söyleşisi Pazar günü değildir.\n• Ahmet, söyleşisini ilk gün yapmamıştır.`,
        question: `Bu bilgilere göre Cumartesi günü söyleşi yapan yazar kesinlikle kimdir?`,
        options: [
          "Ceyda",
          "Berna",
          "Ahmet",
          "Deniz"
        ],
        correct: 1,
        explanation: `Erkek yazarlar Ahmet ve Deniz'dir. Hafta içi (Perşembe ve Cuma) erkekler söyleşi yapmıştır. Ahmet ilk gün (Perşembe) yapmadığına göre Cuma günü yapmıştır; bu durumda Deniz Perşembe günü yapmıştır. Hafta sonu (Cumartesi ve Pazar) kadın yazarlar Berna ve Ceyda kalır. Berna Pazar günü yapmadığına göre Berna kesinlikle Cumartesi günü yapmıştır (Ceyda ise Pazar).`
      },
      {
        id: 5,
        type: "Paragraf Bölme",
        badge: "📑 İki Paragrafa Bölme",
        title: "5. Soru: Türkçede Deyimlerin Zenginliği",
        passage: `(I) Türkçede deyimler, anlatımı renklendiren ve duygu dünyamızı en kestirme yoldan ifade eden dil incileridir. (II) 'Göze girmek', 'eteğindeki taşları dökmek' veya 'küplere binmek' gibi kalıplaşmış sözler, birkaç kelimeyle sayfalar dolusu ruh halini aktarabilir. (III) Deyimlerin birçoğunun kökeni, geçmiş yüzyıllardaki geleneksel mesleklerin çalışma ortamlarına dayanmaktadır. (IV) Örneğin 'pabucu dama atılmak' deyimi, Ahilik teşkilatında kusurlu mal üreten ayakkabıcı esnafının dükkân çatısına ayakkabısının atılması cezasından doğmuştur. (V) Benzer şekilde 'çizmeyi aşmak' deyimi de dericilik ve kunduracılık zanaatında çırakların haddini bilmesi kuralından dilimize miras kalmıştır.`,
        question: `Bu parça iki paragrafa bölünmek istense ikinci paragraf hangi cümleyle başlar?`,
        options: ["II", "III", "IV", "V"],
        correct: 1,
        explanation: `I ve II numaralı cümlelerde deyimlerin Türkçe anlatımındaki canlılık ve mecaz gücü ele alınırken; III numaralı cümleden itibaren deyimlerin tarihsel kökenleri ve Ahilik teşkilatı zanaat geleneğine dayanan çıkış hikâyeleri anlatılmaya başlanmıştır. Dolayısıyla ikinci paragraf III ile başlar.`
      },
      {
        id: 6,
        type: "Metin Tamamlama",
        badge: "🔗 Anlam Akışı",
        title: "6. Soru: Müzik Eğitimi ve Zihinsel Gelişim",
        passage: `Bir müzik aleti çalmak, beynimiz için eksiksiz bir jimnastik salonu işlevi görür. Notaları okurken görme merkezi, sesleri ayırt ederken işitme merkezi, parmakları tuşlara veya tellere basarken ise motor beceri merkezi aynı anda uyarılır. Nörobilimciler, düzenli enstrüman çalan bireylerin beynin sağ ve sol lobları arasındaki iletişimi sağlayan 'korpus kallozum' köprüsünün belirgin şekilde kalınlaştığını tespit etmiştir. ----. Bu nedenle müzikle uğraşan çocukların problem çözme, dil öğrenme ve matematiksel düşünme becerileri yaşıtlarına kıyasla çok daha hızlı gelişir.`,
        question: `Bu parçada boş bırakılan yere düşüncenin akışına göre aşağıdakilerden hangisi getirilmelidir?`,
        options: [
          "Bu durum, iki lob arasındaki veri akışını ve bağlantı hızını olağanüstü biçimde artırır",
          "Oysa sadece klasik müzik dinlemek beyin gelişiminde hiçbir rol oynamaz",
          "Fakat enstrüman eğitimi akademik başarıyı olumsuz etkileyebilmektedir",
          "Ne var ki nota öğrenmek çocuklarda dikkat dağınıklığına yol açabilir"
        ],
        correct: 0,
        explanation: `Boşluktan önce korpus kallozum köprüsünün kalınlaştığı, boşluktan sonra da problem çözme ve matematiksel becerilerin hızla geliştiği söylenmektedir. A seçeneğindeki 'iki lob arasındaki veri akışını ve bağlantı hızını olağanüstü artırır' cümlesi bu biyolojik sebep-sonuç ilişkisini kusursuz şekilde bağlar.`
      },
      {
        id: 7,
        type: "Anlatım Teknikleri",
        badge: "🎨 Anlatım Biçimleri",
        title: "7. Soru: Kapalıçarşı'da Zamana Direnen Bakırcı",
        passage: `Tarihi Kapalıçarşı'nın loş kemerleri altında, çekiç sesleri yüzyıllık bir ezgi gibi yankılanıyordu. Bakır ustası Salih Efendi, nasırlı elleriyle tuttuğu keskisiyle bakır tepsiye lale motifleri işlerken zaman adeta durmuştu. Ocakta pişen odun kömürünün isli kokusu, taze demlenmiş kakuleli kahve rayihasına karışıyordu. Köşedeki pirinç lambaların sarımtırak ışığı, ustanın alnındaki ter damlalarını kristal birer boncuk gibi parlatıyordu. Burada teknolojiye inat sabır, aceleye inat emek konuşuyordu.`,
        question: `Bu parçanın anlatımında aşağıdakilerden hangisi AĞIRLIKLIDIR?`,
        options: [
          "Tartışmacı anlatım",
          "Betimleyici ve öyküleyici anlatım",
          "Sayısal verilerden yararlanma",
          "Tanımlama"
        ],
        correct: 1,
        explanation: `Metinde bir olay anı (Salih ustanın çalışması) hikâyeleştirilerek sunulmuş (öyküleme); sesler, kokular, ışıklar ve renkler adeta zihinde bir tablo gibi canlandırılmıştır (betimleme). Dolayısıyla betimleyici ve öyküleyici anlatım ağırlıktadır.`
      },
      {
        id: 8,
        type: "Eleştirel Okuma",
        badge: "💡 Yazarın Amacı",
        title: "8. Soru: Dijital Çağda Mektubun Ruhu",
        passage: `Cep telefonundan saniyeler içinde gönderilen emojili, kısaltmalı iletiler çağında yaşıyoruz. Bir düğmeye basıyor, muhatabımıza ulaşıyoruz. Ancak bu hız, iletişimin ruhunu ve derinliğini de beraberinde götürdü. Oysa eskiden bir mektup yazılırken kâğıt özenle seçilir, mürekkep damlamasın diye dikkat edilir, günlerce posta yolu gözlenirdi. O bekleme sürecinin kendisi bile karşı tarafa verilen değerin ve sevginin göstergesiydi. Bugün birbirimize hiç olmadığımız kadar yakınız ama ruhlarımız belki de tarihin hiçbir döneminde bu kadar kopuk olmamıştı.`,
        question: `Bu parçanın yazarı aşağıdakilerden hangisini vurgulamak istemektedir?`,
        options: [
          "Posta idarelerinin çalışma hızının artırılması gerektiğini",
          "Dijital hızın iletişimi kolaylaştırırken insan ilişkilerindeki samimiyeti ve derinliği tükettiğini",
          "El yazısının günümüzde artık geçerliliğini yitirdiğini",
          "Kısa mesajların mektuptan daha ekonomik olduğunu"
        ],
        correct: 1,
        explanation: `Yazar, anlık dijital hızın mektuptaki özen ve sabrı yok ettiğini belirterek 'birbirimize hiç olmadığımız kadar yakınız ama ruhlarımız hiç bu kadar kopuk olmamıştı' sözüyle dijital hızın samimiyet ve derinliği tükettiğini vurgulamaktadır.`
      },
      {
        id: 9,
        type: "Sözcükte Anlam",
        badge: "📖 Deyim ve Mecaz",
        title: "9. Soru: Zamanın Eleğinden Geçmek",
        passage: `Bir edebiyat eserinin gerçek kıymeti, yayımlandığı gün gördüğü alkışlarla veya satış rekorlarıyla ölçülmez. Nice çok satan roman vardır ki bir yıl sonra adları bile anılmaz. Gerçek başyapıtlar, 'zamanın eleğinden geçerek' yüzyıllar sonrasının okuruna da hitap edebilen, insanoğlunun evrensel dertlerini her çağda yeniden konuşturabilen eserlerdir.`,
        question: `Bu parçada geçen 'zamanın eleğinden geçmek' sözüyle anlatılmak istenen nedir?`,
        options: [
          "Eserin kısa sürede binlerce baskı yapması",
          "Zamana meydan okuyarak değerini kaybetmeden kalıcılığını korumak",
          "Dönemin popüler konularına odaklanmak",
          "Yaşlı ve deneyimli yazarlar tarafından yazılmak"
        ],
        correct: 1,
        explanation: `'Elekten geçmek' elenip sağlam olanların kalmasıdır; 'zamanın eleğinden geçmek' ise üzerinden yıllar, asırlar geçmesine rağmen unutulmamak, değerini ve kalıcılığını koruyabilmektir.`
      },
      {
        id: 10,
        type: "Karşılaştırma",
        badge: "⚖️ İki Sanat Karşılaştırması",
        title: "10. Soru: Gölge Oyunu ve Modern Sinema",
        passage: `Geleneksel Türk gölge oyunu Karagöz ve Hacivat'ta dekor tek bir beyaz perdeden (hayal perdesi), ışık ise bir mum veya kandilden ibarettir. Seyirciyi büyüleyen şey devasa bütçeli görsel efektler değil; perdenin arkasındaki tek bir sanatçının (hayali) onlarca farklı sesi, lehçeyi ve espriyi anlık doğaçlamayla canlandırabilme ustalığıdır. Modern sinema ise seyirciye her şeyi hazır, devasa bütçeler ve dijital efektlerle sunarak izleyicinin hayal gücüne neredeyse hiç pay bırakmaz. Biri seyirciyi perdeye ortak ederken, diğeri onu sadece pasif bir tüketici koltuğuna oturtur.`,
        question: `Bu parçada Karagöz oyunu ile modern sinema karşılaştırılırken Karagöz oyununun hangi yönü öne çıkarılmıştır?`,
        options: [
          "Bilet fiyatlarının sinemaya göre çok daha ucuz olması",
          "Yüksek teknolojik ekipmanlara sahip olması",
          "İzleyicinin hayal gücünü harekete geçirmesi ve sanatçının doğaçlama hüneriyle şekillenmesi",
          "Sadece yetişkin izleyicilere hitap etmesi"
        ],
        correct: 2,
        explanation: `Yazar, Karagöz'de seyircinin hayal gücünün devreye girdiğini ve hayalinin doğaçlama hünerinin perdede devleştiğini vurgulamış; 'biri seyirciyi perdeye ortak eder' diyerek C seçeneğindeki özelliği öne çıkarmıştır.`
      }
    ]
  }
];

// Geriye dönük uyumluluk: İlk deneme soruları
const LGS_MARATHON_QUESTIONS = LGS_MARATHON_EXAMS[0].questions;



