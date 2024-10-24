import React, { useState, useRef, useEffect } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useRouter } from 'next/router';

const ReconhecimentoFacial = () => {
  const videoRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Ativar a câmera
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error('Erro ao acessar a câmera', err);
      });
  }, []);

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png');
    setCapturedImage(imageData);

    // Simulação da verificação facial
    setTimeout(() => {
      alert('Reconhecimento facial realizado com sucesso!');
      router.push('/'); // Redireciona para a página inicial após o reconhecimento
    }, 2000);
  };

  return (
    <Box textAlign="center" style={{ padding: '20px' }}>
      <Typography variant="h4" style={{ marginBottom: '20px' }}>
        Reconhecimento Facial
      </Typography>

      <video ref={videoRef} autoPlay style={{ width: '100%', maxWidth: '400px' }} />
      
      {capturedImage && (
        <Box mt={3}>
          <img src={capturedImage} alt="Imagem capturada" style={{ width: '100%', maxWidth: '400px' }} />
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={captureImage}
        style={{ marginTop: '20px' }}
      >
        Capturar Imagem e Verificar
      </Button>
    </Box>
  );
};

export default ReconhecimentoFacial;
