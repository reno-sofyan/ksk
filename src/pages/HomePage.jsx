
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MapPin, Building2, Users, MessageCircle } from 'lucide-react';
import ImageCarousel from '@/components/ImageCarousel.jsx';
import FacilityGrid from '@/components/FacilityGrid.jsx';
import ProjectShowcaseSlider from '@/components/ProjectShowcaseSlider.jsx';
import UnitCard from '@/components/UnitCard.jsx';
import SocialProofCollage from '@/components/SocialProofCollage.jsx';
import AnimatedBadge from '@/components/AnimatedBadge.jsx';
import GradientText from '@/components/GradientText.jsx';
import SectionDivider from '@/components/SectionDivider.jsx';
import IconCircle from '@/components/IconCircle.jsx';

const HomePage = () => {
  const {
    scrollYProgress
  } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  
  const heroImageFiles = [
    'COZ-1-edit.jpg',
    'COZ-2-edit.jpg',
    'COZ-3-edit.jpg',
    'COZ-3.1-edit.jpg',
    'COZ-4-edit.jpg',
    'COZ-5-edit.jpg',
    'COZ-5.1-edit.jpg',
    'COZ-6-edit.jpg',
    'COZ-7-edit.jpg',
    'COZ-8-edit.jpg',
    'Gambar 3d 1.png',
    'Gambar 3d 2.png',
    'Gambar 3d 3.png',
    'Gambar 3d 4.png',
    'Gambar 3d 5.png',
    'INCOZ-2-edit.jpg',
    'interior 1.jpg',
    'interior 2.jpg',
    'interior 3.jpg',
    'interior 4.jpg',
    'interior 5.jpg'
  ];

  const heroImages = heroImageFiles.map((fileName) => `/images/${encodeURIComponent(fileName)}`);

  const projectSlides = [{
    image: '/images/COZ-1-edit.jpg',
    title: 'Tampilan Kawasan Yang Langsung Memberi Kesan Premium',
    description: 'Foto ini menampilkan kesan awal proyek yang rapi, tertata, dan dirancang untuk membangun kepercayaan sejak pandangan pertama.'
  }, {
    image: '/images/COZ-2-edit.jpg',
    title: 'Suasana Lingkungan Yang Mendukung Kenyamanan Penghuni',
    description: 'Kawasan dikembangkan bukan hanya untuk terlihat menarik, tetapi juga untuk memberi pengalaman tinggal yang lebih nyaman dan berkelas.'
  }, {
    image: '/images/COZ-3-edit.jpg',
    title: 'Detail Pengembangan Yang Dibuat Dengan Arah Yang Jelas',
    description: 'Setiap sudut proyek diarahkan untuk memperkuat kualitas visual, fungsi bangunan, dan nilai sewa jangka panjang.'
  }, {
    image: '/images/COZ-4-edit.jpg',
    title: 'Kawasan Yang Dibangun Untuk Menjaga Daya Tarik Aset',
    description: 'Desain dan penataan proyek difokuskan agar tetap menarik bagi pasar mahasiswa maupun investor dalam jangka panjang.'
  }, {
    image: '/images/COZ-5-edit.jpg',
    title: 'Visual Proyek Yang Relevan Dengan Positioning Premium',
    description: 'Nuansa proyek ini membantu membangun persepsi premium yang konsisten dengan target pasar dan strategi okupansi.'
  }, {
    image: '/images/COZ-6-edit.jpg',
    title: 'Area Proyek Yang Siap Mendukung Aktivitas Harian Penghuni',
    description: 'Elemen kawasan dan bangunan dirancang untuk menunjang rutinitas penghuni dengan lebih praktis, aman, dan nyaman.'
  }, {
    image: '/images/COZ-7-edit.jpg',
    title: 'Kualitas Lingkungan Yang Menjadi Nilai Tambah Investasi',
    description: 'Kekuatan proyek ini tidak hanya pada unit, tetapi juga pada kualitas lingkungan yang mendukung minat pasar secara konsisten.'
  }, {
    image: '/images/COZ-8-edit.jpg',
    title: 'Pengembangan Yang Menggabungkan Estetika Dan Fungsi',
    description: 'Setiap bagian proyek diarahkan untuk seimbang antara tampilan visual yang kuat dan fungsi yang relevan bagi penghuni.'
  }];

  const mainFacilities = [{
    icon: 'Mosque',
    label: 'Mushala',
    image: '/images/mushola.jpg'
  }, {
    icon: 'Shirt',
    label: 'Laundry',
    image: 'https://images.unsplash.com/photo-1638949493140-edb10b7be2f3'
  }, {
    icon: 'ParkingCircle',
    label: 'Area Parkir Luas',
    image: 'https://horizons-cdn.hostinger.com/7b110f38-9bdc-48bb-ae17-172d3642d69c/27f633534bb507fa9debb8a625dd1d31.jpg'
  }, {
    icon: 'Coffee',
    label: 'Cafe',
    image: 'https://horizons-cdn.hostinger.com/7b110f38-9bdc-48bb-ae17-172d3642d69c/5d8ab809af1d3151a9a64e5c9acc2448.png'
  }, {
    icon: 'UtensilsCrossed',
    label: 'Kantin',
    image: 'https://images.unsplash.com/photo-1492428901189-7acfa1dadb41'
  }, {
    icon: 'ShoppingCart',
    label: 'Mini Market',
    image: 'https://horizons-cdn.hostinger.com/7b110f38-9bdc-48bb-ae17-172d3642d69c/7fbdd9cba7086aa523784213297bffe3.jpg'
  }, {
    icon: 'Basketball',
    label: 'Basket Court',
    image: '/images/basket.jpg'
  }, {
    icon: 'Users',
    label: 'Communal Area',
    image: 'https://images.unsplash.com/photo-1598242930255-c25f98ff11e5'
  }, {
    icon: 'Leaf',
    label: 'Taman Hijau',
    image: 'https://images.unsplash.com/photo-1694858475422-a64aba56bae0'
  }, {
    icon: 'Sofa',
    label: 'Full Furnished',
    image: 'https://horizons-cdn.hostinger.com/7b110f38-9bdc-48bb-ae17-172d3642d69c/29a5f93261b4612d1d85546659e1f53f.jpg'
  }, {
    icon: 'Tv',
    label: 'TV Tiap Kamar',
    image: '/images/tv.jpg'
  }, {
    icon: 'Wind',
    label: 'AC',
    image: 'https://images.unsplash.com/photo-1590756254933-2873d72a83b6'
  }, {
    icon: 'Droplet',
    label: 'Water Heater',
    image: '/images/waterheater.jpg'
  }, {
    icon: 'ChefHat',
    label: 'Dapur',
    image: '/images/interior%201.jpg'
  }, {
    icon: 'Refrigerator',
    label: 'Kulkas',
    image: '/images/interior%202.jpg'
  }, {
    icon: 'Wifi',
    label: 'Wifi',
    image: 'https://images.unsplash.com/photo-1606421753414-8d165c9d48e5'
  }];

  const nearbyFacilities = [{
    icon: 'UtensilsCrossed',
    label: 'Mie Gacoan',
    description: '2 Menit',
    image: '/images/mie%20gacoan.webp'
  }, {
    icon: 'Wrench',
    label: 'Mr DIY',
    description: '3 Menit',
    image: 'https://images.unsplash.com/photo-1693418142041-a3b901cc5704'
  }, {
    icon: 'ShoppingBag',
    label: 'Yogya Supermarket',
    description: '5 Menit',
    image: '/images/yogya.jpg'
  }, {
    icon: 'Hospital',
    label: 'RS Medika Dramaga',
    description: '10 Menit',
    image: '/images/rs.png',
    imageClassName: 'object-[center_18%] brightness-110 contrast-125 saturate-110'
  }, {
    icon: 'Dribbble',
    label: 'Lap. Futsal',
    description: 'Akses Mudah',
    image: 'https://images.unsplash.com/photo-1676270892273-004f47e5fcd2'
  }, {
    icon: 'Stethoscope',
    label: 'Klinik 24 jam',
    description: 'Terdekat',
    image: '/images/klinik.png',
    imageClassName: 'object-[center_15%] brightness-110 contrast-125 saturate-110'
  }];

  const socialProofImages = [{
    url: '/images/investor%201.jpeg',
    title: "Penandatanganan Akad",
    subtitle: "Bersama Notaris"
  }, {
    url: '/images/investor%202.jpeg',
    title: "Serah Terima",
    subtitle: "Kunci Unit"
  }, {
    url: '/images/investor%203.jpeg',
    title: "Survei Lokasi",
    subtitle: "Calon Investor"
  }, {
    url: '/images/investor%204.jpeg',
    title: "Progres Pembangunan",
    subtitle: "On Schedule"
  }, {
    url: '/images/investor%205.jpeg',
    title: "Gathering Investor",
    subtitle: "Community Event"
  }, {
    url: '/images/investor%206.jpeg',
    title: "Kunjungan Investor",
    subtitle: "Survey Langsung"
  }, {
    url: '/images/investor%207.jpeg',
    title: "Momen Bahagia",
    subtitle: "Bersama Kyra Stay"
  }];

  const whatsappUrl = 'https://wa.me/6281234567890?text=Halo%2C%20saya%20tertarik%20dengan%20KSK%20Co%20Living%20Resort';
  
  return <>
      <Helmet>
        <title>Kinara Signature Kost - Investasi Properti Premium IPB</title>
        <meta name="description" content="Investasi co living resort dengan okupansi tinggi di pintu depan IPB. Dikelola profesional oleh Kyra Stay dengan fasilitas lengkap." />
      </Helmet>

      <div className="min-h-screen bg-background selection:bg-accent/30 selection:text-primary">
        
        {/* HERO SECTION */}
        <section className="relative h-[100svh] min-h-[620px] overflow-hidden bg-primary sm:h-[100dvh] sm:min-h-[700px]">
          <motion.div style={{
          y: heroY
        }} className="absolute inset-0 h-[120%]">
            <ImageCarousel images={heroImages} />
          </motion.div>
          
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 text-center text-white sm:pt-20">
              
              <motion.div initial={{
              opacity: 0,
              y: -20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              ease: "easeOut"
            }} className="mb-8">
                <img src="https://horizons-cdn.hostinger.com/7b110f38-9bdc-48bb-ae17-172d3642d69c/06b2f53b83abebfea3c80883e60758d0.png" alt="Kinara Signature Kost Logo" className="h-24 sm:h-28 md:h-40 mx-auto object-contain drop-shadow-2xl" />
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              scale: 0.9,
              y: 30
            }} animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              delay: 0.2,
              ease: "easeOut"
            }}>
                <h1 className="mb-6 text-4xl font-extrabold tracking-tight leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl">
                  Investasi Untuk <GradientText className="drop-shadow-lg" from="from-white" to="to-accent">Mereka yang Teliti</GradientText>
                </h1>
              </motion.div>
              
              <motion.p initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              delay: 0.4
            }} className="mb-6 text-lg font-medium text-white/90 sm:text-xl md:text-3xl">
                Kami Memberikan Kenyamanan Penghuni Untuk Ketenangan Okupansi
              </motion.p>
            </div>
          </div>
          
          {/* Decorative Bottom Wave */}
          <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-1">
            <svg viewBox="0 0 1440 120" className="w-full h-[60px] md:h-[120px] fill-background" preserveAspectRatio="none">
              <path d="M0,0 C240,100 480,100 720,50 C960,0 1200,0 1440,50 L1440,120 L0,120 Z"></path>
            </svg>
          </div>
        </section>

        <section className="relative z-30 -mt-10 bg-background pb-8 pt-2 sm:-mt-16 sm:pb-10 sm:pt-6 md:-mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
            }} className="text-center mb-8 sm:mb-10">
              <AnimatedBadge text="Galeri Proyek" className="mb-4" />
              <h2 className="mb-4 text-3xl font-bold text-primary sm:text-4xl md:text-5xl">
                Kenali <GradientText from="from-primary" to="to-accent">Suasana Proyek</GradientText> Lebih Dekat
              </h2>
            </motion.div>

            <ProjectShowcaseSlider slides={projectSlides} />
          </div>
        </section>

        {/* REDESIGNED SECTION DECK */}
        <section className="py-16 bg-background relative z-30 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
              
              {/* Card 1: Gradient Premium */}
              <motion.div initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }} className="group flex flex-col justify-between overflow-hidden rounded-[1.5rem] border border-accent/20 bg-primary p-6 text-primary-foreground shadow-2xl shadow-primary/20 hover-lift sm:rounded-[2rem] sm:p-8 lg:p-10">
                <div>
                  <div className="relative mb-6 h-40 overflow-hidden rounded-[1.25rem] border border-white/10 shadow-2xl sm:mb-8 sm:h-52 sm:rounded-[1.5rem]">
                    <img src="/images/pintu-ipb.jpg" alt="Pintu depan IPB dekat Kinara Signature Kost" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/35 to-transparent" />
                    <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2 backdrop-blur-md sm:left-5 sm:top-5 sm:gap-3 sm:px-4">
                      <MapPin className="w-5 h-5 text-accent" />
                      <span className="text-sm font-semibold text-white/90">Pintu Depan IPB</span>
                    </div>
                  </div>
                  <h3 className="mb-4 text-xl font-bold leading-tight text-accent sm:text-2xl">Lokasi Strategis Premium</h3>
                  <p className="text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
                    Satu-satunya kawasan co-living resort mewah yang terletak tepat di pintu depan kampus IPB.
                  </p>
                </div>
              </motion.div>

              {/* Card 2: Solid Accent Border */}
              <motion.div initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6,
              delay: 0.1
            }} className="group flex flex-col justify-between overflow-hidden rounded-[1.5rem] border-2 border-accent bg-card p-6 shadow-lg hover-lift sm:rounded-[2rem] sm:p-8 lg:p-10">
                <div>
                  <div className="relative mb-6 h-40 overflow-hidden rounded-[1.25rem] border border-border shadow-xl sm:mb-8 sm:h-52 sm:rounded-[1.5rem]">
                    <img src="/images/COZ-8-edit.jpg" alt="Suasana resort modern di Kinara Signature Kost" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/15 to-transparent" />
                    <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
                      <IconCircle icon={Building2} size="md" className="bg-white/90 shadow-lg backdrop-blur-sm" iconClassName="text-primary" />
                    </div>
                  </div>
                  <h3 className="mb-4 text-xl font-bold leading-tight text-foreground sm:text-2xl">Konsep Resort Modern</h3>
                  <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                    Co-living resort dengan ekosistem full fasilitas paling lengkap untuk menunjang gaya hidup mahasiswa.
                  </p>
                </div>
              </motion.div>

              {/* Card 3: Soft Background */}
              <motion.div initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6,
              delay: 0.2
            }} className="group relative flex flex-col justify-between overflow-hidden rounded-[1.5rem] border border-border bg-secondary p-6 shadow-md hover-lift sm:rounded-[2rem] sm:p-8 lg:p-10">
                <div className="absolute right-0 top-0 -mr-6 -mt-6 h-28 w-28 rounded-full bg-accent/10 blur-3xl sm:-mr-8 sm:-mt-8 sm:h-40 sm:w-40"></div>
                <div className="relative z-10">
                  <div className="relative mb-6 h-40 overflow-hidden rounded-[1.25rem] border border-white/70 shadow-xl sm:mb-8 sm:h-52 sm:rounded-[1.5rem]">
                    <img src="/images/tim-kyrastay.png" alt="Tim Kyra Stay dan pengelolaan profesional" className="w-full h-full object-cover object-[center_12%] brightness-110 contrast-110 saturate-125 transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/55 via-primary/10 to-transparent" />
                    <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
                      <IconCircle icon={Users} size="md" className="bg-white/90 shadow-lg backdrop-blur-sm" iconClassName="text-primary" />
                    </div>
                  </div>
                  <h3 className="mb-4 text-xl font-bold leading-tight text-foreground sm:text-2xl">Pengelolaan Profesional</h3>
                  <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                    Dikelola secara transparan dan profesional oleh Kyra Stay. Anda tinggal duduk manis menerima hasil.
                  </p>
                </div>
              </motion.div>
              
            </div>
          </div>
        </section>

        <SectionDivider type="straight" />

        {/* VALUE STATEMENT */}
        <section className="py-16 bg-background relative overflow-hidden sm:py-20 lg:py-24">
          <div className="pointer-events-none absolute left-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-accent/5 blur-[90px] sm:h-96 sm:w-96 sm:blur-[100px]"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.h2 initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="mb-8 text-3xl font-extrabold sm:text-4xl md:text-5xl">
              Investasilah Pada Yang Memberikan <GradientText from="from-primary" to="to-accent">Okupansi Asli</GradientText>
            </motion.h2>
            <motion.p initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.1
          }} className="text-base font-light leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
              Angka okupansi bukanlah sekadar janji, melainkan hasil dari kenyamanan nyata yang dirasakan penghuni. 
              Berinvestasi di Kinara Signature Kost berarti memiliki aset dengan daya tarik permanen bagi mahasiswa.
            </motion.p>
          </div>
        </section>

        {/* FASILITAS UTAMA */}
        <section className="py-16 bg-secondary/50 border-y border-border/50 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="text-center mb-12 sm:mb-16">
              <AnimatedBadge text="Fasilitas Premium" className="mb-4" />
              <h2 className="mb-6 text-3xl font-bold sm:text-4xl md:text-5xl">
                Kawasan Eksklusif <GradientText from="from-primary" to="to-accent">6000 m²</GradientText>
              </h2>
              <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl">
                Fasilitas untuk menunjang kenyamanan dan okupansi. Menciptakan ekosistem tempat tinggal yang memenuhi seluruh kebutuhan hidup mahasiswa.
              </p>
            </motion.div>

            <FacilityGrid facilities={mainFacilities} columns={4} showImages={true} />
          </div>
        </section>

        {/* FASILITAS SEKITAR */}
        <section className="py-16 bg-background sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="text-center mb-12 sm:mb-16">
              <h2 className="mb-6 text-3xl font-bold text-primary sm:text-4xl">Kemudahan Akses Sekitar</h2>
              <p className="text-base text-muted-foreground sm:text-lg md:text-xl">Langkah kaki menuju berbagai titik strategis.</p>
            </motion.div>

            <FacilityGrid facilities={nearbyFacilities} columns={3} showImages={true} />
          </div>
        </section>

        {/* TIPE UNIT */}
        <section className="py-16 bg-secondary/50 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="text-center mb-12 sm:mb-16">
              <h2 className="mb-6 text-3xl font-bold sm:text-4xl md:text-5xl">Pilihan <GradientText from="from-primary" to="to-accent">Tipe Unit</GradientText></h2>
              <p className="text-base text-muted-foreground sm:text-lg md:text-xl">
                Rancang portofolio investasi Anda dengan dua pilihan bangunan yang efisien.
              </p>
            </motion.div>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
              <UnitCard type="Tipe 1" description="Cocok untuk investor pemula dengan ROI optimal dan modal terjangkau." oldPrice="Rp 1,7 M" newPrice="Rp 1,5 M" image="/images/COZ-2-edit.jpg" features={['Bangunan 2 Lantai', '6 Kamar Tidur Full Furnished', 'Luas Bangunan 94 m²', 'Kamar Mandi Dalam', 'Smart Door Lock']} index={0} />
              <UnitCard type="Tipe 2" description="Investasi skala besar untuk passive income ganda setiap bulannya." oldPrice="Rp 2,5 M" newPrice="Rp 2,1 M" image="/images/COZ-3-edit.jpg" features={['Bangunan 3 Lantai', '10 Kamar Tidur Full Furnished', 'Luas Bangunan 140 m²', 'Kamar Mandi Dalam', 'Ruang Santai Khusus']} index={1} />
            </div>
          </div>
        </section>

        {/* DENAH KAMAR */}
        <section className="py-16 bg-background relative sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="text-center mb-12 sm:mb-16">
              <h2 className="mb-4 text-3xl font-bold text-primary sm:text-4xl">Denah Tata Ruang</h2>
              <p className="text-base text-muted-foreground sm:text-lg md:text-xl">Efisien, luas, dan memperhatikan sirkulasi udara.</p>
            </motion.div>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
              <motion.div initial={{
              opacity: 0,
              scale: 0.95
            }} whileInView={{
              opacity: 1,
              scale: 1
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8
            }} className="overflow-hidden rounded-[1.5rem] border border-border bg-card p-4 shadow-2xl sm:rounded-[2rem] md:p-6">
                <div className="mb-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/60">Denah Unit</p>
                    <h3 className="mt-2 text-xl font-bold text-primary sm:text-2xl">2 Lantai</h3>
                  </div>
                  <div className="rounded-full bg-accent/10 px-3 py-2 text-xs font-semibold text-primary sm:px-4 sm:text-sm">
                    Tipe 1
                  </div>
                </div>
                <img src="/images/denah2lt.jpg" alt="Denah unit 2 lantai Kinara Signature Kost" className="w-full h-auto rounded-xl object-cover" loading="lazy" />
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              scale: 0.95
            }} whileInView={{
              opacity: 1,
              scale: 1
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8,
              delay: 0.1
            }} className="overflow-hidden rounded-[1.5rem] border border-border bg-card p-4 shadow-2xl sm:rounded-[2rem] md:p-6">
                <div className="mb-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/60">Denah Unit</p>
                    <h3 className="mt-2 text-xl font-bold text-primary sm:text-2xl">3 Lantai</h3>
                  </div>
                  <div className="rounded-full bg-accent/10 px-3 py-2 text-xs font-semibold text-primary sm:px-4 sm:text-sm">
                    Tipe 2
                  </div>
                </div>
                <img src="/images/denah3lt.jpg" alt="Denah unit 3 lantai Kinara Signature Kost" className="w-full h-auto rounded-xl object-cover" loading="lazy" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF */}
        <section className="py-16 bg-primary text-primary-foreground overflow-hidden relative sm:py-20 lg:py-24">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <motion.div initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }} className="lg:col-span-4">
                <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                  Mari bergabung bersama puluhan investor bahagia lainnya
                </h2>
                <div className="mb-8 inline-flex max-w-full flex-col items-start rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-md shadow-2xl shadow-black/10 sm:rounded-[1.75rem] sm:px-6 sm:py-5">
                  <span className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-accent/90 sm:text-xs sm:tracking-[0.35em]">
                    Undangan Eksklusif
                  </span>
                  <p className="text-left text-xl font-semibold leading-tight text-white sm:text-2xl md:text-3xl">
                    <span className="text-accent">Datang.</span>{' '}
                    <span className="text-white">Buktikan.</span>
                    <br />
                    <GradientText className="drop-shadow-sm" from="from-white" to="to-accent">
                      Bergabunglah Bersama Kami
                    </GradientText>
                  </p>
                </div>
              </motion.div>
              
              <div className="lg:col-span-8">
                <SocialProofCollage images={socialProofImages} />
              </div>
            </div>
          </div>
        </section>

        {/* BOLD CTA */}
        <section className="py-20 bg-primary relative overflow-hidden sm:py-24 lg:py-32">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent via-transparent to-transparent mix-blend-overlay"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.h2 initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="mb-8 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Klik Untuk Survey & Buktikan Sendiri
            </motion.h2>
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.1
          }} className="mb-12 max-w-2xl mx-auto">
              <p className="text-base text-white/85 sm:text-lg md:text-xl">
                Kami Akan Berikan Harga Khusus, Untuk Booking Bulan Ini
              </p>
              <motion.p animate={{
              scale: [1, 1.04, 1],
              y: [0, -2, 0],
              opacity: [0.75, 1, 0.75],
              textShadow: ['0 0 0 rgba(212, 175, 55, 0)', '0 0 18px rgba(212, 175, 55, 0.45)', '0 0 0 rgba(212, 175, 55, 0)']
            }} transition={{
              repeat: Infinity,
              duration: 2.4,
              ease: "easeInOut"
            }} className="mt-5 text-lg font-semibold uppercase tracking-[0.18em] text-accent sm:text-xl sm:tracking-[0.22em] md:text-2xl md:tracking-[0.28em]">
                Tersisa 6 Unit!
              </motion.p>
            </motion.div>
            <motion.div initial={{
            opacity: 0,
            y: 20,
            scale: 0.9
          }} whileInView={{
            opacity: 1,
            y: 0,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }}>
              <motion.div animate={{
              scale: [1, 1.05, 1]
            }} transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut"
            }} className="inline-block">
                <Button asChild size="lg" className="group h-auto rounded-full border-2 border-accent bg-primary px-6 py-5 text-base text-accent transition-all duration-300 hover:bg-accent hover:text-primary shadow-2xl hover:shadow-accent/20 sm:px-8 sm:py-6 sm:text-lg md:px-12 md:py-8 md:text-xl">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-3 h-5 w-5 transition-transform group-hover:rotate-12 sm:h-6 sm:w-6" />
                    Jadwalkan Survey Sekarang
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CLOSING QUOTE */}
        <section className="py-20 bg-background border-b border-border relative sm:py-24 lg:py-32">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-border to-transparent"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{
            opacity: 0,
            scale: 0.9
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.8
          }} className="relative">
              <span className="absolute -left-4 -top-8 text-6xl font-serif leading-none text-accent/20 sm:-left-8 sm:-top-12 sm:text-8xl">"</span>
              <blockquote className="text-2xl font-bold italic leading-tight text-primary/90 sm:text-3xl md:text-5xl">
                Belajarlah Berenang Sebelum Anda Tenggelam
              </blockquote>
              <span className="absolute -bottom-8 -right-4 text-6xl font-serif leading-none text-accent/20 sm:-bottom-12 sm:-right-8 sm:text-8xl">"</span>
            </motion.div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-background pt-16 pb-10 sm:pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center mb-12">
              <h3 className="mb-4 text-xl font-bold text-primary sm:text-2xl">Masih Ada Pertanyaan?</h3>
              <p className="mb-8 text-sm text-muted-foreground sm:text-base">Customer Service kami siap membantu Anda kapan saja.</p>
              <motion.div animate={{
              scale: [1, 1.05, 1]
            }} transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut"
            }}>
                <Button asChild className="group h-auto max-w-xs whitespace-normal rounded-full border border-accent/30 bg-primary px-6 py-4 text-center text-sm leading-snug text-accent shadow-sm hover:bg-primary/90 sm:max-w-md sm:px-8 sm:py-6 sm:text-base">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2 text-accent" />
                    Klik ini untuk ngobrol dengan customer service
                  </a>
                </Button>
              </motion.div>
            </div>
            
            <div className="border-t border-border pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
              <div>
                <p className="text-lg font-bold text-primary tracking-tight">Kinara Signature Kost</p>
                <p className="text-sm text-muted-foreground">Investasi Properti Premium IPB</p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
              </div>
              <p className="text-sm text-muted-foreground">© 2026 Kinara Signature Kost. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>;
};
export default HomePage;
