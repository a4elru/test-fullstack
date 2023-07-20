'use client';

import StyledComponentsRegistry from '@/lib/registry';
import { Body } from '@/components/body';
import HeadPanel from '@/components/head-panel';
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <StyledComponentsRegistry>
        <Body>
          <HeadPanel />
          {children}
        </Body>
      </StyledComponentsRegistry>
    </html>
  )
}
