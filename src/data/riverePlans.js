function imageUrl(fileName) {
  const encodedPath = fileName
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
  const baseUrl = import.meta.env?.BASE_URL || '/';
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  return `${normalizedBase}images/${encodedPath}`;
}

export const DENAH_PLANS = [
  {
    id: 'type-62-31',
    file: 'Denah 1.png',
    title: 'Type 62/31',
    subtitle: 'Luas 62/31',
    landArea: '31 m2',
    buildingArea: '62 m2',
    rooms: '4 Kamar',
    floors: '3 Lantai',
    description: 'Denah unit Type 62/31 untuk investor yang mencari aset kost resort efisien dengan empat kamar dalam satu unit.',
    facilities: ['Parkir motor tiap kamar', 'Dapur umum', 'Ruang jemur', 'Akses tangga lebar'],
    imageAlt: 'Denah unit Type 62/31 Rivere Kostaycation IPB'
  },
  {
    id: 'type-94-31',
    file: 'Denah 2.png',
    title: 'Type 94/31',
    subtitle: 'Luas 94/31',
    landArea: '31 m2',
    buildingArea: '94 m2',
    rooms: '6 Kamar',
    floors: '3 Lantai',
    description: 'Denah unit Type 94/31 untuk investor yang membutuhkan kapasitas lebih besar dengan enam kamar dalam satu unit.',
    facilities: ['Parkir motor', 'Dapur umum', 'Ruang jemur', 'Akses tangga lebar'],
    imageAlt: 'Denah unit Type 94/31 Rivere Kostaycation IPB'
  }
].map((plan) => ({
  ...plan,
  image: imageUrl(plan.file)
}));

export const DENAH_PAGE = {
  title: 'Denah Rivere Kostaycation IPB | Type 62/31 dan Type 94/31',
  description: 'Lihat denah unit Rivere Kostaycation IPB untuk Type 62/31 dan Type 94/31, lengkap dengan jumlah kamar, luas lahan, luas bangunan, dan fasilitas tiap layout.',
  path: '/denah/',
  image: imageUrl('Denah 1.png'),
  imageAlt: 'Denah unit Rivere Kostaycation IPB'
};
