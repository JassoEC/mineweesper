import { Grid, Button, Typography } from "@mui/material";
import { Cell } from "./Cell";
import { useEffect, useRef, useState } from "react";

export function Board({ game, handlePause }) {

    const [cells, setCells] = useState([]);
    const [board, setBoard] = useState({
        mines: [],
        cells: [],
        rows: 0,
        columns: 0,
        status: '',
    });

    const boardRef = useRef(null);


    useEffect(() => {
        window.axios.get(`api/games/${game.id}`)
            .then(response => {
                const { columns, rows, board, status } = response.data.data;
                const { mines, cells } = board;
                setBoard((prevState) => ({
                    ...prevState,
                    mines,
                    rows,
                    columns,
                    status,
                }))

                setCells(cells);
            })
    }, [game]);


    const handleRevealCell = async (row, column) => {
        try {
            const response = await window.axios.post(`api/cells/revealed`, {
                gameId: game.id,
                column,
                row,
            })

            const { columns, rows, board, status } = response.data.data;
            const { mines, cells } = board;
            setBoard((prevState) => ({
                ...prevState,
                mines,
                rows,
                columns,
                status,
            }))

            setCells(cells);

        } catch (error) {
            console.log(error);
        }
    }

    const handleAddFlagTolCell = async (row, column) => {
        try {
            const response = await window.axios.post(`api/cells/flagged`, {
                gameId: game.id,
                row,
                column,

            })
            const { columns, rows, board, status } = response.data.data;
            const { mines, cells } = board;
            setBoard((prevState) => ({
                ...prevState,
                mines,
                rows,
                columns,
                status,
            }))

            setCells(cells);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Grid
            ref={boardRef}
            container
            padding={2}
            gap={3}
            sx={{
                minHeight: 600,
                minWidth: 600,
                marginY: 4
            }}>
            <Grid container justifyContent={'center'} alignItems={'start'}>
                {board.status === 'lost' && (
                    <Grid item xs={12}>
                        <Typography textAlign={'center'} variant={'h4'}>You lost 💣!</Typography>
                    </Grid>
                )}
                {cells.map((row, rowIndex) => (
                    <Grid key={`row-${rowIndex}`} columns={game.columns} justifyContent={'center'}>
                        {row.map((cell, cellIndex) => (
                            <Cell
                                key={`cell-${rowIndex}-${cellIndex}`}
                                cell={cell}
                                handleReveal={handleRevealCell}
                                handleFlagged={handleAddFlagTolCell}
                                flagged={board.flagged}
                                revealed={board.revealed}
                                mines={board.mines}
                            />
                        ))}
                    </Grid>
                ))}
            </Grid>
            {board.status === 'playing' && <Grid container item xs={12} justifyContent={'center'} alignItems={'start'}>
                <Button onClick={handlePause} variant="contained">Pause</Button>
            </Grid>}
        </Grid>
    )
}
