'use client';

import { Alert } from '@mantine/core';
import { Shield } from 'lucide-react';

export function PrivacyNotice() {
  return (
    <Alert
      icon={<Shield size={16} />}
      title="Privacy First"
      color="blue"
      variant="light"
    >
      Your poems are analyzed entirely in your browser. We do not save, store, or
      transmit your content to any server. Your creative work stays private.
    </Alert>
  );
}
