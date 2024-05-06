import Typography from '@mui/joy/Typography';
export default function Footer() {
return(
    <Typography level="body-xs" textAlign="center">
      © Puppiggy {new Date().getFullYear()}
    </Typography>
);
}