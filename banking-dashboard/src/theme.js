import { createTheme } from '@mui/material/styles';

// Glassmorphism recipe: translucent gradient fill + backdrop blur + hairline light border + soft depth shadow
export const glass = {
  background: 'linear-gradient(135deg, rgba(255,255,255,.10), rgba(255,255,255,.035))',
  backdropFilter: 'blur(20px) saturate(150%)',
  WebkitBackdropFilter: 'blur(20px) saturate(150%)',
  border: '1px solid rgba(255,255,255,.14)',
  borderRadius: 22,
  boxShadow: '0 10px 34px rgba(2,8,23,.38), inset 0 1px 0 rgba(255,255,255,.12)',
  backgroundImage: undefined,
};
const overlay = {
  background: 'rgba(13,20,38,.88)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,.14)', backgroundImage: 'none',
};

export default createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#2dd4bf' }, secondary: { main: '#a78bfa' },
    warning: { main: '#fbbf24' }, error: { main: '#fb7185' }, success: { main: '#34d399' },
    background: { default: '#070b16', paper: 'rgba(15,23,42,.6)' },
    text: { primary: '#eef2ff', secondary: 'rgba(226,232,240,.68)' },
  },
  typography: { fontFamily: 'Manrope, system-ui, sans-serif', h4: { fontWeight: 800, letterSpacing: -0.5 }, h5: { fontWeight: 800 }, h6: { fontWeight: 700 }, button: { textTransform: 'none', fontWeight: 700 } },
  shape: { borderRadius: 14 },
  components: {
    MuiCard: { styleOverrides: { root: glass } },
    MuiDialog: { styleOverrides: { paper: { ...overlay, borderRadius: 24 } } },
    MuiPopover: { styleOverrides: { paper: overlay } },
    MuiDrawer: { styleOverrides: { paper: { ...glass, borderRadius: 0, borderTop: 0, borderBottom: 0, borderLeft: 0 } } },
    MuiAppBar: { styleOverrides: { root: { ...glass, borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0 } } },
    MuiButton: { styleOverrides: { root: { borderRadius: 12 }, containedPrimary: { color: '#042f2e', boxShadow: '0 6px 20px rgba(45,212,191,.35)' } } },
    MuiTableCell: { styleOverrides: { root: { borderColor: 'rgba(255,255,255,.08)' }, head: { fontWeight: 700, color: 'rgba(226,232,240,.7)' } } },
    MuiOutlinedInput: { styleOverrides: { root: { background: 'rgba(255,255,255,.05)' }, notchedOutline: { borderColor: 'rgba(255,255,255,.16)' } } },
    MuiChip: { styleOverrides: { root: { fontWeight: 700 } } },
  },
});
