import React from 'react';
import ProjectShowcaseSlider from '@/components/ProjectShowcaseSlider.jsx';
import { imageUrl } from '@/lib/assets.js';

const projectSlides = [
  {
    image: imageUrl('COZ-1-edit.jpg'),
    title: 'Tampilan Kawasan Yang Langsung Memberi Kesan Premium',
    description: 'Foto ini menampilkan kesan awal proyek yang rapi, tertata, dan dirancang untuk membangun kepercayaan sejak pandangan pertama.'
  },
  {
    image: imageUrl('COZ-2-edit.jpg'),
    title: 'Suasana Lingkungan Yang Mendukung Kenyamanan Penghuni',
    description: 'Kawasan dikembangkan bukan hanya untuk terlihat menarik, tetapi juga untuk memberi pengalaman tinggal yang lebih nyaman dan berkelas.'
  },
  {
    image: imageUrl('COZ-3-edit.jpg'),
    title: 'Detail Pengembangan Yang Dibuat Dengan Arah Yang Jelas',
    description: 'Setiap sudut proyek diarahkan untuk memperkuat kualitas visual, fungsi bangunan, dan nilai sewa jangka panjang.'
  },
  {
    image: imageUrl('COZ-4-edit.jpg'),
    title: 'Kawasan Yang Dibangun Untuk Menjaga Daya Tarik Aset',
    description: 'Desain dan penataan proyek difokuskan agar tetap menarik bagi pasar mahasiswa maupun investor dalam jangka panjang.'
  },
  {
    image: imageUrl('COZ-5-edit.jpg'),
    title: 'Visual Proyek Yang Relevan Dengan Positioning Premium',
    description: 'Nuansa proyek ini membantu membangun persepsi premium yang konsisten dengan target pasar dan strategi okupansi.'
  },
  {
    image: imageUrl('COZ-6-edit.jpg'),
    title: 'Area Proyek Yang Siap Mendukung Aktivitas Harian Penghuni',
    description: 'Elemen kawasan dan bangunan dirancang untuk menunjang rutinitas penghuni dengan lebih praktis, aman, dan nyaman.'
  },
  {
    image: imageUrl('COZ-7-edit.jpg'),
    title: 'Kualitas Lingkungan Yang Menjadi Nilai Tambah Investasi',
    description: 'Kekuatan proyek ini tidak hanya pada unit, tetapi juga pada kualitas lingkungan yang mendukung minat pasar secara konsisten.'
  },
  {
    image: imageUrl('COZ-8-edit.jpg'),
    title: 'Pengembangan Yang Menggabungkan Estetika Dan Fungsi',
    description: 'Setiap bagian proyek diarahkan untuk seimbang antara tampilan visual yang kuat dan fungsi yang relevan bagi penghuni.'
  }
];

const ProjectShowcaseSection = () => <ProjectShowcaseSlider slides={projectSlides} />;

export default ProjectShowcaseSection;
