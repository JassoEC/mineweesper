import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Button from '@mui/material/Button';
import { Box, Grid, Typography } from '@mui/material';
import { NewGameModal } from '@/Components/Games/NewGameModal';

export default function Dashboard({ auth }) {
    const [gameState, setGameState] = useState({
        currentGame: null,
        showNewGameModal: false,
        newGame: {
            rows: 0,
            columns: 0,
            mines: 0,
        },
        errors: {},
    });

    useEffect(() => {
        window.axios.get('api/games/current')
            .then(response => {
                setGameState((prevState) => ({
                    ...prevState,
                    currentGame: response.data,
                }));
            }
            )
    }, [])

    const handleShowNewGameModal = () => {
        setGameState((prevState) => ({
            ...prevState,
            showNewGameModal: !prevState.showNewGameModal,
        }));
    }

    const handleSubmitNewGame = async () => {
        try {
            setGameState((prevState) => ({
                ...prevState,
                errors: {},
            }));

            const response = await window.axios.post('api/games', gameState.newGame)
            console.log(response.data);
        } catch (error) {
            setGameState((prevState) => ({
                ...prevState,
                errors: error.response.data.errors,
            }));
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setGameState((prevState) => ({
            ...prevState,
            newGame: {
                ...prevState.newGame,
                [name]: value,
            },
        }));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<Typography variant="h5">Dashboard</Typography>}
        >
            <Head title="Dashboard" />

            <Box minHeight={'600px'}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Box padding={2}>
                            <Button
                                color="primary"
                                variant="contained"
                                fullWidth
                                onClick={handleShowNewGameModal}
                            >
                                New Game
                            </Button>
                        </Box>
                        <Box padding={2}>
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                        {!gameState.currentGame && (
                            <Typography
                                variant="h6"
                                color="textSecondary"
                                align="center"
                            >
                                No game in progress
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </Box>
            <NewGameModal
                show={gameState.showNewGameModal}
                handleClose={handleShowNewGameModal}
                errors={gameState.errors}
                handleChange={handleChange}
                game={gameState.newGame}
                handleSubmit={handleSubmitNewGame}
            />
        </AuthenticatedLayout>
    );
}
