import { Grid } from "@mui/material";

export function Board({ game }) {
    return (
        <Grid>
            {JSON.stringify(game)}
        </Grid>
    )
}