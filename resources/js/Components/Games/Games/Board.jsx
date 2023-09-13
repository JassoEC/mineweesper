import { Grid, Button } from "@mui/material";

export function Board({ game }) {
    return (
        <Grid container sx={{
            minHeight: 600,
            minWidth: 600,
            border: '1px solid black',
            marginY: 4
        }}>
            {JSON.stringify(game.board || {})}
            <Grid container item xs={12} justifyContent={'center'} alignItems={'start'}>
                <Button variant="contained">Pause</Button>
            </Grid>
        </Grid>
    )
}