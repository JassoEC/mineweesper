import { Grid } from "@mui/material";

export function Cell({ cell, handleReveal, handleFlagged, gameStatus, sideSize = 40 }) {

    const getBackgroundColor = () => {
        if (cell.hasMine && gameStatus === 'lost') {
            return 'red';
        }

        if (cell.isRevealed) {
            return 'white';
        }

        return 'lightgrey';
    }

    const getCellContent = () => {

        if (cell.isRevealed && cell.hasMine || gameStatus === 'lost' && cell.hasMine) {
            return '💣';
        }

        if (cell.isRevealed && !cell.hasMine) {
            return cell.minesAround === 0 ? '' : cell.minesAround;
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
            container
            border={'1px solid black'}
            height={sideSize}
            width={sideSize}
            onClick={onReveal}
            onContextMenu={onFlagged}
            textAlign={'center'}
            justifyContent={'center'}
            alignContent={'center'}
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
            <span>
                {getCellContent()}
            </span>
        </Grid>
    )
}
