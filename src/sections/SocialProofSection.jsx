import React from 'react';
import SocialProofCollage from '@/components/SocialProofCollage.jsx';
import { imageUrl } from '@/lib/assets.js';

const socialProofImages = [
  {
    url: imageUrl('investor 1.jpeg'),
    title: 'Dokumentasi Proyek',
    subtitle: 'Rivere Kostaycation'
  },
  {
    url: imageUrl('investor 2.jpeg'),
    title: 'Kunjungan Lokasi',
    subtitle: 'Ring 1 IPB'
  },
  {
    url: imageUrl('investor 3.jpeg'),
    title: 'Survei Lokasi',
    subtitle: 'Rivere Kostaycation'
  },
  {
    url: imageUrl('investor 4.jpeg'),
    title: 'Visual Pengembangan',
    subtitle: 'PT Kinara Land Indonesia'
  },
  {
    url: imageUrl('investor 5.jpeg'),
    title: 'Konsultasi Properti',
    subtitle: 'Smart Property Investment'
  },
  {
    url: imageUrl('investor 6.jpeg'),
    title: 'Kunjungan Investor',
    subtitle: 'Survey Lokasi'
  },
  {
    url: imageUrl('investor 7.jpeg'),
    title: 'Ekosistem Bebas Repot',
    subtitle: 'Bersama Kyra Stay'
  }
];

const SocialProofSection = () => <SocialProofCollage images={socialProofImages} />;

export default SocialProofSection;
