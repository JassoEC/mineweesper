import { Grid, Button } from "@mui/material";
import { Cell } from "./Cell";
import { useEffect, useRef, useState } from "react";

const fillBoard = (columns, rows) => {
    const cells = [];
    for (let i = 0; i < columns; i++) {
        const row = [];
        for (let j = 0; j < rows; j++) {
            row.push({
                column: i,
                row: j,
                revealed: false,
                flagged: false,

            });
        }
        cells.push(row);
    }
    return cells;
}

export function Board({ game, handlePause }) {

    const [cells, setCells] = useState([]);
    const [board, setBoard] = useState({
        mines: [],
        flagged: [],
        revealed: [],
        rows: 0,
        columns: 0,
    });

    const boardRef = useRef(null);

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
                {cells.map((row, rowIndex) => (
                    <Grid key={`row-${rowIndex}`} columns={game.columns} justifyContent={'center'}>
                        {row.map((cell, cellIndex) => (
                            <Cell key={`cell-${rowIndex}-${cellIndex}`} cell={cell} />
                        ))}
                    </Grid>
                ))}
            </Grid>
            <Grid container item xs={12} justifyContent={'center'} alignItems={'start'}>
                <Button onClick={handlePause} variant="contained">Pause</Button>
            </Grid>
        </Grid>
    )
}
