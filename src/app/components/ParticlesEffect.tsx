// src/app/ParticlesEffect.tsx
import React from 'react';
import ParticlesBg from 'react-native-particles-bg';

const ParticlesEffect = ({ showParticles }) => {
    if (!showParticles) return null;

    return (
        <ParticlesBg
            color="#ff0000"
            num={100} // Ajusta el número de partículas
            type="circle" // Puedes cambiar a "line" o "square"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1, // Asegúrate de que esté detrás de otros elementos
            }}
        />
    );
};

export default ParticlesEffect;
