import { Grid, Typography } from '@mui/material';
export function UserStatistics({ statistics }) {
    return (
        <Grid container gap={4} padding={3}>
            <Grid item xs={12}>
                <Typography variant='h2' fontWeight={"bold"} align='center'>Statistics</Typography>
            </Grid>
            <Grid item xs={12} sx={{ backgroundColor: 'white', borderRadius: 4, padding: 2 }}>
                <Typography variant='h3' align='center'>Games played: {statistics.played}</Typography>
            </Grid>
            <Grid item xs={12} sx={{ backgroundColor: 'white', borderRadius: 4, padding: 2 }}>
                <Typography variant='h3' align='center'>Games won: {statistics.won}</Typography>
            </Grid>
            <Grid item xs={12} sx={{ backgroundColor: 'white', borderRadius: 4, padding: 2 }}>
                <Typography variant='h3' align='center'>Games lost: {statistics.lost}</Typography>
            </Grid>
            <Grid item xs={12} sx={{ backgroundColor: 'white', borderRadius: 4, padding: 2 }}>
                <Typography variant='h3' align='center'>Games playing: {statistics.playing}</Typography>
            </Grid>
        </Grid>
    )
}