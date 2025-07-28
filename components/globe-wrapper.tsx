'use client';

import dynamic from 'next/dynamic';

const Globe = dynamic(() => import('./globe-client'), { ssr: false });

export default Globe;
