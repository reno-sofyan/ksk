import React from 'react';
import SocialProofCollage from '@/components/SocialProofCollage.jsx';
import { imageUrl } from '@/lib/assets.js';

const socialProofImages = [
  {
    url: imageUrl('investor 1.jpeg'),
    title: 'Penandatanganan Akad',
    subtitle: 'Bersama Notaris'
  },
  {
    url: imageUrl('investor 2.jpeg'),
    title: 'Serah Terima',
    subtitle: 'Kunci Unit'
  },
  {
    url: imageUrl('investor 3.jpeg'),
    title: 'Survei Lokasi',
    subtitle: 'Calon Investor'
  },
  {
    url: imageUrl('investor 4.jpeg'),
    title: 'Progres Pembangunan',
    subtitle: 'On Schedule'
  },
  {
    url: imageUrl('investor 5.jpeg'),
    title: 'Gathering Investor',
    subtitle: 'Community Event'
  },
  {
    url: imageUrl('investor 6.jpeg'),
    title: 'Kunjungan Investor',
    subtitle: 'Survey Langsung'
  },
  {
    url: imageUrl('investor 7.jpeg'),
    title: 'Momen Bahagia',
    subtitle: 'Bersama Kyra Stay'
  }
];

const SocialProofSection = () => <SocialProofCollage images={socialProofImages} />;

export default SocialProofSection;
