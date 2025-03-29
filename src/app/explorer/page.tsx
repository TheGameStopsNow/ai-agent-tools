'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Paper,
  Container,
  CircularProgress,
  Button
} from '@mui/material';

export default function ExplorerRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the explore page with the analysis tab
    const redirectTimer = setTimeout(() => {
      router.replace('/explore?tab=analysis');
    }, 1500);

    return () => clearTimeout(redirectTimer);
  }, [router]);

  const handleManualRedirect = () => {
    router.push('/explore?tab=analysis');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Redirecting...</Typography>
      </Box>
      
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <CircularProgress size={40} />
          <Typography variant="h5" gutterBottom>
            Redirecting to Story Explorer
          </Typography>
          <Typography variant="body1" paragraph>
            The Story Explorer has been integrated into the Explore page.
          </Typography>
          <Typography variant="body1">
            If you are not redirected automatically, please
            <Button 
              color="primary" 
              onClick={handleManualRedirect}
              sx={{ ml: 1 }}
            >
              click here
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
} 