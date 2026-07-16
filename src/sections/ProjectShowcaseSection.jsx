import React from 'react';
import ProjectShowcaseSlider from '@/components/ProjectShowcaseSlider.jsx';
import { imageUrl } from '@/lib/assets.js';
import { RIVERE_DESIGN_IMAGES } from '@/data/rivereImages.js';

const projectMessages = [
  {
    title: 'Lebih dari Investasi Properti',
    description: 'Aset produktif premium hanya 2 menit dari pintu gerbang utama IPB.'
  },
  {
    title: 'Standar Baru Investasi Properti Cerdas',
    description: 'Investasi yang dirancang agar terasa senyaman rumah sendiri, stabil, dan terukur.'
  },
  {
    title: 'Hybrid Property Development & Hospitality Ecosystem',
    description: 'Memadukan hunian kost produktif dengan standar pengelolaan hospitality profesional.'
  },
  {
    title: 'Investasi Stabil, Terukur, dan Profesional',
    description: 'Pengalaman investasi yang tenang, tertata, dan berorientasi jangka panjang.'
  },
  {
    title: 'Data, Transparansi, dan Hasil Nyata',
    description: 'Perencanaan terukur dan pengelolaan transparan menjadi fondasi investasi Rivere.'
  },
  {
    title: 'Ekosistem Fasilitas Terintegrasi',
    description: 'Resort kostaycation mandiri yang menunjang kebutuhan hidup premium mahasiswa.'
  },
  {
    title: 'Concentric Circles of Comfort',
    description: 'Setiap lapisan fasilitas membangun kenyamanan, produktivitas, keamanan, dan komunitas.'
  },
  {
    title: 'Lifestyle & Wellness',
    description: 'Kolam renang, gym, cafe, basket 3 on 3, dan mini garden untuk penghuni.'
  },
  {
    title: 'Productivity & Community',
    description: 'Clubhouse, ruang komunal, mushola, dan area hijau mendukung aktivitas penghuni.'
  },
  {
    title: 'Security & Convenience',
    description: 'Keamanan 24 jam, CCTV, akses terintegrasi, mini market, laundry, dan parkir luas.'
  },
  {
    title: 'Lokasi Emas di Ring 1 IPB',
    description: 'Berada di kawasan strategis dengan captive market ribuan mahasiswa setiap tahun.'
  },
  {
    title: 'Investasi Properti Premium Tanpa Ribet',
    description: 'Legalitas SHM, lokasi strategis, dan pengelolaan Kyra Stay memberikan fondasi kuat.'
  },
  {
    title: 'Smart Spatial Design',
    description: 'Konsep mezzanine mengoptimalkan ruang dalam compact footprint yang ergonomis.'
  },
  {
    title: 'Financial Perspective',
    description: 'Potensi passive income hingga Rp126 juta per unit per tahun dan pertumbuhan aset.'
  },
  {
    title: 'The New Standard of Smart Property Investment',
    description: 'Aset produktif yang diposisikan sebagai wealth preservation lintas generasi.'
  }
];

const projectSlides = RIVERE_DESIGN_IMAGES.map(({ file }, index) => ({
  image: imageUrl(file),
  ...projectMessages[index]
}));

const ProjectShowcaseSection = () => <ProjectShowcaseSlider slides={projectSlides} />;

export default ProjectShowcaseSection;
