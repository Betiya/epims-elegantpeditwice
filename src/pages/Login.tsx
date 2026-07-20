import React, { useEffect, useRef } from 'react';
import { Box, Typography, Stack, Paper } from '@mui/material';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const { googleClientId } = useAuth();
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (googleClientId && window.google?.accounts?.id && btnRef.current) {
      window.google.accounts.id.renderButton(btnRef.current, {
        theme: 'filled_black',
        size: 'large',
        shape: 'pill',
        width: 280
      });
    }
  }, [googleClientId]);

  return (
    <Box sx={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#000', p: 3 }}>
      <Paper elevation={0} sx={{ p: 5, maxWidth: 360, width: '100%', textAlign: 'center', border: 'none', bgcolor: 'transparent' }}>
        <Box component="img" src="/logo-mark-white.png" alt="elegantpedi" sx={{ width: '70%', maxWidth: 260, mx: 'auto', display: 'block', mb: 4 }} />
        <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.7)' }}>
          Inventory &amp; Supplier Management
        </Typography>

        <Stack spacing={2} sx={{ mt: 5 }}>
          <Box ref={btnRef} sx={{ display: 'flex', justifyContent: 'center' }} />
          {!googleClientId && (
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
              Google Sign-In isn't configured yet — set VITE_GOOGLE_CLIENT_ID.
            </Typography>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};
