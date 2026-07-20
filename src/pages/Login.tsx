import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Stack, Paper, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const { googleClientId } = useAuth();
  const btnRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [renderAttempted, setRenderAttempted] = useState(false);
  const [renderError, setRenderError] = useState<string | null>(null);

  useEffect(() => {
    const check = setInterval(() => {
      if (window.google?.accounts?.id) {
        setScriptLoaded(true);
        clearInterval(check);
      }
    }, 200);
    setTimeout(() => clearInterval(check), 8000);
    return () => clearInterval(check);
  }, []);

  useEffect(() => {
    if (googleClientId && scriptLoaded && btnRef.current) {
      try {
        window.google.accounts.id.renderButton(btnRef.current, {
          theme: 'outline', size: 'large', shape: 'pill', width: 280
        });
        setRenderAttempted(true);
      } catch (e) {
        setRenderError(String(e));
      }
    }
  }, [googleClientId, scriptLoaded]);

  return (
    <Box sx={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#FFFFFF', p: 3 }}>
      <Paper elevation={0} sx={{ p: 5, maxWidth: 360, width: '100%', textAlign: 'center', border: 'none', bgcolor: 'transparent' }}>
        <Box component="img" src="/logo-mark-black.png" alt="elegantpedi" sx={{ width: '70%', maxWidth: 260, mx: 'auto', display: 'block', mb: 4 }} />
        <Typography variant="overline" color="text.secondary">
          Inventory &amp; Supplier Management
        </Typography>

        <Stack spacing={1} sx={{ mt: 3, textAlign: 'left' }}>
          <Alert severity={googleClientId ? 'success' : 'error'} sx={{ fontSize: '0.7rem' }}>
            Client ID configured: {googleClientId ? 'yes' : 'NO — env var missing'}
          </Alert>
          <Alert severity={scriptLoaded ? 'success' : 'error'} sx={{ fontSize: '0.7rem' }}>
            Google script loaded: {scriptLoaded ? 'yes' : 'NO — blocked or not loading'}
          </Alert>
          <Alert severity={renderAttempted ? 'success' : 'warning'} sx={{ fontSize: '0.7rem' }}>
            Button render attempted: {renderAttempted ? 'yes' : 'no'}
          </Alert>
          {renderError && <Alert severity="error" sx={{ fontSize: '0.7rem' }}>{renderError}</Alert>}
        </Stack>

        <Stack spacing={2} sx={{ mt: 3 }}>
          <Box ref={btnRef} sx={{ display: 'flex', justifyContent: 'center' }} />
        </Stack>
      </Paper>
    </Box>
  );
};
