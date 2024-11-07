import React from 'react';
import SectionWrapper from '../_components/general_components/SectionWrapper';

function PublicacionesLayout({ children }: { children: React.ReactNode }) {
  return (
    <SectionWrapper>
      {children}
    </SectionWrapper>
  );
}

export default PublicacionesLayout;