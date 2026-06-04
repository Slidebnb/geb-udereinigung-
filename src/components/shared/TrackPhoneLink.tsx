'use client';

import { trackPhoneClick } from '@/lib/gtag';

interface Props {
  phone: string;
  className?: string;
  children: React.ReactNode;
}

export default function TrackPhoneLink({ phone, className, children }: Props) {
  return (
    <a href={`tel:${phone}`} className={className} onClick={trackPhoneClick}>
      {children}
    </a>
  );
}
