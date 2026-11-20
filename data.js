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
