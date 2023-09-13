import { Button, Grid, TextField, Typography } from '@mui/material';
import Modal from '../Modal';


export function NewGameModal(props) {

    const { show, handleClose, errors, handleChange, game, handleSubmit } = props;

    return (
        <Modal show={show} onClose={handleClose}>
            <Grid container padding={3} gap={3}>
                <Grid item xs={12}>
                    <Typography variant='h2' align='center'>New Game</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="number"
                        variant={"outlined"}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        label={"Number of rows"}
                        placeholder='Number of rows'
                        helperText={errors?.rows}
                        error={!!errors?.rows}
                        name='rows'
                        value={game.rows}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}>
                    <TextField
                        type="number"
                        variant={"outlined"}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        label={"Number of colums"}
                        placeholder='Number of colums'
                        helperText={errors?.columns}
                        error={!!errors?.columns}
                        name='columns'
                        value={game.columns}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}>
                    <TextField
                        type="number"
                        variant={"outlined"}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        label={"Number of mines"}
                        placeholder='Number of mines'
                        helperText={errors?.mines}
                        error={!!errors?.mines}
                        name='mines'
                        value={game.mines}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid
                    item
                    xs={12} container
                    justifyContent={'center'} gap={3}
                >
                    <Button
                        size={"large"}
                        variant={"contained"}
                        onClick={handleSubmit}
                    >
                        Create Game
                    </Button>
                    <Button
                        size={"large"}
                        variant={"contained"}
                        color={"inherit"}
                    >
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </Modal>
    )
}