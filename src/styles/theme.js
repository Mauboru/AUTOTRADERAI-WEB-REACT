import { darken } from 'polished';

const primaryColor = '#0A42AB'; // Azul forte de alta visibilidade

const theme = {
    colors: {
        primary: primaryColor,
        primaryDark: darken(0.15, primaryColor),     // 15% mais escuro
        primaryDarkTwo: darken(0.3, primaryColor),    // 30% mais escuro
        primaryTransparent1: 'rgba(10, 66, 171, 0.5)',  // 50% opacidade
        primaryTransparent2: 'rgba(10, 66, 171, 0.15)', // 15% opacidade

        background: '#000',      // Fundo preto
        text: '#FFFFFF',         // Texto branco para contraste perfeito
        inputBg: '#121212',      // Fundo de input levemente diferente do fundo principal
        inputBorder: darken(0.1, primaryColor), // Borda do input um pouco escurecida
        placeholder: '#AAAAAA',  // Placeholder cinza claro
        linkPlaceholder: '#FFFFFF', // Link normal em branco

        disabledBg: '#1F1F1F',    // Cinza escuro para input desabilitado
        disabledBorder: '#333333',
        disabledText: '#777777',

        danger: "#dc3545",
        dangerDark: "#a71d2a",
        warning: "#ffc107",
        warningDark: "#c79100",
        info: "#17a2b8",
        infoDark: "#11707f",
    },
};

export default theme;
