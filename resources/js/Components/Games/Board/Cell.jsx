import { Grid } from "@mui/material";

export function Cell({ cell, sideSize = 40 }) {
    return (
        <Grid
            item
            border={'1px solid black'}
            height={sideSize}
            width={sideSize}
            sx={{
                borderRadius: 1,
                ":hover": {
                    backgroundColor: 'grey.400',
                },

                ":active": {
                    backgroundColor: 'grey.600',
                }

            }}
        >
            C
        </Grid>
    )
}
