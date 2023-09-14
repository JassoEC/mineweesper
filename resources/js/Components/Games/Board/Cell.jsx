import { Grid } from "@mui/material";

export function Cell({ cell, handleReveal, handleFlagged, sideSize = 40 }) {

    const getBackgroundColor = () => {
        // if (cell.hasMine) {
        //     return 'red';
        // }

        if (cell.isRevealed) {
            return 'white';
        }

        return 'lightgrey';
    }

    const getCellContent = () => {
        if (cell.isRevealed && cell.hasMine) {
            return '💣';
        }

        if (cell.isRevealed && !cell.hasMine) {
            return '';
        }

        if (cell.isFlagged) {
            return '🚩';
        }

        return '';
    }

    const onFlagged = (e) => {
        e.preventDefault();
        handleFlagged(cell.row, cell.column);
    }

    const onReveal = (e) => {
        e.preventDefault();
        handleReveal(cell.row, cell.column);
    }

    return (
        <Grid
            item
            border={'1px solid black'}
            height={sideSize}
            width={sideSize}
            onClick={onReveal}
            onContextMenu={onFlagged}
            textAlign={'center'}
            justifyContent={'center'}
            sx={{
                backgroundColor: getBackgroundColor(),
                borderRadius: 1,
                ":hover": {
                    backgroundColor: 'grey.400',
                },

                ":active": {
                    backgroundColor: 'grey.600',
                }

            }}
        >
            <>
                {getCellContent()}
            </>
        </Grid>
    )
}
