import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    Box,
    Grid,
    List,
    ListSubheader,
    Typography,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon
} from '@mui/material';
import { NewGameModal } from '@/Components/Games/NewGameModal';
import { GameListItem } from '@/Components/Games/GameListItem';
import { Board } from '@/Components/Games/Board';
import { UserStatistics } from '@/Components/Games/UserStatistics';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';

export default function Dashboard({ auth }) {
    const [gameState, setGameState] = useState({
        currentGame: null,
        allGames: [],
        showNewGameModal: false,
        newGame: {
            rows: 0,
            columns: 0,
            mines: 0,
        },
        errors: {},
        statistics: {},
    });

    useEffect(() => {
        window.axios.get('api/games')
            .then(response => {
                setGameState((prevState) => ({
                    ...prevState,
                    allGames: response.data.data,
                }));
            })

        window.axios.get('api/user/statistics')
            .then(response => {
                setGameState((prevState) => ({
                    ...prevState,
                    statistics: response.data.data,
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
            const game = response.data.data;
            setGameState((prevState) => ({
                ...prevState,
                allGames: [...prevState.allGames, game],
                currentGame: game,
                showNewGameModal: false,
                newGame: {},
            }));

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

    const setCurrentGame = (game) => {
        setGameState((prevState) => ({
            ...prevState,
            currentGame: game,
        }));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<Typography variant="h5">Dashboard</Typography>}
        >
            <Head title="Dashboard" />

            <Box minHeight={700}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Box
                            sx={{
                                maxHeight: 400,
                                bgcolor: "background.paper",
                                marginY: 4,
                                overflow: 'hidden',
                                borderTopRightRadius: 8,
                                borderBottomRightRadius: 8,
                            }}>
                            <nav aria-label="secondary mailbox folders">
                                <List>
                                    <ListSubheader component="div" id="nested-list-subheader">
                                        Options
                                    </ListSubheader>
                                    <ListItem>
                                        <ListItemButton onClick={handleShowNewGameModal}>
                                            <ListItemIcon>
                                                <AddIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="New Game" />
                                        </ListItemButton>
                                    </ListItem>
                                    <Divider />
                                </List>
                            </nav>
                            <nav aria-label="secondary mailbox folders">
                                <List>
                                    <ListSubheader component="div" id="nested-list-subheader">
                                        Old Games
                                    </ListSubheader>
                                    {gameState.allGames.map(game => (
                                        <GameListItem
                                            key={game.id}
                                            game={game}
                                            setCurrentGame={setCurrentGame}
                                            selected={gameState.currentGame?.id === game.id}
                                        />
                                    ))}
                                </List>
                            </nav>
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                        {!gameState.currentGame && (
                            <UserStatistics statistics={gameState.statistics} />
                        )}
                        {gameState.currentGame && (
                            <Board game={gameState.currentGame} />
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
